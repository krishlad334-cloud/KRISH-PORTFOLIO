import PageLayout from "./PageLayout";
import Career from "../components/Career";

const CareerPage = () => {
  return (
    <PageLayout
      title="Career &amp;"
      highlight="Experience"
      subtitle="A chronology of professional milestones, leadership, and hands-on software development."
    >
      <Career />
    </PageLayout>
  );
};

export default CareerPage;
