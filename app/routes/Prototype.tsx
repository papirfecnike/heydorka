import { useEffect, useState } from "react";

/* Browser full screen (F11, the green button, View > Enter Full Screen) fires no event,
   so compare the window with the screen. The Fullscreen API covers the rest. */
function isBrowserFullscreen() {
  if (document.fullscreenElement) return true;
  if (window.matchMedia("(display-mode: fullscreen)").matches) return true;
  return (
    window.innerHeight >= window.screen.height - 1 &&
    window.innerWidth >= window.screen.width - 1
  );
}

export default function Prototype() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const update = () => setFullscreen(isBrowserFullscreen());
    const mq = window.matchMedia("(display-mode: fullscreen)");
    update();
    window.addEventListener("resize", update);
    document.addEventListener("fullscreenchange", update);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("fullscreenchange", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  /* Stop the page behind the deck from scrolling while it covers the screen */
  useEffect(() => {
    if (!fullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  return (
    <div className="prototype">
      <iframe
        src="/oredev-2026/index.html"
        title="No researchers were harmed in the making of this test suite"
        allow="fullscreen; display-capture; microphone; camera; clipboard-write"
        allowFullScreen
        style={
          fullscreen
            ? {
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                border: "none",
                zIndex: 9999,
                background: "#fff",
              }
            : {
                width: "100%",
                height: "100vh",
                border: "none",
              }
        }
      />
    </div>
  );
}
