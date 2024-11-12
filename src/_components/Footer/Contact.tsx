import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServicesSectionProps } from "@/types/types";
import ContactInfo from "./ContactInfo";

const Contact = ({ isSmallScreen }: ServicesSectionProps) => {
  if (isSmallScreen) {
    return (
      <Accordion sx={{ background: "inherit", boxShadow: "none" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Contact Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactInfo />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Contact Information</Typography>
      <ContactInfo />
    </Box>
  );
};

export default Contact;
