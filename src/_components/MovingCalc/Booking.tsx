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

  const handleBookNow = () => {
    if (!movingCost) {
      console.error("Cannot proceed without a calculated cost.");
      return;
    }

    if (enteredNumber) {
      // Submit the form if a phone number exists
      handleSubmit(onSubmit)();
      // Open the modal
      setIsModalOpen(true);
    } else {
      console.error("Phone number is required for booking.");
    }
  };

  const handleGetBetterDeal = () => {
    if (!movingCost) {
      console.error("Cannot proceed without a calculated cost.");
      return;
    }

    const smsBody = `
Moving Summary:
${movingCost ? `- Cost: $${movingCost}\n` : ""}
${distance ? `- Distance: ${distance} miles\n` : ""}
${duration ? `- Duration: ${duration} minutes\n` : ""}
${totalHours ? `- Total Hours: ${totalHours}\n` : ""}
${movers ? `- Movers: ${movers}\n` : ""}
${clutterLevel ? `- Clutter Level: ${clutterLevel}\n` : ""}
${packingOption ? `- Packing Option: ${packingOption}\n` : ""}
${heavyItems ? `- Heavy Items: Yes\n` : ""}
${
  Object.keys(assemblyItems || {}).length > 0
    ? `- Assembly/Disassembly: Yes\n`
    : ""
}
${addressFrom ? `- Pickup Address: ${addressFrom}\n` : ""}
${addressTo ? `- Drop-Off Address: ${addressTo}\n` : ""}
${
  propertyType?.pickupProperty?.type
    ? `- Pickup Property Type: ${propertyType.pickupProperty.type}\n`
    : ""
}
${
  propertyType?.dropOffProperty?.type
    ? `- Drop-Off Property Type: ${propertyType.dropOffProperty.type}\n`
    : ""
}
${enteredNumber ? `- Contact Number: ${enteredNumber}\n` : ""}

Can I get a better deal?
`.trim();

    if (isMobile) {
      // Redirect to SMS even if phone number is absent
      window.location.href = `sms:2062552708?&body=${encodeURIComponent(
        smsBody
      )}`;
    } else if (enteredNumber) {
      // Open the modal only if a phone number exists
      setIsModalOpen(true);
      handleSubmit(onSubmit)(); // Submit the form if on desktop and phone number exists
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
            animation: movingCost ? "fadeIn 0.5s ease" : "none",
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
            {movingCost !== null && enteredNumber !== null ? (
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
            background: "rgba(255, 137, 25, 0.40)",
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
            },
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
