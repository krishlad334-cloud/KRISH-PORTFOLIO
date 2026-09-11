import { useEffect, useState } from "react";
import "./styles/Landing.css";
import { MdArrowOutward } from "react-icons/md";

const ROLES = [
  "React JS Specialist",
  "Frontend Developer",
  "Interactive UI Architect",
  "Web App Specialist",
];

const Landing = ({ children }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        {/* Left column / Top on mobile */}
        <div className="landing-intro">
          <div className="landing-badge" data-cursor="disable">
            <span className="badge-dot"></span>
            <span>Available for Frontend Roles</span>
          </div>

          <h2>Hello! I'm</h2>
          <h1>
            KRISH
            <br />
            <span>LAD</span>
          </h1>

          <div className="landing-actions">
            <a href="#work" className="landing-btn primary-btn" data-cursor="disable">
              Featured Work
            </a>
            <a
              href="/Krish_Lad.pdf"
              target="_blank"
              rel="noreferrer"
              className="landing-btn outline-btn"
              data-cursor="disable"
            >
              Resume <MdArrowOutward />
            </a>
          </div>
        </div>

        {/* Right column / Bottom on mobile */}
        <div className="landing-info">
          <h3>Passionate About</h3>
          <div className="landing-rotator">
            <div
              className="landing-rotator-track"
              style={{ transform: `translateY(-${roleIndex * 100}%)` }}
            >
              {ROLES.map((role, idx) => (
                <div key={idx} className="landing-rotator-item">
                  <h2>{role}</h2>
                </div>
              ))}
            </div>
          </div>
          <p className="landing-summary-text">
            Crafting immersive, responsive web applications with modern React,
            clean component architecture, and high-performance UI engineering.
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
