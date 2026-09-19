import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal.jsx";
import { publications } from "../data/content.js";

export default function Publications() {
  const [filter, setFilter] = useState("All");

  const tags = useMemo(() => {
    const all = new Set();
    publications.forEach((p) => (p.tags || []).forEach((t) => all.add(t)));
    return ["All", ...Array.from(all)];
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? publications
        : publications.filter((p) => (p.tags || []).includes(filter)),
    [filter]
  );

  return (
    <section id="publications">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Publications</span>
          <h2 className="section-heading">
            Peer-reviewed <span className="gradient-text">work</span>
          </h2>
          <p className="section-intro">
            Selected peer-reviewed articles, synthesis methodologies, and collaborative research
            contributions in chemical sciences.
          </p>
        </Reveal>

        {tags.length > 1 && (
          <Reveal delay={0.05}>
            <div className="pub-toolbar">
              {tags.map((t) => (
                <button
                  key={t}
                  className={`chip ${filter === t ? "active" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <div className="pub-list">
          <AnimatePresence mode="popLayout">
            {visible.map((pub, i) => (
              <motion.article
                key={pub._id}
                layout
                className="card pub-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <div className="pub-year">{pub.year}</div>
                <div>
                  <h3 className="pub-title">{pub.title}</h3>
                  <p className="pub-authors">{pub.authors}</p>
                  <p className="pub-journal">{pub.journal}</p>
                  {pub.tags?.length > 0 && (
                    <div className="pub-tags">
                      {pub.tags.map((tag) => (
                        <span className="pub-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {pub.doi && (
                  <a
                    className="pub-link"
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View DOI
                  </a>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
