import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "power1.out",
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    let frameId;
    const renderLoop = () => {
      const lerpSpeed = isHovering ? 0.22 : 0.15;
      ringX += (mouseX - ringX) * lerpSpeed;
      ringY += (mouseY - ringY) * lerpSpeed;

      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });

      frameId = requestAnimationFrame(renderLoop);
    };
    frameId = requestAnimationFrame(renderLoop);

    const onMouseOver = (e) => {
      const disableTarget = e.target.closest('[data-cursor="disable"]');
      if (disableTarget) {
        isHovering = false;
        ring.classList.remove("cursor-hover");
        ring.classList.add("cursor-disabled");
        dot.classList.add("dot-hidden");
        return;
      }
      ring.classList.remove("cursor-disabled");

      const target = e.target.closest("a, button, .skill-card, .what-content, .career-info-box");
      if (target) {
        isHovering = true;
        ring.classList.add("cursor-hover");
        dot.classList.add("dot-hidden");
      }
    };

    const onMouseOut = (e) => {
      const disableTarget = e.target.closest('[data-cursor="disable"]');
      if (disableTarget) {
        ring.classList.remove("cursor-disabled");
        dot.classList.remove("dot-hidden");
      }

      const target = e.target.closest("a, button, .skill-card, .what-content, .career-info-box");
      if (target) {
        isHovering = false;
        ring.classList.remove("cursor-hover");
        dot.classList.remove("dot-hidden");
      }
    };

    const onMouseLeaveWindow = () => {
      ring.classList.add("cursor-disabled");
      dot.classList.add("dot-hidden");
    };

    const onMouseEnterWindow = () => {
      ring.classList.remove("cursor-disabled");
      dot.classList.remove("dot-hidden");
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;
