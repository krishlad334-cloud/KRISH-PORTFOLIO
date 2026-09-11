import PageLayout from "./PageLayout";
import TechStack from "../components/TechStack";

const SkillsPage = () => {
  return (
    <PageLayout
      title="Skills &amp;"
      highlight="Tech Stack"
      subtitle="Proficiencies across modern web development, frontend frameworks, version control, and AI tools."
    >
      <TechStack />
    </PageLayout>
  );
};

export default SkillsPage;
