import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import { MdArrowBack } from "react-icons/md";
import "./PageLayout.css";

const PageLayout = ({ title, highlight, subtitle, children }) => {
  useEffect(() => {
    document.body.style.overflowY = "auto";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="page-wrapper page-view">
        <div className="page-header">
          <div>
            <h1>
              {title} {highlight && <span>{highlight}</span>}
            </h1>
            {subtitle && <p style={{ color: "#94a3b8", margin: "6px 0 0" }}>{subtitle}</p>}
          </div>
          <Link to="/" className="page-back-link" data-cursor="disable">
            <MdArrowBack /> Back to Home
          </Link>
        </div>
        <div className="page-content-wrapper">{children}</div>
      </main>
    </div>
  );
};

export default PageLayout;
