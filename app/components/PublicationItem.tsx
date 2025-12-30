import { renderContentBlock } from "../utils/renderContent.jsx";

function PublicationItem({ publication }) {
  return (
    <details className="accordion-section">
      <summary className="speaking-summary">
        <span className="speaking-title">{publication.title}</span>
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
