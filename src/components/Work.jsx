import { useState, useCallback, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdArrowOutward, MdLaunch } from "react-icons/md";

const projects = [
  {
    title: "HomeNeeds",
    category: "E-Commerce & Modern Marketplace",
    tools: "React.js, Vite, Tailwind CSS, Responsive UI, Component Architecture",
    image: "/images/homeneeds.png",
    liveDemo: "https://kl-homeneeds.netlify.app/",
    desc: "A modern full-featured online marketplace for lifestyle products, home essentials, and electronics with curated categories, responsive product catalogs, and intuitive shopping workflows.",
  },
  {
    title: "Educity",
    category: "Education & Interactive Learning Platform",
    tools: "React.js, Modern CSS, Responsive Layouts, Video Integration, Web APIs",
    image: "/images/educity.png",
    liveDemo: "https://kl-educity.netlify.app/",
    desc: "An interactive educational platform designed to empower learning through online courses, campus programs, student testimonials, and responsive cross-device navigation.",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(null);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 450);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <div className="work-badge">
            <span>// 04. FEATURED PROJECTS</span>
          </div>
          <div className="work-title-row">
            <h2>
              Featured <span>Projects</span>
            </h2>
            <div className="work-counter">
              <span className="work-counter-current">0{currentIndex + 1}</span>
              <span className="work-counter-sep">/</span>
              <span className="work-counter-total">0{projects.length}</span>
            </div>
          </div>
        </div>

        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <p className="carousel-desc">{project.desc}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Stack &amp; Architecture</span>
                          <p>{project.tools}</p>
                        </div>
                        <div className="carousel-actions">
                          {project.liveDemo && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noreferrer"
                              className="carousel-live-btn"
                              data-cursor="disable"
                            >
                              <MdLaunch /> Live Demo <MdArrowOutward />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.liveDemo}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;

