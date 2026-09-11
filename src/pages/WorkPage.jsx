import PageLayout from "./PageLayout";
import Work from "../components/Work";

const WorkPage = () => {
  return (
    <PageLayout
      title="Featured"
      highlight="Work"
      subtitle="Selected web products, platforms, and interactive projects built with modern technologies."
    >
      <Work />
    </PageLayout>
  );
};

export default WorkPage;
