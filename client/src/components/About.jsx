import { Reveal } from "./Reveal.jsx";
import { profile } from "../data/content.js";

const icons = [
  // flask
  "M9 3h6M10 3v6.2L4.6 18.4A2 2 0 006.3 21h11.4a2 2 0 001.7-2.6L14 9.2V3",
  // waveform / spectrum
  "M3 12h3l2-6 3 12 3-9 2 3h5",
  // clipboard / method
  "M9 4h6v3H9zM6 6h2m8 0h2v14H6V6m4 6h6m-6 4h4",
  // document / writing
  "M7 3h7l4 4v14H7zM14 3v4h4M10 13h6M10 17h4",
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <div className="photo-frame">
            {/* Replace client/public/profile-photo.jpg with your own portrait */}
            <img src="/ram.jpeg" alt={profile.name} />
          </div>
          <p className="photo-caption">{profile.location}</p>
        </Reveal>

        <div className="about-copy">
          <Reveal delay={0.06}>
            <span className="eyebrow">About</span>
            <h2 className="section-heading">
              A chemist who stayed at <span className="gradient-text">the bench</span> and the
              whiteboard
            </h2>
          </Reveal>
          {profile.bio.map((para, i) => (
            <Reveal key={i} delay={0.12 + i * 0.06}>
              <p>{para}</p>
            </Reveal>
          ))}
          <Reveal delay={0.26}>
            <blockquote className="quote-strip">
              A result you can't reproduce isn't a result yet. Most of what I teach comes down to
              that one sentence.
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Research() {
  return (
    <section id="research">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Research focus</span>
          <h2 className="section-heading">
            Where the <span className="gradient-text">bench time</span> goes
          </h2>
          <p className="section-intro">
            Four areas cover most of what I work on, review for journals, and supervise.
          </p>
        </Reveal>

        <div className="focus-grid">
          {profile.focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <article className="card focus-card">
                <div className="focus-icon" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icons[i % icons.length]} />
                  </svg>
                </div>
                <h4>{f.title}</h4>
                <p>{f.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
