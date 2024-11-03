// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import BoltIcon from "@mui/icons-material/Bolt";
import { AddressInput } from "@/_components/AddressInput";
import { CalendarComponent } from "@/_components/Calendar";
import { ClutterSlide } from "@/_components/ClutterSlide";
import { Movers } from "@/_components/Movers";
import { PackagingButtons } from "@/_components/PackagingButtons";
import PhoneNumberInput from "@/_components/PhoneNumberInput";
import { PropertyTypeSelection } from "@/_components/PropertyTypeSelection";
import { HeavyItemsPicker } from "@/_components/HeavyItems";
import { AssemblyDisassemblyPicker } from "@/_components/AssemblyDisassembly";
import { PaymentMethodPicker } from "@/_components/PaymentMethod";
import { SummaryModal } from "@/_components/SummaryModal"; // Импорт модального окна
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/joy";
import Link from "next/link";

function calculateMovingCost(data) {
  const baseRates = {
    2: 135,
    3: 175,
    4: 230,
    5: 290,
  };

  const additionalFactors = {
    floorTimeIncrement: 0.5,
    freightElevatorMultiplier: 0.85,
    clutterLevel: {
      1: 0,
      2: 0.6,
      3: 1.2,
      4: 1.8,
      5: 2.5
    },
    heavyItemsTime: 0.5,
    assemblyItemsTime: 0.5,
    packingOptionMultiplier: { None: 1, Partial: 1.1, Full: 1.2 },
    packingTimeAddition: { None: 0, Partial: 0.5, Full: 1 },
    travelTimeRate: 1.5,
  };

  const minimumCost = 200;
  let movers;
  const rooms = data.propertyType.pickupProperty.details?.rooms || 1;
  const floor = parseInt(data.propertyType.pickupProperty.details?.floor) || 1;
  const isApartment = data.propertyType.pickupProperty.type === "Apartment";
  const durationInMinutes = data.duration || 0;

  // Determine number of movers based on apartment size
  if (isApartment) {
    if (rooms <= 1) {
      movers = 2;
    } else if (rooms <= 3) {
      movers = 3;
    } else {
      movers = 4;
    }
  } else {
    movers = 2;
  }

  let minMovers = movers;
  let workHours = 0;
  let travelHours = 0;

  const calculatePropertyDetails = (property) => {
    let time = 0;
    let rateMultiplier = 1;
    const floor = parseInt(property.details?.floor) || 1;

    if (property.type === "Apartment") {
      const rooms = parseInt(property.details?.rooms) || 1;
      time += 1 + rooms * (movers === 2 ? 0.8 : movers === 3 ? 0.7 : 0.5);

      if (property.details.freightElevator === "yes" && floor > 1) {
        movers = Math.max(2, movers - 1);
        rateMultiplier *= additionalFactors.freightElevatorMultiplier;
      }

      if (floor > 1 && !property.details.freightElevator) {
        time += (floor - 1) * additionalFactors.floorTimeIncrement;
      }

      time *= 0.4;
    } else if (property.type === "House") {
      const sqFt = parseInt(property.details?.squareFeet) || 0;
      const stories = parseInt(property.details?.stories) || 1;

      if (sqFt > 3000) {
        movers = 4;
        minMovers = 4;
      } else if (sqFt > 2000) {
        movers = 3;
        minMovers = 3;
      } else {
        movers = 2;
        minMovers = 2;
      }

      const extraSqFt = Math.max(
        0,
        sqFt - (movers === 4 ? 3000 : movers === 3 ? 2000 : 1000)
      );
      time += Math.ceil(extraSqFt / 20) * 0.13;

      if (stories > 1) {
        time += (stories - 1) * 0.25;
      }
    }
    return { time, rateMultiplier };
  };

  // Calculate time for pickup and drop-off locations
  const pickupData = calculatePropertyDetails(data.propertyType.pickupProperty);
  const dropOffData = calculatePropertyDetails(data.propertyType.dropOffProperty);

  // Calculate base work hours without travel
  let additionalTime = pickupData.time + dropOffData.time;
  additionalTime += additionalFactors.clutterLevel[parseInt(data.clutterLevel)] || 0;

  // Add time for heavy items and assembly/disassembly
  if (typeof data.assemblyItems === "object") {
    for (const item in data.assemblyItems) {
      additionalTime +=
        (parseInt(data.assemblyItems[item].quantity) || 0) *
        additionalFactors.assemblyItemsTime;
    }
  }
  if (typeof data.heavyItems === "object") {
    for (const item in data.heavyItems) {
      additionalTime +=
        (parseInt(data.heavyItems[item].quantity) || 0) *
        additionalFactors.heavyItemsTime;
    }
  }

  // Add packing time and apply only to work hours
  workHours = additionalTime + additionalFactors.packingTimeAddition[data.packingOption] || 0;

  // Adjust work hours if additional movers are added
  if (workHours > 8) {
    const originalMovers = movers;
    movers = Math.min(movers + 1, 5);
    minMovers = movers;
    workHours = workHours * (originalMovers / movers);
  }

  // Calculate travel time separately and apply only travel rate
  travelHours = (durationInMinutes / 60) * additionalFactors.travelTimeRate;

  // Calculate final costs separately for travel and work
  const workHourlyRate = baseRates[minMovers];
  const packingMultiplier = additionalFactors.packingOptionMultiplier[data.packingOption] || 1;
  const workCost = Math.round(workHourlyRate * workHours * packingMultiplier);
  const travelCost = Math.round(workHourlyRate * travelHours);

  // Ensure total cost meets minimum requirement
  const totalCost = Math.max(minimumCost, workCost + travelCost);

  return { totalCost, totalHours: workHours + travelHours, workHours, movers, minMovers };
}


