import { Link } from "react-router";

function CVSection({ title, items, isSkills = false }) {
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
          <details
            key={item.id}
            className="cv-accordion"
            open={item.current}
          >
            <summary className="cv-summary">
              <span className="cv-title">
                {item.title}
                {item.badge && (
                  <span className="speaking-badge cv-case-badge">
                    {item.badge}
                  </span>
                )}
                {item.caseStudy && (
                  <span className="speaking-badge cv-case-badge">
                    Case study
                  </span>
                )}
              </span>

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
                {Array.isArray(item.description) ? (
                  item.description.length > 1 ? (
                    <ul className="cv-bullets">
                      {item.description.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.description[0]}</p>
                  )
                ) : (
                  <p>{item.description}</p>
                )}

                {item.caseStudy && (
                  <Link
                    to={item.caseStudy.href}
                    className="link-underline cv-case-link"
                  >
                    {item.caseStudy.label} →
                  </Link>
                )}
              </div>
            )}
          </details>
        ))
      )}
    </section>
  );
}

export default CVSection;
