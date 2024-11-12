import { Box, Link, Typography } from "@mui/material";
import data from "@/data.json";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServicesSectionProps } from "@/types/types";

const Services = ({ isSmallScreen }: ServicesSectionProps) => {
  const services = data.services;

  const ServiceLinks = () => (
    <Box sx={{ color: "inherit" }}>
      {services.map((service) => (
        <Link
          key={service.id}
          href="#"
          sx={{
            color: "inherit",
            textDecoration: "none",
            display: "block",
            lineHeight: 2,
          }}
        >
          {service.title}
        </Link>
      ))}
    </Box>
  );

  if (isSmallScreen) {
    return (
      <Accordion sx={{ background: "inherit", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ServiceLinks />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Services</Typography>
      <ServiceLinks />
    </Box>
  );
};

export default Services;
