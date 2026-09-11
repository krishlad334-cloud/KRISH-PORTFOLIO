import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother = null;

const navItems = [
  { name: "HOME", path: "/", sectionId: "#landingDiv" },
  { name: "ABOUT", path: "/about", sectionId: "#about" },
  { name: "WHAT I DO", path: "/what-i-do", sectionId: "#what-i-do" },
  { name: "CAREER", path: "/career", sectionId: "#career" },
  { name: "WORK", path: "/work", sectionId: "#work" },
  { name: "SKILLS", path: "/skills", sectionId: "#skills" },
  { name: "CONTACT", path: "/contact", sectionId: "#contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(location.pathname !== "/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on desktop resize or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const checkScroll = () => {
      let scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        0;
      if (smoother && typeof smoother.scrollTop === "function") {
        const sTop = smoother.scrollTop();
        if (sTop > 0) scrollY = sTop;
      }
      setIsScrolled(scrollY > 15);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });

    let st = null;
    try {
      st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 15);
        },
      });
    } catch {
      // fallback to scroll listener
    }

    checkScroll();

    return () => {
      window.removeEventListener("scroll", checkScroll);
      if (st) st.kill();
    };
  }, [location.pathname]);

  useEffect(() => {
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");

    if (wrapper && content) {
      try {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.7,
          speed: 1.7,
          effects: true,
          autoResize: true,
          ignoreMobileResize: true,
          smoothTouch: 0,
        });

        smoother.scrollTop(0);
        smoother.paused(true);
      } catch (e) {
        console.warn("ScrollSmoother notice:", e);
      }
    }

    const handleResize = () => {
      if (smoother) {
        ScrollSmoother.refresh(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";

    if (location.pathname === "/") {
      const targetElement = document.querySelector(item.sectionId);
      if (targetElement) {
        if (smoother && window.innerWidth > 1024) {
          smoother.scrollTo(item.sectionId, true, "top top");
        } else {
          const headerHeight = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }
        return;
      }
    }

    navigate(item.path);
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? "header-scrolled" : ""} ${
          isMobileMenuOpen ? "header-menu-open" : ""
        }`}
      >
        <div className="header-container">
          <Link
            to="/"
            className="navbar-title"
            data-cursor="disable"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            KL
          </Link>
          <a
            href="https://www.linkedin.com/in/krish-lad/"
            className="navbar-connect"
            data-cursor="disable"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/krish-lad
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar-desktop-menu">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  data-href={item.sectionId}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <HoverLinks text={item.name} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            data-cursor="disable"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Outside header to avoid transform container clipping) */}
      <div
        className={`mobile-menu-drawer ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav className="mobile-menu-panel" aria-label="Mobile Navigation">
          <div className="mobile-menu-header">
            <span className="mobile-menu-tag">// NAVIGATION</span>
            <span className="mobile-status-dot-wrap">
              <span className="mobile-status-dot"></span> Available for work
            </span>
          </div>

          <ul className="mobile-nav-list">
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} className="mobile-nav-item">
                  <Link
                    to={item.path}
                    data-href={item.sectionId}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, item)}
                    data-cursor="disable"
                  >
                    <span className="mobile-nav-num">0{idx + 1}</span>
                    <span className="mobile-nav-text">{item.name}</span>
                    <span className="mobile-nav-arrow">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mobile-menu-footer">
            <a
              href="/Krish_Lad.pdf"
              target="_blank"
              rel="noreferrer"
              className="mobile-resume-btn"
              data-cursor="disable"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <TbNotes className="mobile-resume-icon" />
              <span>View Resume (PDF)</span>
              <MdArrowOutward />
            </a>

            <div className="mobile-social-links">
              <a
                href="https://github.com/krishlad334-cloud"
                target="_blank"
                rel="noreferrer"
                className="mobile-social-icon"
                aria-label="GitHub profile"
                data-cursor="disable"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/krish-lad/"
                target="_blank"
                rel="noreferrer"
                className="mobile-social-icon"
                aria-label="LinkedIn profile"
                data-cursor="disable"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/ladkrish.09/"
                target="_blank"
                rel="noreferrer"
                className="mobile-social-icon"
                aria-label="Instagram profile"
                data-cursor="disable"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </nav>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;


