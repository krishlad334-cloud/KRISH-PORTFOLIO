import gsap from "gsap";

let flickerInterval = null;

export function setCharTimeline(character, camera) {
  if (flickerInterval) clearInterval(flickerInterval);

  let intensity = 0;
  flickerInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);

  const landingTrigger = document.querySelector(".landing-section");
  if (!landingTrigger) return;

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight, monitor;
  character?.children?.forEach((object) => {
    if (object.name === "Plane004") {
      object.children?.forEach((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
          if (child.material.name === "Material.018") {
            monitor = child;
            child.material.color?.set?.("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight") {
      if (object.material) {
        object.material.transparent = true;
        object.material.opacity = 0;
        object.material.emissive?.set?.("#5eead4");
        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
        screenLight = object;
      }
    }
  });

  const neckBone = character?.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    if (character && camera) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-30%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "20%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);

      if (neckBone) {
        tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
      }
      if (monitor && monitor.material) {
        tl2.to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0);
      }
      if (screenLight && screenLight.material) {
        tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
      }

      tl2.fromTo(
        ".what-box-cards",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 4 },
        0
      );

      if (monitor && monitor.position) {
        tl2.fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        );
      }

      tl2.fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  } else {
    if (character && camera) {
      // Mobile and Tablet: Smoothly fade and move character out during hero scroll
      const mobTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      mobTl
        .to(
          ".character-model",
          {
            opacity: 0,
            y: "-40%",
            scale: 0.85,
            duration: 1,
            ease: "power2.out",
          },
          0
        )
        .to(
          ".landing-container",
          {
            opacity: 0,
            duration: 0.4,
          },
          0
        );

      gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "bottom top",
          onEnter: () => {
            gsap.set(".character-model", { pointerEvents: "none", visibility: "hidden" });
          },
          onLeaveBack: () => {
            gsap.set(".character-model", { pointerEvents: "inherit", visibility: "visible" });
          },
        },
      });


      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-cards",
          start: "top 85%",
          end: "bottom top",
        },
      });
      tM2.fromTo(".what-box-cards", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0);
    }
  }
}

export function setAllTimeline() {
  const careerTrigger = document.querySelector(".career-section");
  if (!careerTrigger) return;

  const isMobile = window.innerWidth <= 768;

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".career-section",
      start: isMobile ? "top 85%" : "top 65%",
      end: "bottom 75%",
      scrub: isMobile ? false : 1,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(
      ".career-timeline-line",
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1 },
      0
    )
    .fromTo(
      ".career-node-circle",
      { scale: 0.6, opacity: 0.4 },
      { scale: 1, opacity: 1, stagger: 0.15, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0.4, x: 20 },
      { opacity: 1, x: 0, stagger: 0.15, duration: 0.8 },
      0
    );
}


