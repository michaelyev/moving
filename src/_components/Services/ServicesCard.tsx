// @ts-nocheck
import Grid from "@mui/material/Grid2";
import React from "react";
import data from "@/data.json";
import ServiceCardItem from "./ServiceCardItem";
import { ServiceCardProps } from "@/types/types";

const ServiceCard = () => {
  const cards = data.cards;
  return (
    <Grid 
      container 
      spacing={4} 
      justifyContent="center" 
      alignItems="center" 
      sx={{ width: '100%', marginX: 'auto', mt: 4 }}
    >
      {cards.map((card: ServiceCardProps) => (
        <ServiceCardItem
          key={card.id}
          description={card.description}
          features={card.features}
          title={card.title}
        />
      ))}
    </Grid>
  );
};

export default ServiceCard;
