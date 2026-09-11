import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import "./styles/SocialIcons.css";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/krish-lad/",
    icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/ladkrish.09/",
    icon: FaInstagram,
  },
];

const SocialIcons = () => {
  return (
    <div className="icons-section">
      {/* Side Dock for LinkedIn, Instagram */}
      <aside className="side-social-dock" aria-label="Social profiles">
        {SOCIAL_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="side-social-btn"
              data-cursor="disable"
              aria-label={item.name}
              title={item.name}
            >
              <Icon />
              <span className="side-social-tooltip">{item.name}</span>
            </a>
          );
        })}
      </aside>

      {/* Floating Bottom-Right Resume Button */}
      <a
        className="side-resume-pill"
        href="/Krish_Lad.pdf"
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
        title="View Resume (PDF)"
      >
        <TbNotes className="side-resume-icon" />
        <span className="side-resume-text">Resume</span>
        <MdArrowOutward className="side-resume-arrow" />
      </a>
    </div>
  );
};

export default SocialIcons;

