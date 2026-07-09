import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ImageCarousel.css";

type ImageCarouselProps = {
  images: string[];
  altPrefix?: string;
};

function ImageCarousel({ images, altPrefix = "Screen" }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;
  const dragStartX = useRef<number | null>(null);

  if (count === 0) return null;

  const go = (delta: number) => {
    setActiveIndex((i) => (i + delta + count) % count);
  };

  // Click-and-drag on desktop, touch-swipe on mobile — Pointer Events
  // cover both. A plain click/tap (no meaningful movement) falls below
  // the threshold and is ignored, so this doesn't interfere with the
  // buttons or dots (which are separate elements outside the track
  // and keep working through their own onClick handlers regardless).
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    // Without this, a mouse drag that ends outside the track (very
    // easy to do with a fast horizontal swipe) never fires pointerup
    // on the track at all, since mouse pointers aren't implicitly
    // captured the way touch pointers are. Capturing here guarantees
    // this element keeps receiving the up event no matter where the
    // pointer ends up.
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    const threshold = 40;
    if (delta > threshold) go(-1);
    else if (delta < -threshold) go(1);
  };

  const handlePointerLeave = () => {
    dragStartX.current = null;
  };

  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  const visible =
    count === 1
      ? [{ pos: "active" as const, index: activeIndex }]
      : count === 2
      ? [
          { pos: "active" as const, index: activeIndex },
          { pos: "next" as const, index: nextIndex },
        ]
      : [
          { pos: "prev" as const, index: prevIndex },
          { pos: "active" as const, index: activeIndex },
          { pos: "next" as const, index: nextIndex },
        ];

  return (
    <div className="image-carousel">
      <button
        type="button"
        className="carousel-btn carousel-btn--prev"
        onClick={() => go(-1)}
        aria-label="Previous screen"
        disabled={count < 2}
      >
        <ChevronLeft size={22} />
      </button>

      <div
        className="carousel-track"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        {visible.map(({ pos, index }) => (
          <div key={index} className={`carousel-item carousel-item--${pos}`}>
            <img
              src={images[index]}
              alt={`${altPrefix} ${index + 1}`}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel-btn carousel-btn--next"
        onClick={() => go(1)}
        aria-label="Next screen"
        disabled={count < 2}
      >
        <ChevronRight size={22} />
      </button>

      {count > 1 && (
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel-dot ${i === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to screen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
