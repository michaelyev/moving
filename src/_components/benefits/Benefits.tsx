import BenefitsCard from "./card/BenefitsCard";
import SectionLayout from "./UniLAyout";

const Benefits = () => {
  return (
    <SectionLayout
      title="Our benefits"
      subtitle="Why Choose Us? Unmatched Service, Reliability, and Care."
      fullHeight={false}
      marginTop={4}
      
      
    >
      <BenefitsCard />
    </SectionLayout>
  );
};

export default Benefits;
