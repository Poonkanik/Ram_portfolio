import { Reveal, CountUp } from "./Reveal.jsx";
import { guidanceStats, guidanceOfferings } from "../data/content.js";

export default function Guidance() {
  return (
    <section id="guidance">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Guidance</span>
          <h2 className="section-heading">
            Mentorship for the <span className="gradient-text">next chemist</span> at the bench
          </h2>
          <p className="section-intro">
            Most of what a Ph.D. teaches you isn't in the syllabus. This is where I pass that part
            along — to students, early-career researchers, and anyone stuck on a manuscript.
          </p>
        </Reveal>

        <div className="stat-grid">
          {guidanceStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="card stat-card">
                <div className="stat-value">
                  <CountUp value={s.value} />
                </div>
                <span>{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="offer-grid">
          {guidanceOfferings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08}>
              <article className="card offer-card">
                <span className="offer-num">{String(i + 1).padStart(2, "0")}</span>
                <h4>{o.title}</h4>
                <p>{o.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
