import Accordions from "./Accordion";
import { Box, Typography } from "@mui/material";
import React from "react";
import { BookButton } from "../BookButton/BookButton"; // Assuming you already have a BookButton component

const FAQ = () => {
  return (
    <Box
      display="flex"
      height="100%"
      mb={4}
      p={3}
      sx={{
        background: "#FFD133",
        borderRadius: 8,
        boxShadow:
          "0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)", // Shadow for main container
        flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on desktop
      }}
      id="faq"
    >
      {/* FAQ Header and Text Section */}
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
            textAlign: { xs: "center", md: "left" }, // Center on mobile, left on desktop
          }}
        >
          FAQ
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          sx={{
            typography: { xs: "body1", md: "h6" },
            textAlign: { xs: "center", md: "left" }, // Center on mobile, left on desktop
          }}
        >
          Answers to Your Most Common Moving Questions
        </Typography>
        <Typography
          sx={{
            typography: { xs: "h5", md: "h4" },
            display: { xs: "none", md: "block" }, // Visible only on desktop
          }}
          variant="h4"
          mt={3}
        >
          Need more information? <br />
          Reach us at{" "}
          <Box
            component="a"
            href="tel:+12069238356"
            sx={{
              color: "#0073e6",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.25rem",
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "#005bb5",
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            c
          </Box>
        </Typography>
        <Box
          mt={3}
          display={{ xs: "none", md: "flex" }} // Desktop-only layout for "Book Now"
          gap={2}
          alignItems="center"
        >
          <BookButton variant="regular" />
          <Typography>for personalized support.</Typography>
        </Box>
      </Box>

      {/* Accordion Section */}
      <Box
        height="100%"
        sx={{
          flex: 1,
          mt: { xs: 3, sm: 0 },
          boxShadow:
            "0 3px 8px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08)", // Shadow for Accordion area
          borderRadius: 8,
        }}
      >
        <Accordions />
      </Box>

      {/* Mobile-Specific Section */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" }, // Mobile-only section
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          gap: 2, // Space between elements
        }}
      >
        <Typography
          sx={{
            typography: "h5",
            textAlign: "center",
          }}
          variant="h5"
        >
          Need more information? <br />
          Reach us at{" "}
          <Box
            component="a"
            href="tel:+12069238356"
            sx={{
              color: "#0073e6",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.5rem", // Larger font size for number
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "#005bb5",
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            206-923-8356
          </Box>
        </Typography>
        <BookButton variant="regular" />
      </Box>
    </Box>
  );
};

export default FAQ;
