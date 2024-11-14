import React from "react";

import ServiceCard from "./ServicesCard";
import SectionLayout from "../benefits/UniLAyout";

const Services = () => {
  return (
    <SectionLayout
      title="Moving Services in Seattle"
      subtitle="Expert Solutions for Residential and Commercial Moves."
    >
      <ServiceCard />
    </SectionLayout>
  );
};

export default Services;
