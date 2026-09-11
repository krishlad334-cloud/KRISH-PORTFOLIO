import PageLayout from "./PageLayout";
import Contact from "../components/Contact";

const ContactPage = () => {
  return (
    <PageLayout
      title="Get In"
      highlight="Touch"
      subtitle="Feel free to reach out for collaborations, engineering opportunities, or technology discussions."
    >
      <Contact />
    </PageLayout>
  );
};

export default ContactPage;
