import gsap from "gsap";
import { smoother } from "../Navbar";

let hasInitialized = false;

// Safety timeout to guarantee body is scrollable even on slow mobile networks
if (typeof window !== "undefined") {
  setTimeout(() => {
    document.body.style.overflowY = "auto";
  }, 4000);
}

export function initialFX() {
  if (hasInitialized) return;
  hasInitialized = true;

  document.body.style.overflowY = "auto";
  if (smoother && typeof smoother.paused === "function") {
    smoother.paused(false);
  }


  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 0.5,
  });

  // Smooth entrance for header & social icons
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0, y: -20 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
      stagger: 0.1,
    }
  );

  // Smooth entrance for landing intro text
  gsap.fromTo(
    [".landing-intro h2", ".landing-intro h1", ".landing-info h3", ".landing-rotator"],
    { opacity: 0, y: 30, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.3,
    }
  );
}
