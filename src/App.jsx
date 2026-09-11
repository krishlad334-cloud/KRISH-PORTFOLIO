import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import WhatIDoPage from "./pages/WhatIDoPage";
import CareerPage from "./pages/CareerPage";
import WorkPage from "./pages/WorkPage";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/what-i-do" element={<WhatIDoPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
