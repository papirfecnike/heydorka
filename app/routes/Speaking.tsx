import "./Speaking.css";
import speaking from "../data/speaking";
import SpeakingItem from "../components/SpeakingItem";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dora Makszy portfolio" },
    { name: "description", content: "Dora Makszy portfolio" },
  ];
}

function Speaking() {
  return (
    <main className="content speaking-page">
      <section className="card">
        <h1>Speaking</h1>

        {speaking.map((yearGroup) => (
          <section key={yearGroup.year} className="speaking-year">
            <h3>{yearGroup.year}</h3>

            {yearGroup.talks.map((talk) => (
              <SpeakingItem key={talk.id} talk={talk} />
            ))}
          </section>
        ))}
      </section>
    </main>
  );
}

export default Speaking;
