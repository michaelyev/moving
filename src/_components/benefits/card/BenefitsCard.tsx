import data from "@/data.json";
import BenefitsCardItem from "./BenefitsCardItem";

import UniversalCardLayout from "./CardLayout";

const BenefitsCard = () => {
  return (
    <UniversalCardLayout
      variant="benefits"
      data={data.benefits}
      CardItemComponent={BenefitsCardItem}
    />
  );
};

export default BenefitsCard;
