import { Link } from "react-router";
import { renderContentBlock } from "../utils/renderContent.jsx";

function PublicationItem({ publication }) {
  return (
    <details className="accordion-section">
      <summary className="speaking-summary">
        <span className="speaking-title">
          {publication.title}
          {publication.badge && (
            <span className="speaking-badge">{publication.badge}</span>
          )}
        </span>
        <Link
          to={`/publications/${publication.id}`}
          className="publication-link"
          title="Open article page"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </Link>
      </summary>

      <div className="accordion-content">
        {publication.content.map((block, index) =>
          renderContentBlock(block, index)
        )}
      </div>
    </details>
  );
}

export default PublicationItem;
