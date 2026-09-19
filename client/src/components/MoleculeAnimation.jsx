import { motion } from "framer-motion";

// A benzene-ring-like structure that assembles bond-by-bond once on load.
// This is the single orchestrated motion moment for the whole page —
// everything else on the site is calm and static by comparison.

const nodes = [
  { id: "a", x: 200, y: 70 },
  { id: "b", x: 320, y: 140 },
  { id: "c", x: 320, y: 270 },
  { id: "d", x: 200, y: 340 },
  { id: "e", x: 80, y: 270 },
  { id: "f", x: 80, y: 140 },
];

const bonds = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
  ["e", "f"],
  ["f", "a"],
];

const satellites = [
  { from: "a", x: 200, y: -10 },
  { from: "c", x: 400, y: 310 },
  { from: "e", x: 0, y: 310 },
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.55, delay: 0.15 * i, ease: "easeInOut" }, opacity: { duration: 0.2, delay: 0.15 * i } },
  }),
};

const nodeAppear = {
  hidden: { scale: 0, opacity: 0 },
  show: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.35, delay: 0.15 * i + 0.35, ease: "backOut" },
  }),
};

export default function MoleculeAnimation() {
  return (
    <motion.svg
      viewBox="-20 -40 440 420"
      role="img"
      aria-label="Animated illustration of a hexagonal molecular ring assembling, representing chemical structure"
      initial="hidden"
      animate="show"
    >
      <motion.circle
        cx="200"
        cy="200"
        r="185"
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {bonds.map(([from, to], i) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--verdigris-bright)"
            strokeWidth="2.5"
            custom={i}
            variants={lineDraw}
          />
        );
      })}

      {satellites.map((s, i) => {
        const from = nodeMap[s.from];
        return (
          <motion.line
            key={`sat-${i}`}
            x1={from.x}
            y1={from.y}
            x2={s.x}
            y2={s.y}
            stroke="var(--lilac)"
            strokeWidth="2"
            custom={bonds.length + i}
            variants={lineDraw}
          />
        );
      })}

      {nodes.map((n, i) => (
        <motion.circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r="9"
          fill="var(--ink)"
          stroke="var(--verdigris-bright)"
          strokeWidth="2.5"
          custom={i}
          variants={nodeAppear}
        />
      ))}

      {satellites.map((s, i) => (
        <motion.circle
          key={`sat-node-${i}`}
          cx={s.x}
          cy={s.y}
          r="6"
          fill="var(--ink)"
          stroke="var(--lilac)"
          strokeWidth="2.5"
          custom={bonds.length + i}
          variants={nodeAppear}
        />
      ))}
    </motion.svg>
  );
}
