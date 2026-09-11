import { useState } from "react";
import "./styles/WhatIDo.css";
import { FaCode, FaLaptopCode, FaArrowRight } from "react-icons/fa6";

const SERVICES = [
  {
    id: "frontend",
    number: "01",
    icon: FaCode,
    title: "FRONTEND & UI ENGINEERING",
    subtitle: "Modern Web Applications & Responsive Interfaces",
    desc: "Developing interactive, accessible, and high-performance user interfaces using modern React architecture, component-driven design, and fluid responsive styling.",
    skills: ["React JS", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    accent: "#14b8a6",
  },
  {
    id: "workflow",
    number: "02",
    icon: FaLaptopCode,
    title: "ENGINEERING & WORKFLOWS",
    subtitle: "Modern Git & AI-Powered Acceleration",
    desc: "Building maintainable codebases with structured version control, efficient development workflows, and leveraging state-of-the-art AI developer tools to accelerate quality delivery.",
    skills: ["Git", "Vite", "AI Tools", "React JS", "JavaScript"],
    accent: "#38bdf8",
  },
];

const WhatIDo = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="whatIDO" id="what-i-do">
      <div className="what-box what-box-title">
        <div className="what-title-badge">
          <span>// 02. CAPABILITIES</span>
        </div>
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
        <p className="what-tagline">
          Transforming complex design ideas and system requirements into clean,
          responsive, and lightning-fast web applications.
        </p>
      </div>

      <div className="what-box what-box-cards">
        <div className="what-cards-container">
          {SERVICES.map((service, index) => {
            const isExpanded = activeCard === index;
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`what-card ${isExpanded ? "what-card-active" : "what-card-collapsed"}`}
                onClick={() => setActiveCard(index)}
                onMouseEnter={() => setActiveCard(index)}
                style={{ "--cardAccent": service.accent }}
              >
                {/* HUD Cyber Corners */}
                <div className="hud-corner hud-tl" />
                <div className="hud-corner hud-tr" />
                <div className="hud-corner hud-bl" />
                <div className="hud-corner hud-br" />

                <div className="what-card-header">
                  <div className="what-card-meta">
                    <span className="what-number">{service.number}</span>
                    <div className="what-icon" style={{ color: service.accent }}>
                      <Icon />
                    </div>
                  </div>
                  <div className="what-header-text">
                    <h3>{service.title}</h3>
                    <h4>{service.subtitle}</h4>
                  </div>
                  <div className={`what-expand-indicator ${isExpanded ? "expanded" : ""}`}>
                    <FaArrowRight />
                  </div>
                </div>

                <div className="what-card-body">
                  <p>{service.desc}</p>
                  <div className="what-skillset">
                    <h5>Skillset &amp; Technologies</h5>
                    <div className="what-tags-row">
                      {service.skills.map((skill) => (
                        <span key={skill} className="what-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

