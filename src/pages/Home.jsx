import { Link } from "react-router-dom";


import speaking from "../data/speaking";
import profileImage from "../assets/doramakszy.png";

function Home() {
  const upcomingTalks = speaking
    .flatMap((year) => year.talks)
    .filter((talk) => talk.status === "upcoming");

  return (
    <main className="content">
      <section className="home-grid">
        <section className="card">
          <div className="welcome-content">
            <img
              src={profileImage}
              alt="Portrait of Dora Makszy"
              className="profile-image"
            />
            <div>
              <h1>Hi, I’m Dora.</h1>
              <p>
                I accelerate design delivery and help teams turn complex
                challenges into clear, human-centered product experiences.
              </p>
              <p>
                I’m a Head of Design with 18+ years of experience working across
                UX research, product strategy, and collaborative product teams.
              </p>
            </div>
          </div>
        </section>

        <section className="upcoming-news">
          <h3>Upcoming talks</h3>

          <ul className="upcoming-news-list">
            {upcomingTalks.map((talk) => (
              <li key={talk.id}>
                <span className="upcoming-dot" />
                <div className="upcoming-news-content">
                  <strong>{talk.title}</strong>
                  <span className="upcoming-news-meta">
                    {talk.event} · {talk.date}
                  </span>
                </div>
              </li>
            ))}
            
              {/* CTA */}
                <Link to="/speaking" className="link-underline">
                  View all talks →
                </Link>
          </ul>
        </section>
      </section>
    </main>
  );
}

export default Home;
