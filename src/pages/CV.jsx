import "./CV.css";
import cv from "../data/cv";
import CVSection from "../components/CVSection";

function CV() {
  return (
    <main className="content cv-page">
      <section className="card">
        <h1>Career</h1>

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
