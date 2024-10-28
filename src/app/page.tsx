"use client"; // Required for working with state in Next.js app

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

function calculateMovingCost(data) {
  const baseRates = {
    2: 150,
    3: 200,
    4: 250,
  };

  const additionalFactors = {
    floor: { multiplier: 1.2, increment: 1 },
    freightElevator: 0.9,
    clutterLevel: { 1: 0, 2: 0.5, 3: 1, 4: 1.5, 5: 2, 6: 2.5, 7: 3, 8: 3.5, 9: 4 },
    heavyItems: 0.5,
    assemblyItems: 0.3,
    packingOption: { None: 1, Partial: 1.1, Full: 1.2 },
  };

  let minHours = 2;
  let movers = 2;

  if (data.propertyType?.pickupProperty?.type === "House") {
    const sqFt = parseInt(data.propertyType.pickupProperty.details?.squareFeet) || 0;

    if (sqFt > 3000) {
      movers = 4;
      minHours = 10;
    } else if (sqFt > 2000) {
      movers = 3;
      minHours = 8;
    } else if (sqFt > 1000) {
      movers = 2;
      minHours = 6;
    } else {
      movers = 2;
      minHours = 4;
    }

    const extraSqFt = Math.max(0, sqFt - (movers === 4 ? 3000 : movers === 3 ? 2000 : 1000));
    minHours += Math.ceil(extraSqFt / 10) * 0.1;
  } else if (data.propertyType?.pickupProperty?.type === "Apartment") {
    const floor = parseInt(data.propertyType.pickupProperty.details?.floor) || 1;

    if (floor >= 10) {
      movers = 3;
      minHours = 6;
    } else if (floor >= 5) {
      movers = 3;
      minHours = 5;
    } else if (floor >= 2) {
      movers = 2;
      minHours = 4;
    } else {
      movers = 2;
      minHours = 3;
    }

    if (floor > 10) {
      minHours += (floor - 10) * 0.1;
    }
  }

  let hourlyRate = baseRates[movers] || 150;
  let additionalTime = 0;

  if (
    data.propertyType?.pickupProperty?.details &&
    data.propertyType.pickupProperty.details.floor > 1 &&
    data.propertyType.pickupProperty.details.freightElevator === "no"
  ) {
    const floor = parseInt(data.propertyType.pickupProperty.details.floor) || 1;
    additionalTime += (floor - 1) * additionalFactors.floor.increment;
    hourlyRate *= additionalFactors.floor.multiplier;
  } else if (data.propertyType?.pickupProperty?.details?.freightElevator === "yes") {
    hourlyRate *= additionalFactors.freightElevator;
  }

  additionalTime += additionalFactors.clutterLevel[parseInt(data.clutterLevel)] || 0;

  for (const item in data.assemblyItems) {
    additionalTime += (parseInt(data.assemblyItems[item].quantity) || 0) * additionalFactors.assemblyItems;
  }
  for (const item in data.heavyItems) {
    additionalTime += (parseInt(data.heavyItems[item].quantity) || 0) * additionalFactors.heavyItems;
  }

  const durationHours = Math.round(parseFloat(data.duration) / 60) || 0;
  const doubleDriveTime = durationHours * 2;
  const packingMultiplier = additionalFactors.packingOption[data.packingOption] || 1;

  let totalHours = minHours + additionalTime + doubleDriveTime;
  const extraMovers = data.movers - movers;
  if (extraMovers > 0) {
    const efficiencyFactor = 0.1;
    totalHours *= Math.max(1 - extraMovers * efficiencyFactor, 0.5);
  }

  const totalHourlyRate = baseRates[data.movers] * packingMultiplier;
  const totalCost = Math.round(totalHourlyRate * totalHours);

  return { totalCost, movers: data.movers };
}


export default function Home() {
  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      addressFrom: "",
      addressTo: "",
      distance: "",
      duration: "",
      propertyType: null,
      apartmentDetails: {},
      houseDetails: {},
      assemblyItems: {},
      date: null,
      time: "7:00 AM",
      movers: 2,
      clutterLevel: 1,
      packingOption: "None",
      phoneNumber: "",
    },
  });

  const [selectedTime, setSelectedTime] = useState("7:00 AM");
  const [movingCost, setMovingCost] = useState(null);
  const [minMovers, setMinMovers] = useState(2);

  const addressFrom = watch("addressFrom");
  const addressTo = watch("addressTo");
  const distance = watch("distance");
  const duration = watch("duration");
  const propertyType = watch("propertyType");
  const clutterLevel = watch("clutterLevel");
  const movers = watch("movers");
  const assemblyItems = watch("assemblyItems");
  const heavyItems = watch("heavyItems");
  const packingOption = watch("packingOption");

  useEffect(() => {
    if (addressFrom && addressTo && propertyType) {
      const { totalCost, movers: calculatedMovers } = calculateMovingCost({
        addressFrom,
        addressTo,
        distance,
        duration,
        propertyType,
        clutterLevel,
        movers,
        assemblyItems,
        heavyItems,
        packingOption,
      });
      setMovingCost(totalCost);

      // Automatically adjust movers for large properties
      if (calculatedMovers !== movers) {
        setMinMovers(calculatedMovers);
        setValue("movers", calculatedMovers);
      }
    }
  }, [addressFrom, addressTo, propertyType, distance, duration, clutterLevel, assemblyItems, heavyItems, packingOption]);

  const onSubmit = (data) => {
    const { totalCost } = calculateMovingCost(data);
    console.log("Form Data Submitted:", { ...data, movingCost: totalCost });
  };

  return (
    <Sheet
      sx={{
        width: { xs: "100%", sm: "448px", p: 0 },
        marginX: "auto",
        background: "unset",
        position: "relative", // Make parent relative to position children absolutely within it
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
                  time={selectedTime}
                  onTimeChange={(e) => setSelectedTime(e.target.value)}
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
              justifyContent: "space-between",
              display: "flex",
              marginX: "auto",
            }}
          >
            <Button
              sx={{
                background: movingCost
                  ? "rgba(72, 134, 255, 0.40)"
                  : "rgba(255, 137, 25, 0.40)",
                borderRadius: "100px",
                width: "42%",
                minHeight: "40px",
                transition: "background-color 0.5s ease",
                animation: movingCost ? "fadeIn 0.5s ease" : "none",
                "@keyframes fadeIn": {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
                "&:hover": {
                  backgroundColor: movingCost ? "#4876FF" : "#FF881A",
                },
              }}
              type="button"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Book for</span>
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
                animation: "pulse 1.5s infinite",
                transition: "background-color 0.3s ease-in-out",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                  "100%": { transform: "scale(1)" },
                },
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
              Get a better deal
            </Button>
          </Sheet>
        </Sheet>
      </form>
    </Sheet>
  );
}
