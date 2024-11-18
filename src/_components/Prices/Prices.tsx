// @ts-nocheck

'use client'

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaUserFriends, FaTruckMoving, FaHome } from "react-icons/fa";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  borderRadius: "24px", // Set border radius to 24px
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const moverOptions = [
  { movers: 2, price: 135, bedrooms: { apartment: "1-2", house: "1" } },
  { movers: 3, price: 175, bedrooms: { apartment: "2-3", house: "2" } },
  { movers: 4, price: 230, bedrooms: { apartment: "3+", house: "3-4" } },
];

const PricingCalculator = () => {
  const renderPricingCard = (option) => (
    <Grid id='pricing' item xs={12} md={4} key={option.movers}>
      <StyledCard elevation={2}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FaUserFriends size={24} />
            <Typography variant="h5" component="div">
              {option.movers} Movers
            </Typography>
          </Box>
          <Typography variant="h4" color="primary" gutterBottom>
            ${option.price} per hour
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <FaTruckMoving /> Suitable for apartments with{" "}
            {option.bedrooms.apartment} bedroom(s)
          </Typography>
          <Typography variant="body2">
            <FaHome /> Suitable for houses with {option.bedrooms.house}{" "}
            bedroom(s)
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Moving Hourly Cost
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" mb={4}>
        Choose the number of movers based on your needs.
      </Typography>

      <Grid container spacing={4}>
        {moverOptions.map(renderPricingCard)}
      </Grid>
    </Container>
  );
};

export default PricingCalculator;