export default function Home() {
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      addressFrom: "",
      addressTo: "",
      distance: "",
      duration: "",
      propertyType: null,
      assemblyItems: {},
      date: null,
      time: "7:00 AM",
      movers: 2,
      clutterLevel: 1,
      packingOption: "None",
      phoneNumber: "",
      heavyItems: "",
    },
  });

  const [movingCost, setMovingCost] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [movers, setMovers] = useState(2);
  const [minMovers, setMinMovers] = useState(2);
  const [isModalOpen, setModalOpen] = useState(false); // Статус модального окна

  const addressFrom = watch("addressFrom");
  const addressTo = watch("addressTo");
  const distance = watch("distance");
  const duration = watch("duration");
  const propertyType = watch("propertyType");
  const clutterLevel = watch("clutterLevel");
  const assemblyItems = watch("assemblyItems");
  const heavyItems = watch("heavyItems");
  const packingOption = watch("packingOption");

  const bedrooms = propertyType?.pickupProperty?.details?.bedrooms || 1;
  const floor = propertyType?.pickupProperty?.details?.floor || 1;

  useEffect(() => {
    const calculateAndSetCost = () => {
      try {
        const {
          totalCost,
          totalHours: hours,
          movers: calculatedMovers,
          minMovers: calculatedMinMovers,
        } = calculateMovingCost({
          addressFrom,
          addressTo,
          distance: parseFloat(distance) || 0,
          duration: parseFloat(duration) || 0,
          propertyType,
          clutterLevel,
          movers, // Убедитесь, что это добавлено
          assemblyItems,
          heavyItems,
          packingOption,
        });

        setMovingCost(totalCost);
        setTotalHours(hours);
        setMovers(calculatedMovers);

        if (calculatedMinMovers !== minMovers) {
          setMinMovers(calculatedMinMovers);
          setValue("movers", calculatedMinMovers);
        }
      } catch (error) {
        console.error("Error calculating moving cost:", error);
      }
    };

    if (distance && duration) {
      calculateAndSetCost();
    }
  }, [
    addressFrom,
    addressTo,
    distance,
    duration,
    propertyType,
    clutterLevel,
    movers, // Добавьте зависимость на количество грузчиков
    assemblyItems,
    heavyItems,
    packingOption,
    setValue,
  ]);

  const onSubmit = (data) => {
    const { totalCost } = calculateMovingCost(data);
    console.log("Form Data Submitted:", { ...data, movingCost: totalCost });
  };

  return (
    <Sheet
      sx={{
        width: { xs: "100%", sm: "448px" },
        maxHeight: '100%',
        marginX: "auto",
        background: "unset",
        position: "relative",
      }}
    >
      <Sheet
        sx={{
          marginX: "auto",
          position: "relative",
          width: "89%",
          background: "#FFD133",
          height: "24px",
          borderStartStartRadius: 24,
          borderTopRightRadius: 24,
          paddingY: 2,
          textAlign: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BoltIcon />
        Instant Quote No Email
      </Sheet>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Sheet
          sx={{
            width: { xs: "100%", sm: 416 },
            maxHeight: 800,
            position: "relative",
            marginX: "auto",
            px: { xs: 1, sm: 2 },
            pt: { sm: 2, xs: 1 },
            borderRadius: 24,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Controller
            name="addresses"
            control={control}
            render={({ field }) => (
              <AddressInput
                setValue={setValue}
                pickupAddressName="addressFrom"
                dropOffAddressName="addressTo"
                distanceName="distance"
                durationTime="duration"
                {...field}
              />
            )}
          />

          <Controller
            name="propertyType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PropertyTypeSelection onChange={onChange} value={value} />
            )}
          />

          <Sheet
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: "16px",
            }}
          >
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CalendarComponent
                  value={field.value}
                  onChange={field.onChange}
                  time="7:00 AM"
                  onTimeChange={() => {}}
                />
              )}
            />

            <Controller
              name="movers"
              control={control}
              render={({ field }) => (
                <Movers {...field} minMovers={minMovers} />
              )}
            />
          </Sheet>

          <Controller
            name="clutterLevel"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ClutterSlide onChange={onChange} value={value} max={9} />
            )}
          />

          <Controller
            name="packingOption"
            control={control}
            defaultValue="None"
            render={({ field }) => (
              <PackagingButtons value={field.value} onChange={field.onChange} />
            )}
          />

          <Sheet
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: "16px",
            }}
          >
            <HeavyItemsPicker setValue={setValue} control={control} />
            <AssemblyDisassemblyPicker setValue={setValue} />
          </Sheet>

          <Sheet
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              pb: "16px",
            }}
          >
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneNumberInput value={value} onChange={onChange} />
              )}
            />
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <PaymentMethodPicker setValue={field.onChange} />
              )}
            />
          </Sheet>

          <Sheet
            sx={{
              width: { sm: "416px", xs: "104%" },
              p: { xs: 1, sm: 2 },
              borderRadius: 24,
              background:
                "linear-gradient(90deg, rgba(255, 209, 51, 0.20) 9%, rgba(72, 134, 255, 0.20) 89%)",
              position: "relative",
              right: { xs: "8px", sm: "16px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Center all content horizontally
            }}
          >
            {movingCost && (
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "300px",
                  marginX: "auto",
                  paddingY: 2,
                  borderRadius: 8,
                  all: "unset",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  animation: "pulse 1.5s infinite", // Apply the pulse animation
                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(1)",
                      opacity: 1,
                    },
                    "50%": {
                      transform: "scale(1.05)",
                      opacity: 0.8,
                    },
                    "100%": {
                      transform: "scale(1)",
                      opacity: 1,
                    },
                  },
                }}
                onClick={() => setModalOpen(true)}
              >
                <KeyboardArrowUpIcon
                  sx={{
                    fontSize: "1.5rem",
                    color: "#615D5D",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#FF881A",
                    },
                    borderRadius: "4px",
                  }}
                />
              </Button>
            )}

            {movingCost && (
              <SummaryModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                data={{
                  totalCost: movingCost,
                  totalHours,
                  workHours: totalHours,
                  movers,
                  distance,
                  duration,
                  clutterLevel,
                  assemblyItems,
                  heavyItems,
                  packingOption,
                }}
              />
            )}

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
                  background: movingCost
                    ? "#FF881A"
                    : "rgba(255, 137, 25, 0.40)",
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
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span>Book for:</span>
                  {movingCost !== null ? (
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
                type="submit"
              >
                <Link
                  href={`sms:2062552708?&body=${encodeURIComponent(
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
      - Assembly/Disassembly: ${Object.keys(assemblyItems).length > 0 ? "Yes" : "No"}
      
      Can I get a better deal ?`
                      : "Hello, I need help moving"
                  )}`}
                  sx={{
                    textDecoration: "none",
                    color: "blue",
                    fontSize: "1.2em",
                  }}
                >
                  Get a better deal
                </Link>
              </Button>
            </Sheet>
          </Sheet>
        </Sheet>
      </form>
    </Sheet>
  );
}
