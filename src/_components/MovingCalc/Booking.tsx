// @ts-nocheck
import React from "react";
import { Sheet, Button, Typography } from "@mui/joy";
import Link from "next/link";
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
  handleSubmit, // Accept handleSubmit as a prop
  onSubmit, // Pass the parent's onSubmit handler
}) => {
  const handleGetBetterDeal = async () => {
    const data = {
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
    };

    if (isMobile) {
      // Redirect to SMS
      window.location.href = `sms:2062552708?&body=${encodeURIComponent(
        movingCost
          ? `Moving Summary:
- Cost: $${movingCost}
- Distance: ${distance || "N/A"} miles
- Duration: ${duration || "N/A"} minutes
- Total Hours: ${totalHours || "N/A"}
- Movers: ${movers || "N/A"}
- Clutter Level: ${clutterLevel || "N/A"}
- Packing Option: ${packingOption || "N/A"}
- Heavy Items: ${heavyItems ? "Yes" : "No"}
- Assembly/Disassembly: ${
            Object.keys(assemblyItems).length > 0 ? "Yes" : "No"
          }

Can I get a better deal?`
          : "Hello, I need help moving"
      )}`;
    } else {
      // Submit data to the backend
      handleSubmit(onSubmit)(); // Submit the form
    }
  };

  return (
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
        onClick={handleSubmit(onSubmit)} // Submit the form
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
  );
};


