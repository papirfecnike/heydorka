function CVSection({ title, items, isSkills }) {
  return (
    <section className="cv-group">
      <h3>{title}</h3>

      {isSkills ? (
        <ul className="cv-skills">
          {items.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      ) : (
        items.map((item) => (
          <details key={item.id} className="cv-accordion">
            <summary className="cv-summary">
              <span className="cv-title">{item.title}</span>

              {(item.company || item.institution || item.period) && (
                <span className="cv-meta-line">
                  {(item.company || item.institution) && (
                    <span className="cv-company">
                      {item.company || item.institution}
                    </span>
                  )}
                  {item.period && (
                    <span className="cv-period">
                      {(item.company || item.institution) && " • "}
                      {item.period}
                    </span>
                  )}
                </span>
              )}
            </summary>

            {item.description && (
              <div className="cv-content">
                {Array.isArray(item.description)
                  ? item.description.map((p, i) => <p key={i}>{p}</p>)
                  : <p>{item.description}</p>}
              </div>
            )}
          </details>
        ))
      )}
    </section>
  );
}

export default CVSection;
