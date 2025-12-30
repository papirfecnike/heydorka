import "./Testimonials.css";
import testimonials from "../data/testimonials";
import TestimonialCard from "../components/TestimonialCard";

function Testimonials() {
  return (
    <main className="content testimonials-page">
      <section className="card">
        <h1>Testimonials</h1>
          <section className="testimonials-section">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </section>
      </section>
    </main>
  );
}

export default Testimonials;
