import "./Speaking.css";
import speaking from "../data/speaking";
import SpeakingItem from "../components/SpeakingItem";

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
