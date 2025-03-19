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
  date,
  time,
  handleSubmit,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const prepareFullData = () => {
    const fullData = {
      heavyItems: heavyItems?.[0] || heavyItems || {},
      assemblyItems: assemblyItems || {},
      addressFrom,
      addressTo,
      distance,
      duration,
      propertyType,
      movers,
      clutterLevel,
      packingOption,
      date: date || "Not specified",
      time: time || "Not specified",
      movingCost: movingCost ?? "Not calculated",
      hourlyRate: movingCost && totalHours ? (movingCost / totalHours).toFixed(2) : "N/A",
    };

    console.log("✅ Full Data Before SMS:", fullData); // Проверяем данные перед отправкой SMS
    return fullData;
  };

  const generateSmsLink = () => {
    const fullData = prepareFullData();

    if (!fullData.movingCost || fullData.movingCost === "Not calculated") {
      console.error("⚠️ Moving cost is missing, SMS not sent.");
      return null;
    }

    const {
      addressFrom,
      addressTo,
      distance,
      duration,
      movers,
      date,
      time,
      clutterLevel,
      packingOption,
      heavyItems,
      assemblyItems,
      propertyType,
      movingCost,
      hourlyRate,
    } = fullData;

    const pickupDetails = propertyType?.pickupProperty || {};
    const dropoffDetails = propertyType?.dropOffProperty || {};

    // ✅ Форматируем дату
    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Not specified";

    // ✅ Форматируем время
    const formattedTime = time || "Not specified";

    // ✅ Форматируем детали недвижимости
    const formatPropertyDetails = (property) => {
      if (!property || !property.type) return "N/A";
      if (property.type === "House") {
        return `House, ${property.details?.stories || "N/A"} stories (${property.details?.squareFeet || "N/A"} sq. ft)`;
      }
      if (property.type === "Apartment") {
        return `Apartment, ${property.details?.rooms || "N/A"} rooms, Floor ${property.details?.floor || "N/A"}`;
      }
      return property.type;
    };

    // ✅ Извлекаем тяжёлые предметы
    const heavyItemsList = Object.entries(heavyItems)
      .filter(([_, item]) => item.quantity > 0)
      .map(([item, { quantity }]) => `${item} (x${quantity})`)
      .join(", ") || "None";

    // ✅ Извлекаем предметы для сборки/разборки
    const assemblyItemsList = Object.entries(assemblyItems)
      .filter(([_, item]) => item.quantity > 0)
      .map(([item, { quantity }]) => `${item} (x${quantity})`)
      .join(", ") || "None";

    // ✅ Формируем SMS-сообщение
    const smsBody = `
Hi! I need help moving.

📍 Pickup Address: ${addressFrom}
🏠 Pickup Property: ${formatPropertyDetails(pickupDetails)}

📍 Dropoff Address: ${addressTo}
🏠 Dropoff Property: ${formatPropertyDetails(dropoffDetails)}

📅 Move Date: ${formattedDate}
⏰ Move Time: ${formattedTime}
📏 Distance: ${distance} miles
⏳ Estimated Duration: ${duration} minutes

👷 Movers Needed: ${movers}
📦 Packing Option: ${packingOption}
📦 Clutter Level: ${clutterLevel}

🛑 Heavy Items: ${heavyItemsList}
🔧 Assembly Items: ${assemblyItemsList}

💰 Estimated Price: $${movingCost} (Hourly Rate: $${hourlyRate}/hr)

Can I get a better deal?
    `.trim();

    const smsLink = `sms:2066656711?&body=${encodeURIComponent(smsBody)}`;

    console.log("✅ SMS Link Generated:", smsLink);
    return smsLink;
  };

  const handleBookNow = () => {
    if (!movingCost) {
      console.error("⚠️ Cannot proceed without a calculated cost.");
      return;
    }

    if (enteredNumber) {
      handleSubmit(onSubmit)();
      setIsModalOpen(true);
    } else {
      console.error("⚠️ Phone number is required for booking.");
    }
  };

  const handleGetBetterDeal = () => {
    if (!movingCost) {
      console.error("⚠️ Cannot proceed without a calculated cost.");
      return;
    }

    const smsLink = generateSmsLink();
    if (smsLink) {
      console.log("📲 Opening SMS:", smsLink);
      window.open(smsLink);
    } else {
      console.error("⚠️ SMS link not generated!");
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
            "&:hover": { backgroundColor: movingCost ? "#4876FF" : "#FF881A" },
          }}
          type="button"
          onClick={handleBookNow}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            color: "black",
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundColor: "#FF881A" },
          }}
          type="button"
          onClick={handleGetBetterDeal}
        >
          Get a better deal
        </Button>
      </Sheet>

      {/* Modal */}
      {isModalOpen && (
        <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", borderRadius: 8, padding: 3, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", zIndex: 2000, textAlign: "center" }}>
          <Typography level="h5" sx={{ fontWeight: "bold", mb: 1 }}>Thank you!</Typography>
          <Typography level="body1">We&apos;ll be in touch shortly.</Typography>
          <Button sx={{ marginTop: 2, background: "#FF881A", color: "white", borderRadius: 4, "&:hover": { backgroundColor: "#4876FF" } }} onClick={closeModal}>Close</Button>
        </Box>
      )}
    </>
  );
};
