import { motion } from "framer-motion";
import ParticleField from "./ParticleField.jsx";
import { profile } from "../data/content.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.75, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span className="eyebrow" variants={item}>
            Available for collaboration &amp; supervision
          </motion.span>

          <motion.h1 variants={item}>
            Dr. P. Ramkumar
            <span className="hero-role gradient-text">Ph.D. in Chemistry</span>
          </motion.h1>

          <motion.p className="hero-tagline" variants={item}>
            I run experiments for a living, and spend the rest of my time helping other people run
            theirs well — through published research, peer review, and one-to-one doctoral guidance.
          </motion.p>

          <motion.div className="hero-actions" variants={item}>
            <a className="btn btn-primary" href="#publications">
              Explore publications
            </a>
            <a className="btn btn-ghost" href="#contact">
              Request guidance
            </a>
          </motion.div>

          <motion.div className="hero-meta" variants={item}>
            <div className="hero-meta-item">
              <strong>Ph.D.</strong>
              <span>Chemistry, completed</span>
            </div>
            <div className="hero-meta-item">
              <strong>15+</strong>
              <span>Peer-reviewed papers</span>
            </div>
            <div className="hero-meta-item">
              <strong>{profile.location.split(",")[0]}</strong>
              <span>Tamil Nadu, India</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 0.75, 0.3, 1] }}
        >
          <div className="hero-orb" />
          <ParticleField />
        </motion.div>
      </div>
    </section>
  );
}
