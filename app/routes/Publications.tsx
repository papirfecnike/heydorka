import "./Publications.css";
import publications from "../data/publications";
import PublicationItem from "../components/PublicationItem";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dora Makszy portfolio" },
    { name: "description", content: "Dora Makszy portfolio" },
  ];
}

function Publications() {
  return (
    <main className="content publications-page">
      <section className="card">
        <h1>Publications</h1>

        {publications.map((yearGroup) => (
          <section key={yearGroup.year} className="publications-year">
            <h3>{yearGroup.year}</h3>
            {yearGroup.articles.map((article) => (
              <PublicationItem key={article.id} publication={article} />
            ))}
          </section>
        ))}
      </section>
    </main>

  );
}

export default Publications;
