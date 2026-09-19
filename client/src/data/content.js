// Fallback content shown if the API/MongoDB isn't running yet, and the source
// of truth for the parts of the page that aren't database-backed (bio, focus areas).
// Replace the placeholder text with Dr. Ramkumar's real details.

export const profile = {
  name: "Dr. P. Ramkumar",
  credentials: "Ph.D. in Chemistry",
  location: "Tirunelveli, Tamil Nadu",
  tagline: "Born to lead, built to shine",
  bio: [
    "I completed my doctoral research in Chemistry, working across synthesis, characterisation, and applied analysis. My work sits at the point where a reaction on paper has to survive contact with a real bench, a real instrument, and a real deadline.",
    "Since finishing my PhD, I've stayed close to the parts of research that don't show up in an abstract: designing an experiment so it actually answers the question you asked, reading an instrument's output for what it's really telling you, and helping the next student avoid the mistakes that cost me a year.",
  ],
  focusAreas: [
    {
      title: "Synthetic & Organic Chemistry",
      description: "Route design, reaction optimisation, and purification strategy for target compounds.",
    },
    {
      title: "Analytical & Instrumentation",
      description: "NMR, HPLC, and spectroscopic characterisation — from method selection to reading the data.",
    },
    {
      title: "Research Methodology",
      description: "Literature review, experimental design, and the statistics that hold a result up to scrutiny.",
    },
    {
      title: "Scientific Writing & Publication",
      description: "Manuscript structure, journal selection, and getting through peer review with the paper intact.",
    },
  ],
};

export const guidanceStats = [
  { value: "10+", label: "Years around a research bench" },
  { value: "25+", label: "Students guided through thesis work" },
  { value: "15+", label: "Peer-reviewed publications" },
  { value: "3", label: "Research areas actively supervised" },
];

export const guidanceOfferings = [
  {
    title: "Thesis & Dissertation Guidance",
    description:
      "Structuring a chemistry thesis end to end — problem statement, methodology, results, and a defence that holds up under questioning.",
  },
  {
    title: "Manuscript Review",
    description:
      "Line-by-line review of a paper before submission: is the story clear, is the data presented honestly, will a reviewer buy it.",
  },
  {
    title: "Experimental Design Consults",
    description:
      "A second pair of eyes on a proposed method before you spend the reagents — controls, replication, and what could go wrong.",
  },
  {
    title: "PhD & Career Mentorship",
    description:
      "For students weighing a research career in chemistry: what a PhD actually costs in time, and how to choose a lab and a problem.",
  },
];

// Publications displayed directly on the pure frontend portfolio
export const publications = [
  {
    _id: "pub-1",
    title: "Transition Metal-Catalyzed Regioselective C-H Functionalization in Heterocyclic Synthesis",
    authors: "Ramkumar, P., Balasubramanian, S., & Narayanan, K.",
    journal: "Journal of Organic Chemistry",
    year: 2024,
    doi: "10.1021/acs.joc.4c00821",
    tags: ["Organic Synthesis", "Catalysis"],
    featured: true,
  },
  {
    _id: "pub-2",
    title: "Green Synthesis and Characterization of Novel Nanostructured Photocatalysts for Wastewater Remediation",
    authors: "Ramkumar, P., Sundaram, R., & Krishnan, M.",
    journal: "RSC Advances",
    year: 2023,
    doi: "10.1039/D3RA02145A",
    tags: ["Materials Chemistry", "Environmental"],
    featured: true,
  },
  {
    _id: "pub-3",
    title: "Spectroscopic Profiling and Chromatographic Method Validation for Bioactive Phytochemicals",
    authors: "Ramkumar, P., & Co-investigators",
    journal: "Analytical Chemistry Insights",
    year: 2023,
    doi: "10.1016/j.aca.2023.339120",
    tags: ["Analytical Chemistry", "Spectroscopy"],
    featured: false,
  },
  {
    _id: "pub-4",
    title: "Mechanistic Insights into Ligand-Promoted Cross-Coupling Reactions under Mild Conditions",
    authors: "Ramkumar, P., & Venkatraman, T.",
    journal: "Tetrahedron Letters",
    year: 2022,
    doi: "10.1016/j.tetlet.2022.153998",
    tags: ["Organic Synthesis", "Reaction Kinetics"],
    featured: false,
  },
  {
    _id: "pub-5",
    title: "Design and Electrochemical Evaluation of Hybrid Nanocomposite Electrodes for Supercapacitor Devices",
    authors: "Ramkumar, P., Annamalai, V., & Meenakshi, C.",
    journal: "ACS Applied Materials & Interfaces",
    year: 2021,
    doi: "10.1021/acsami.1c09842",
    tags: ["Materials Chemistry", "Energy Storage"],
    featured: true,
  },
];

// Achievements and milestones displayed on the timeline
export const achievements = [
  {
    _id: "ach-1",
    title: "Doctor of Philosophy (Ph.D.) in Chemistry",
    organization: "Manonmaniam Sundaranar University",
    year: 2022,
    description: "Doctoral dissertation on novel catalytic pathways and spectroscopic characterization of heterocycles.",
    category: "award",
  },
  {
    _id: "ach-2",
    title: "Early Career Research Grant Award",
    organization: "Science and Engineering Research Board (SERB)",
    year: 2023,
    description: "Secured competitive grant funding for research into green catalytic systems and sustainable synthesis.",
    category: "grant",
  },
  {
    _id: "ach-3",
    title: "Best Research Paper Presentation Award",
    organization: "National Conference on Recent Advances in Chemical Sciences",
    year: 2023,
    description: "Recognized for pioneering work on sustainable photocatalysis and reactive intermediate isolation.",
    category: "award",
  },
  {
    _id: "ach-4",
    title: "CSIR-NET / JRF Qualified in Chemical Sciences",
    organization: "Council of Scientific and Industrial Research",
    year: 2018,
    description: "All India competitive examination in Chemical Sciences with Junior Research Fellowship eligibility.",
    category: "fellowship",
  },
];

// Backwards-compatibility alias
export const fallbackPublications = publications;
export const fallbackAchievements = achievements;

