import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const activeSplitMap = new WeakMap();

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const paras = document.querySelectorAll(".para");
  const titles = document.querySelectorAll(".title");

  // On smaller screens, keep text visible without complex character splitting
  if (window.innerWidth < 900) {
    paras.forEach((para) => {
      const existing = activeSplitMap.get(para);
      if (existing) {
        existing.anim?.kill?.();
        existing.split?.revert?.();
        activeSplitMap.delete(para);
      }
      para.style.opacity = "1";
      para.style.visibility = "visible";
    });
    titles.forEach((title) => {
      const existing = activeSplitMap.get(title);
      if (existing) {
        existing.anim?.kill?.();
        existing.split?.revert?.();
        activeSplitMap.delete(title);
      }
      title.style.opacity = "1";
      title.style.visibility = "visible";
    });
    return;
  }

  const triggerStart = window.innerWidth <= 1024 ? "top 75%" : "20% 70%";
  const toggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    // Revert prior split if it exists
    const existing = activeSplitMap.get(para);
    if (existing) {
      existing.anim?.kill?.();
      existing.split?.revert?.();
    }

    const split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    const anim = gsap.fromTo(
      split.words,
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        scrollTrigger: {
          trigger: para.parentElement || para,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.015,
      }
    );

    activeSplitMap.set(para, { split, anim });
  });

  titles.forEach((title) => {
    const existing = activeSplitMap.get(title);
    if (existing) {
      existing.anim?.kill?.();
      existing.split?.revert?.();
    }

    const split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });

    const anim = gsap.fromTo(
      split.chars,
      { autoAlpha: 0, y: 50, rotate: 6 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        scrollTrigger: {
          trigger: title.parentElement || title,
          toggleActions: toggleAction,
          start: triggerStart,
        },
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.025,
      }
    );

    activeSplitMap.set(title, { split, anim });
  });
}
