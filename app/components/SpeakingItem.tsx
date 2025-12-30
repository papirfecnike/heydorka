function SpeakingItem({ talk }) {
  return (
    <details className="accordion-section">
      <summary className="speaking-summary">
        <span className="speaking-title">{talk.title}</span>

        <span className="speaking-meta">
          <span className="speaking-conf">{talk.event}</span>
          {talk.badge && (
            <span className="speaking-badge">{talk.badge}</span>
          )}
        </span>
      </summary>

      <div className="accordion-content">
        {Array.isArray(talk.description) &&
          talk.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

        {talk.links && (
          <div className="speaking-links">
            {talk.links.map((link, index) => (
              <a key={index} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

    </details>
  );
}

export default SpeakingItem;
