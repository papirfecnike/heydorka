function TestimonialCard({ testimonial }) {
  return (
    <figure className="testimonial">
      <blockquote>
        {Array.isArray(testimonial.quote)
          ? testimonial.quote.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          : <p>{testimonial.quote}</p>
        }
      </blockquote>

      <figcaption>
        — {testimonial.author}
        {testimonial.company && `, ${testimonial.company}`}
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;
