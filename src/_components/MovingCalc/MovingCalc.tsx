// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import BoltIcon from "@mui/icons-material/Bolt";
import { AddressInput } from "./AddressInput";
import { CalendarComponent } from "./Calendar";
import { ClutterSlide } from "./ClutterSlide";
import { Movers } from "./Movers";
import { PackagingButtons } from "./PackagingButtons";
import PhoneNumberInput from "./PhoneNumberInput";
import { PropertyTypeSelection } from "./PropertyTypeSelection";
import { HeavyItemsPicker } from "./HeavyItems";
import { AssemblyDisassemblyPicker } from "./AssemblyDisassembly";
import { PaymentMethodPicker } from "./PaymentMethod";
import { SummaryModal } from "./SummaryModal"; // Импорт модального окна
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/joy";
import Link from "next/link";
import { Booking } from "./Booking";
import { submitData } from "@/lib/formSubmit";

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
      5: 2.5,
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
  const dropOffData = calculatePropertyDetails(
    data.propertyType.dropOffProperty
  );

  // Calculate base work hours without travel
  let additionalTime = pickupData.time + dropOffData.time;
  additionalTime +=
    additionalFactors.clutterLevel[parseInt(data.clutterLevel)] || 0;

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
  workHours =
    additionalTime +
      additionalFactors.packingTimeAddition[data.packingOption] || 0;

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
  const packingMultiplier =
    additionalFactors.packingOptionMultiplier[data.packingOption] || 1;
  const workCost = Math.round(workHourlyRate * workHours * packingMultiplier);
  const travelCost = Math.round(workHourlyRate * travelHours);

  // Ensure total cost meets minimum requirement
  const totalCost = Math.max(minimumCost, workCost + travelCost);

  return {
    totalCost,
    totalHours: workHours + travelHours,
    workHours,
    movers,
    minMovers,
  };
}

export function MovingCalc() {
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
  const enteredNumber = /^\d{10}$/.test(watch("phoneNumber")) ? watch("phoneNumber") : null;


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

  const onSubmit = async (data) => {
    try {
      console.log("Form Data Submitted:", data);
  
      // Submit data to the server
      await submitData("moving-form", data);
  
      console.log("Submission successful!");
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };
  

  useEffect(() => {
    if (enteredNumber) {
      handleSubmit(onSubmit)();
    }
  }, [enteredNumber, handleSubmit]);

  return (
    <Sheet
      sx={{
        width: { xs: "100%", sm: "448px" },
        maxHeight: "100%",
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
            marginBottom: { xs: 2 },
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
                <PhoneNumberInput
                  value={value}
                  onChange={onChange}
                  movingCost={movingCost}
                />
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

            {/* Replace this part */}
            {movingCost && !enteredNumber && (
              <Typography
                sx={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                Please Enter Your Number
              </Typography>
            )}

            {movingCost && enteredNumber && (
              <Typography
                sx={{
                  color: "green",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "8px 16px", // Adds padding
                  textAlign: "center", // Centers text
                  width: "fit-content", // Ensures it doesn't stretch unnecessarily
                  animation: "fadeIn 0.5s ease-in-out", // Smooth fade-in effect
                  "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                Estimated: ${movingCost}
              </Typography>
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

            <Booking
              movingCost={movingCost}
              enteredNumber={enteredNumber}
              addressFrom={addressFrom} // Pass the pickup address
              addressTo={addressTo} // Pass the drop-off address
              propertyType={propertyType} // Pass property type details
              distance={distance}
              duration={duration}
              totalHours={totalHours}
              movers={movers}
              clutterLevel={clutterLevel}
              packingOption={packingOption}
              heavyItems={heavyItems}
              assemblyItems={assemblyItems}
              handleSubmit={handleSubmit} // Pass handleSubmit function
              onSubmit={onSubmit} // Pass the onSubmit handler
            />
          </Sheet>
        </Sheet>
      </form>
    </Sheet>
  );
}
