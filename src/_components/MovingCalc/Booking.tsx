// @ts-nocheck
import React, { useState } from "react";
import { Box, Typography, Button, Sheet } from "@mui/joy";
import { isMobile } from "react-device-detect";

export const Booking = ({
  movingCost,
  enteredNumber,
  distance,
  duration,
  totalHours,
  movers,
  clutterLevel,
  packingOption,
  heavyItems,
  assemblyItems,
  addressFrom,
  addressTo,
  propertyType,
  handleSubmit,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prepareFullData = () => ({
    phoneNumber: enteredNumber || "N/A",
    heavyItems: heavyItems || [],
    addressFrom,
    addressTo,
    distance,
    duration,
    propertyType,
    movers,
    clutterLevel,
    packingOption,
    time: "7:00 AM", // Replace if dynamically set
  });

  const generateSmsLink = () => {
    const fullData = prepareFullData();
    const {
      phoneNumber,
      addressFrom,
      addressTo,
      distance,
      duration,
      movers,
      clutterLevel,
      packingOption,
      heavyItems,
      propertyType,
    } = fullData;
  
    // Format property type details
    const pickupDetails = propertyType?.pickupProperty;
    const dropoffDetails = propertyType?.dropOffProperty;
  
    const smsBody = `
  Moving Summary:
  📍 From: ${addressFrom}
  📍 To: ${addressTo}
  📏 Distance: ${distance} miles
  ⏳ Duration: ${duration} min
  👷 Movers: ${movers}
  📦 Packing: ${packingOption}
  📦 Heavy Items: ${heavyItems.length ? heavyItems.join(", ") : "None"}
  🏠 Pickup: ${pickupDetails?.type}, Floor ${pickupDetails?.details?.floor}
  🏠 Dropoff: ${dropoffDetails?.type}, Floor ${dropoffDetails?.details?.floor}
  
  Can I get a better deal?
    `.trim();
  
    return `sms:2062552708?&body=${encodeURIComponent(smsBody)}`;
  };
  

  const handleBookNow = () => {
    if (!movingCost) {
      console.error("Cannot proceed without a calculated cost.");
      return;
    }

    if (enteredNumber) {
      handleSubmit(onSubmit)(); // Submit form if a phone number exists
      setIsModalOpen(true); // Open modal
    } else {
      console.error("Phone number is required for booking.");
    }
  };

  const handleGetBetterDeal = () => {
    if (!movingCost) {
      console.error("Cannot proceed without a calculated cost.");
      return;
    }

    if (isMobile) {
      // Redirect to SMS on mobile devices only
      const smsLink = generateSmsLink();
      window.location.href = smsLink;
    } else {
      // On desktop, just log an error or perform desktop-specific behavior
      console.log("SMS functionality is not available on desktop.");
      if (enteredNumber) {
        handleSubmit(onSubmit)(); // Submit the form if phone number exists
        setIsModalOpen(true); // Open modal
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Sheet
        sx={{
          justifyContent: "space-between",
          display: "flex",
          marginX: "auto",
          background: "transparent",
          width: "100%",
          maxWidth: "416px",
        }}
      >
        {/* Book Now Button */}
        <Button
          sx={{
            background: movingCost ? "#FF881A" : "rgba(255, 137, 25, 0.40)",
            borderRadius: "100px",
            width: "42%",
            minHeight: "40px",
            transition: "background-color 0.5s ease",
            "&:hover": {
              backgroundColor: movingCost ? "#4876FF" : "#FF881A",
            },
          }}
          type="button"
          onClick={handleBookNow}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Book for:</span>
            {movingCost !== null && enteredNumber ? (
              <span>${movingCost}</span>
            ) : (
              <div
                style={{
                  background: "#FFF1C2",
                  borderRadius: "8px",
                  height: "21px",
                  width: "50px",
                }}
              ></div>
            )}
          </div>
        </Button>

        {/* Get a Better Deal Button */}
        <Button
          sx={{
            background: "#FFD133",
            borderRadius: "100px",
            width: "42%",
            minHeight: "40px",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#FF881A",
              boxShadow: "0 4px 15px rgba(255, 137, 25, 0.5)",
            },
            "&:active": {
              transform: "scale(0.98)",
            }, // Fixed closing curly brace here
          }}
          type="button"
          onClick={handleGetBetterDeal}
        >
          Get a better deal
        </Button>
      </Sheet>

      {/* Modal */}
      {isModalOpen && movingCost && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 3,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
            textAlign: "center",
          }}
        >
          <Typography level="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Thank you!
          </Typography>
          <Typography level="body1">We&apos;ll be in touch shortly.</Typography>
          <Button
            sx={{
              marginTop: 2,
              background: "#FF881A",
              color: "white",
              borderRadius: 4,
              "&:hover": {
                backgroundColor: "#4876FF",
              },
            }}
            onClick={closeModal}
          >
            Close
          </Button>
        </Box>
      )}
    </>
  );
};
