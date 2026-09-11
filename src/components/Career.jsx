import "./styles/Career.css";
import { FaBriefcase, FaGraduationCap, FaSchool } from "react-icons/fa6";

const MILESTONES = [
  {
    type: "Work Experience",
    icon: FaBriefcase,
    role: "Trainee Software Engineer",
    company: "Narola Infotech, Surat",
    period: "2026",
    duration: "Jan 2026 – Jun 2026",
    desc: "Contributed to a centralized B2B KYC platform optimizing business onboarding, identity verification, and deal workflows. Designed and implemented a Trust Score module, developed real-time features with Socket.io for live updates, and collaborated through Git in an Agile environment.",
    skills: ["B2B KYC Platform", "Trust Score Module", "Socket.io", "React.js", "Agile / Git"],
    accent: "#14b8a6",
  },
  {
    type: "Post Graduation",
    icon: FaGraduationCap,
    role: "Master of Computer Applications (MCA)",
    company: "Gujarat Technological University",
    period: "2024–26",
    duration: "2024 – 2026",
    desc: "Pursued advanced post-graduate computer science curriculum with emphasis on frontend web engineering, modern JavaScript frameworks, distributed systems, database management, and scalable application architecture.",
    skills: ["Frontend Engineering", "Modern JavaScript", "Component Architecture", "Scalable Systems"],
    accent: "#38bdf8",
  },
  {
    type: "Graduation",
    icon: FaGraduationCap,
    role: "Bachelor of Computer Applications (BCA)",
    company: "Naran Lala College, VNSGU",
    period: "2021–24",
    duration: "2021 – 2024",
    desc: "Completed undergraduate studies in computer applications with coursework in web development (HTML, CSS, JavaScript), object-oriented programming, data structures, and collaborative software projects.",
    skills: ["HTML & CSS", "JavaScript ES6+", "OOP", "Database Management", "Data Structures"],
    accent: "#60a5fa",
  },
  {
    type: "Higher Secondary",
    icon: FaSchool,
    role: "Higher Secondary Education (GSEB)",
    company: "Sheth P.H. Vidhyalaya",
    period: "2019–21",
    duration: "2019 – 2021",
    desc: "Completed 10th and 12th Gujarat State Board education with a solid foundation in mathematics, scientific reasoning, and analytical thinking.",
    skills: ["Mathematics", "Computer Fundamentals", "Analytical Problem Solving"],
    accent: "#a855f7",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <div className="career-header">
          <div className="career-badge">
            <span>// 03. EXPERIENCE &amp; EDUCATION</span>
          </div>
          <h2>
            Career <span>&amp;</span> Journey
          </h2>
          <p className="career-subheading">
            My professional experience and academic trajectory in computer applications.
          </p>
        </div>

        <div className="career-info">
          {/* Continuous Glowing Timeline Rail */}
          <div className="career-timeline-rail">
            <div className="career-timeline-line"></div>
          </div>

          {MILESTONES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="career-item-row"
                style={{ "--timelineAccent": item.accent }}
              >
                {/* Milestone Node on the timeline rail */}
                <div className="career-node">
                  <div
                    className="career-node-circle"
                    style={{ borderColor: item.accent, color: item.accent }}
                  >
                    <Icon />
                  </div>
                  <div className="career-connector-line"></div>
                </div>

                {/* Milestone Content Card */}
                <div className="career-info-box">
                  <div className="career-info-in">
                    <div className="career-role">
                      <span className="career-type-pill">{item.type}</span>
                      <h4>{item.role}</h4>
                      <h5>{item.company}</h5>
                      <span className="career-duration">{item.duration}</span>
                    </div>
                    <div className="career-period-badge">
                      <h3>{item.period}</h3>
                    </div>
                  </div>

                  <div className="career-body">
                    <p>{item.desc}</p>
                    <div className="career-tags-row">
                      {item.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="career-tag">
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

export default Career;

