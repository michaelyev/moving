import Accordions from "./Accordion";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const FAQ = () => {
  return (
    <Box
      display="flex"
      height="100%"
      my={4}
      p={3}
      sx={{
        background: "#FFD133",
        borderRadius: 8,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // Shadow for main container
        flexDirection: { xs: "column", sm: "row" },
      }}
      id="faq"
    >
      <Box
        sx={{
          flex: 1,
          pr: { sm: 2 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: { xs: 400, lg: 500 },
            typography: { xs: "h4", md: "h3" },
          }}
        >
          FAQ
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          sx={{ typography: { xs: "body1", md: "h6" } }}
        >
          Answers to Your Most Common Moving Questions
        </Typography>
        <Typography
          sx={{
            typography: { xs: "body2", md: "body1" },
            display: { xs: "none", md: "block" },
          }}
          variant="body1"
          mt={2}
        >
          Need more information? <br /> Reach us at <b>206-255-2708</b> <br />
        </Typography>
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          gap={2}
          alignItems="center"
        >
          <Typography>for personalized support.</Typography>
        </Box>
      </Box>
      <Box
        height="100%"
        sx={{
          flex: 1,
          mt: { xs: 3, sm: 0 },
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)", // Shadow for Accordion area
          borderRadius: 8,
        }}
      >
        <Accordions />
        <Typography
          sx={{
            typography: { xs: "body2", md: "body1" },
            display: { xs: "block", md: "none" },
          }}
          variant="body1"
          mt={2}
        >
          Need more information? <br /> Reach us at <b>+1 232 232 454</b> <br />
          or
        </Typography>
        <Box
          display="flex"
          sx={{ display: { xs: "flex", md: "none" } }}
          gap={2}
          alignItems="center"
        >
          <Button
            sx={{
              backgroundColor: "primary.main",
              borderRadius: 8,
              color: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for button
            }}
          >
            Contact
          </Button>
          <Typography>for personalized support.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;
