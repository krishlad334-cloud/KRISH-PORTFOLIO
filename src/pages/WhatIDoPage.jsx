import PageLayout from "./PageLayout";
import WhatIDo from "../components/WhatIDo";

const WhatIDoPage = () => {
  return (
    <PageLayout
      title="What"
      highlight="I Do"
      subtitle="Engineering specialized solutions across frontend architecture and AI-driven workflows."
    >
      <WhatIDo />
    </PageLayout>
  );
};

export default WhatIDoPage;
