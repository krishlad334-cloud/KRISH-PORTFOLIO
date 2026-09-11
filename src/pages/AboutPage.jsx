import PageLayout from "./PageLayout";
import About from "../components/About";

const AboutPage = () => {
  return (
    <PageLayout
      title="About"
      highlight="Krish Lad"
      subtitle="Discover my background, engineering philosophy, and passion for modern web technologies."
    >
      <About />
    </PageLayout>
  );
};

export default AboutPage;
