import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
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
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="header-container">
          <Link to="/" className="navbar-title" data-cursor="disable">
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
          <ul>
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
        </div>
      </header>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;


