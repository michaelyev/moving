import { Box, Link, Typography } from "@mui/material";
import data from "@/data.json";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServicesSectionProps } from "../../types/types";

const Company = ({ isSmallScreen }: ServicesSectionProps) => {
  const companies = data.companies;

  const CompaniesLinks = () => (
    <Box sx={{ color: "inherit" }}>
      {companies.map((service) => (
        <Link
          key={service.id}
          href={service.link}
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
          <Typography variant="h6">Company</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompaniesLinks />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Company</Typography>
      <CompaniesLinks />
    </Box>
  );
};

export default Company;
