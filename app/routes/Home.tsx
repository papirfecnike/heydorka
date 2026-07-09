import speaking from "../data/speaking";
import profileImage from "../assets/doramakszy.png";

import { Link } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dora Makszy portfolio" },
    { name: "description", content: "Dora Makszy portfolio" },
  ];
}

function Home() {
  const upcomingTalks = speaking
    .flatMap((year) => year.talks)
    .filter((talk) => talk.status === "upcoming");

  return (
    <main className="content">
      <section className="home-grid">
        <section className="card">
          <div className="welcome-content">
            <div className="hero-photo">
              <img
                src={profileImage}
                alt="Portrait of Dora Makszy"
                className="profile-image"
              />
              <p className="hero-status">
                Currently leading design into agentic workflows at Element
                Logic
              </p>
            </div>
            <div className="hero-text">
              <p className="hero-eyebrow">
                Design leadership for the agentic era
              </p>
              <h1>Hi, I’m Dora.</h1>
              <p>
                I'm Head of Design with 18+ years across UX research, product strategy, and building product teams that ship. I focus on enabling my team, so they can spend their time where it counts — understanding people, making the hard calls, and finding the new ideas that AI can surface patterns toward but never originate.
              </p>
              <p>
                I experiment with AI where it's genuinely useful, not because it's the trend. Used with care, it gives back real evidence and real time, and leaves the interesting work to humans. Which means keeping our thinking sharp: sharing what we learn, challenging each other, and treating every problem as a chance to find a better way.
              </p>
              <p>
                I lead by coaching. I grow the people I work with, and I trust them to own what they build.
              </p>
            </div>
            <div className="hero-actions">
              <Link to="/prototype" className="link-underline">
                → Check out my AI research tool
              </Link>
              <Link
                to="/publications/what-design-leadership-means-in-the-agentic-era"
                className="link-underline"
              >
                → Read my AI point of view
              </Link>
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
