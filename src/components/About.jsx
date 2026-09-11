import "./styles/About.css";
import { FaGraduationCap, FaReact, FaPalette, FaBolt } from "react-icons/fa6";

const HIGHLIGHTS = [
  {
    icon: FaGraduationCap,
    title: "MCA Post-Graduate",
    subtitle: "GTU (2024–2026)",
    desc: "Advanced CS background focusing on scalable frontend engineering and modern web paradigms.",
    color: "#14b8a6",
  },
  {
    icon: FaReact,
    title: "Frontend Specialist",
    subtitle: "React JS & Modern JavaScript",
    desc: "Crafting declarative, reusable component hierarchies with clean state and real-time Socket.io data.",
    color: "#61dafb",
  },
  {
    icon: FaPalette,
    title: "Responsive UI Architect",
    subtitle: "Tailwind CSS & Modern CSS",
    desc: "Designing pixel-perfect, accessible, and fluid layouts optimized across mobile, tablet, and widescreen.",
    color: "#38bdf8",
  },
  {
    icon: FaBolt,
    title: "AI-Powered Delivery",
    subtitle: "Git & AI Developer Tools",
    desc: "Accelerating clean code delivery with modern version control and state-of-the-art AI toolchains.",
    color: "#a855f7",
  },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-badge">
          <span>// 01. ABOUT ME</span>
        </div>
        <h3 className="title">Crafting Modern Digital Experiences</h3>
        <p className="para">
          I am <strong>Krish Lad</strong>, an MCA graduate and dedicated{" "}
          <strong className="about-role-highlight">Frontend Developer</strong>{" "}
          specializing in building high-performance, accessible, and interactive
          web applications using React JS, JavaScript, Tailwind CSS, and AI-accelerated workflows.
        </p>

        {/* Credential Highlight Cards */}
        <div className="about-highlights-grid">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="about-highlight-card"
                style={{ "--accent": item.color }}
              >
                <div className="about-card-header">
                  <div className="about-card-icon" style={{ color: item.color }}>
                    <Icon />
                  </div>
                  <div>
                    <h4 className="about-card-title">{item.title}</h4>
                    <span className="about-card-sub">{item.subtitle}</span>
                  </div>
                </div>
                <p className="about-card-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;

