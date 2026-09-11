import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

const WorkImage = ({ image, alt, video, link }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleMouseEnter = async () => {
    if (video) {
      setIsVideo(true);
      try {
        const response = await fetch(`src/assets/${video}`);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setVideoUrl(blobUrl);
      } catch (e) {
        console.warn("Could not load preview video:", e);
      }
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noreferrer"
        data-cursor="disable"
        title="Open live project"
      >
        {/* Browser Mockup Top Bar */}
        <div className="work-browser-bar">
          <div className="browser-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="browser-url-bar">
            <span>{link ? link.replace(/^https?:\/\//, "").replace(/\/$/, "") : "live-preview"}</span>
          </div>
          <div className="browser-action-icon">
            <MdArrowOutward />
          </div>
        </div>

        <div className="work-img-container">
          <img src={image} alt={alt || "Project preview"} />
          {isVideo && videoUrl && (
            <video src={videoUrl} autoPlay muted playsInline loop></video>
          )}
          <div className="work-image-overlay">
            <span className="work-overlay-badge">
              Visit Live Site <MdArrowOutward />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default WorkImage;

