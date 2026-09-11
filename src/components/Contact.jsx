import { useState } from "react";
import {
  MdArrowOutward,
  MdCopyright,
  MdEmail,
  MdPhone,
  MdContentCopy,
  MdCheck,
} from "react-icons/md";
import { FaLinkedinIn, FaInstagram, FaFilePdf } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  const [copiedItem, setCopiedItem] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  return (
    <div className="contact-section" id="contact">
      {/* Copied Feedback Toast */}
      {copiedItem && (
        <div className="contact-toast">
          <MdCheck /> Copied {copiedItem} to clipboard!
        </div>
      )}

      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-badge">
            <span>// 05. GET IN TOUCH</span>
          </div>
          <h3>
            Let&apos;s Build Something <span>Exceptional</span>
          </h3>
          <p className="contact-subhead">
            Open for Frontend Developer opportunities, collaborations, and discussions.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Communication Card */}
          <div className="contact-card">
            <h4>Direct Reach</h4>
            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <MdEmail />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Email</span>
                  <a
                    href="mailto:krishlad334@gmail.com"
                    className="contact-item-value"
                    data-cursor="disable"
                  >
                    krishlad334@gmail.com
                  </a>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard("krishlad334@gmail.com", "email")}
                  title="Copy email"
                  data-cursor="disable"
                >
                  <MdContentCopy />
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MdPhone />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Phone</span>
                  <a
                    href="tel:+919327616340"
                    className="contact-item-value"
                    data-cursor="disable"
                  >
                    +91 93276 16340
                  </a>
                </div>
                <button
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard("+919327616340", "phone")}
                  title="Copy phone number"
                  data-cursor="disable"
                >
                  <MdContentCopy />
                </button>
              </div>
            </div>

            <div className="contact-resume-box">
              <a
                href="/Krish_Lad.pdf"
                download="Krish_Lad_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="contact-resume-btn"
                data-cursor="disable"
              >
                <FaFilePdf /> Download Resume (PDF) <MdArrowOutward />
              </a>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="contact-card">
            <h4>Profiles &amp; Networks</h4>
            <div className="contact-social-grid">
              <a
                href="https://www.linkedin.com/in/krish-lad/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-link"
              >
                <div className="social-link-left">
                  <FaLinkedinIn className="social-icon" />
                  <span>LinkedIn</span>
                </div>
                <MdArrowOutward />
              </a>

              <a
                href="https://www.instagram.com/ladkrish.09/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
                className="contact-social-link"
              >
                <div className="social-link-left">
                  <FaInstagram className="social-icon" />
                  <span>Instagram</span>
                </div>
                <MdArrowOutward />
              </a>
            </div>
          </div>

          {/* Education & Overview Card */}
          <div className="contact-card">
            <h4>Education</h4>
            <div className="contact-edu-item">
              <h5>Master of Computer Applications (MCA)</h5>
              <p>Gujarat Technological University • 2024–2026</p>
            </div>
            <div className="contact-edu-item">
              <h5>Bachelor of Computer Applications (BCA)</h5>
              <p>Naran Lala College (VNSGU) • 2021–2024</p>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="contact-footer">
          <h2>
            Designed &amp; Developed by <span>Krish Lad</span>
          </h2>
          <h5>
            <MdCopyright /> 2026 Krish Lad. Dedicated Frontend Developer.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;

