import "./CV.css";
import cv from "../data/cv";
import CVSection from "../components/CVSection";
import cvPdf from "../assets/Dora_Makszy_CV.pdf?url";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dora Makszy — Head of Design | UX & Design Ops Leader" },
    {
      name: "description",
      content:
        "Dora Makszy is a Head of Design with 18+ years in UX, design systems, and design operations — leading teams building for the agentic era at Element Logic.",
    },
  ];
}

function CV() {
  return (
    <main className="content cv-page">
      <section className="card">
        <h1>Career</h1>

        <div className="cv-intro">
          <p>{cv.headline}</p>
        </div>

        <div className="cv-actions">
          <a href={cvPdf} download className="link-underline">
            Download CV (PDF)
          </a>

          <a
            href={cv.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            LinkedIn
          </a>

          <a href="mailto:makszydorka@pm.me" className="link-underline">
            Email
          </a>
        </div>

        <section className="cv-grid">
          <div className="cv-column cv-column-main">
            <CVSection title="Experience" items={cv.experience} />
          </div>

          <div className="cv-column cv-column-side">
            <CVSection title="Education" items={cv.education} />
            <CVSection title="Skills" items={cv.skills} />
          </div>
        </section>
      </section>
    </main>

  );
}

export default CV;
