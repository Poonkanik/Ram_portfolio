import { Reveal } from "./Reveal.jsx";
import { achievements } from "../data/content.js";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Achievements</span>
          <h2 className="section-heading">
            Milestones along <span className="gradient-text">the way</span>
          </h2>
        </Reveal>

        <div className="timeline">
          {achievements.map((a, i) => (
            <Reveal key={a._id} delay={i * 0.07}>
              <div className="tl-item">
                <span className="tl-dot" />
                <div className="tl-year">{a.year}</div>
                {a.organization && <div className="tl-org">{a.organization}</div>}
                <h4>{a.title}</h4>
                {a.description && <p>{a.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
