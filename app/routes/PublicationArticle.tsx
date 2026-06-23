import { useParams, Link } from "react-router";
import publications from "../data/publications";
import { renderContentBlock } from "../utils/renderContent.jsx";
import "./Publications.css";
import type { Route } from "../+types/root";

export function meta({ params }: Route.MetaArgs) {
  const id = (params as Record<string, string>).id;
  for (const yearGroup of publications) {
    const article = yearGroup.articles.find((a) => a.id === id);
    if (article) {
      return [{ title: `${article.title} – Dora Makszy` }];
    }
  }
  return [{ title: "Article – Dora Makszy" }];
}

function PublicationArticle() {
  const { id } = useParams();

  let article = null;
  let year = null;

  for (const yearGroup of publications) {
    const found = yearGroup.articles.find((a) => a.id === id);
    if (found) {
      article = found;
      year = yearGroup.year;
      break;
    }
  }

  if (!article) {
    return (
      <main className="content publications-page">
        <section className="card">
          <Link to="/publications" className="back-link">← Publications</Link>
          <p>Article not found.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="content publications-page">
      <section className="card">
        <Link to="/publications" className="back-link">← Publications</Link>
        <p className="article-year">{year}</p>
        <h1>{article.title}</h1>
        <div className="article-content">
          {article.content.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </div>
      </section>
    </main>
  );
}

export default PublicationArticle;
