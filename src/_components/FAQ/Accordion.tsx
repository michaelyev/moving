import Accordion from "@mui/material/Accordion";
import data from "@/data.json";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AccordionDetails, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const accordionData = data.accordionData;

const Accordions = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {accordionData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            id={`accordion-summary-${index}`}
            aria-controls={`accordion-content-${index}`}
            expandIcon={<AddIcon />}
          >
            <Typography sx={{ color: "#343A40" }}>{item.title}</Typography> {/* Custom color */}
          </AccordionSummary>
          <AccordionDetails>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Accordions;
