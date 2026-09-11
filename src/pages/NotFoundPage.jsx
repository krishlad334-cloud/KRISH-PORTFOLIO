import { Link } from "react-router-dom";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import SocialIcons from "../components/SocialIcons";
import { MdHome } from "react-icons/md";
import "./PageLayout.css";

const NotFoundPage = () => {
  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="page-wrapper page-view">
        <div className="not-found-container">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-desc">
            The page you are looking for doesn't exist or has been moved. Return to the home portfolio to explore.
          </p>
          <Link to="/" className="page-back-link" data-cursor="disable">
            <MdHome /> Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
