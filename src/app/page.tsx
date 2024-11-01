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

function calculateMovingCost(data) {
  const baseRates = {
    2: 135,
    3: 175,
    4: 230,
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
  let movers = data.movers || 2;
  let minMovers = 2;

  const distance = parseFloat(data.distance) || 0;
  const durationInMinutes = data.duration || 0;

  const minHoursByMovers = {
    2: 4,
    3: 3,
    4: 2.5,
  };

  const calculatePickupDetails = (property) => {
    let time = 0;
    let rateMultiplier = 1;

    if (property.type === "Apartment") {
      const floor = parseInt(property.details?.floor) || 1;
      const rooms = parseInt(property.details?.rooms) || 1;

      time = 2 + rooms * (movers === 2 ? 1.5 : movers === 3 ? 1.2 : 1.0);

      if (rooms >= 3 || floor >= 5) {
        movers = 4;
        minMovers = 4;
      } else if (rooms === 2 || floor >= 2) {
        movers = 3;
        minMovers = 3;
      } else {
        movers = 2;
        minMovers = 2;
      }

      if (floor >= 5 && movers <= 3) {
        time += 1;
      } else if (floor >= 10 && movers <= 2) {
        time += 2;
      }

      if (floor > 1 && property.details.freightElevator === null) {
        time += (floor - 1) * additionalFactors.floor.increment;
        rateMultiplier *= additionalFactors.floor.multiplier;
      } else if (property.details.freightElevator === "yes") {
        rateMultiplier *= additionalFactors.freightElevator;
      }
    } else if (property.type === "House") {
      const sqFt = parseInt(property.details?.squareFeet) || 0;
      const stories = parseInt(property.details?.stories) || 1;

      if (sqFt > 3000) {
        movers = 4;
        minHours = 10;
        minMovers = 4;
      } else if (sqFt > 2000) {
        movers = 3;
        minHours = 8;
        minMovers = 3;
      } else if (sqFt > 1000) {
        movers = 2;
        minHours = 6;
      } else {
        movers = 2;
        minMovers = 2;
      }

      const extraSqFt = Math.max(0, sqFt - (movers === 4 ? 3000 : movers === 3 ? 2000 : 1000));
      time += Math.ceil(extraSqFt / 10) * 0.1;

      if (stories > 1) {
        time += (stories - 1) * 0.5;
      }
    }

    return { time, rateMultiplier };
  };

  const calculateDropOffDetails = (property) => {
    let time = 0;
    let rateMultiplier = 1;

    if (property.type === "Apartment") {
      const floor = parseInt(property.details?.floor) || 1;

      if (floor > 1 && property.details.freightElevator === null) {
        time += (floor - 1) * additionalFactors.floor.increment;
        rateMultiplier *= additionalFactors.floor.multiplier;
      } else if (property.details.freightElevator === "yes") {
        rateMultiplier *= additionalFactors.freightElevator;
      }
    } else if (property.type === "House") {
      rateMultiplier *= 0.9;
    }

    return { time, rateMultiplier };
  };

  const pickupData = calculatePickupDetails(data.propertyType.pickupProperty);
  const dropOffData = calculateDropOffDetails(data.propertyType.dropOffProperty);

  let additionalTime = pickupData.time + dropOffData.time;

  additionalTime += additionalFactors.clutterLevel[parseInt(data.clutterLevel)] || 0;

  if (typeof data.assemblyItems === 'object') {
    for (const item in data.assemblyItems) {
      additionalTime += (parseInt(data.assemblyItems[item].quantity) || 0) * additionalFactors.assemblyItems;
    }
  }
  if (typeof data.heavyItems === 'object') {
    for (const item in data.heavyItems) {
      additionalTime += (parseInt(data.heavyItems[item].quantity) || 0) * additionalFactors.heavyItems;
    }
  }

  let totalHours = Math.max(minHours + additionalTime + (durationInMinutes / 60), minHoursByMovers[movers]);
  if (distance <= 50) {
    totalHours += (durationInMinutes / 60) * 2;
  }

  const packingMultiplier = additionalFactors.packingOption[data.packingOption] || 1;
  const totalHourlyRate = baseRates[movers] * pickupData.rateMultiplier * dropOffData.rateMultiplier * packingMultiplier;

  const totalCost = Math.round(totalHourlyRate * totalHours);

  return { totalCost, movers, minMovers };
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
      heavyItems: '',
    },
  });

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

  const bedrooms = propertyType?.pickupProperty?.details?.bedrooms || 1;
  const floor = propertyType?.pickupProperty?.details?.floor || 1;

  useEffect(() => {
    const calculateAndSetCost = () => {
      try {
        const { totalCost, movers: calculatedMovers, minMovers: calculatedMinMovers } = calculateMovingCost({
          addressFrom,
          addressTo,
          distance: parseFloat(distance) || 0,
          duration: parseFloat(duration) || 0,
          propertyType,
          clutterLevel,
          movers,
          assemblyItems,
          heavyItems,
          packingOption,
        });

        setMovingCost(totalCost);

        if (calculatedMinMovers !== minMovers) {
          setMinMovers(calculatedMinMovers);
          setValue("movers", calculatedMinMovers); // Update movers to new minMovers
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
    bedrooms,
    floor,
    clutterLevel,
    propertyType,
    movers,
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
    <Sheet sx={{ width: { xs: "100%", sm: "448px" }, marginX: "auto", background: "unset", position: "relative" }}>
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

          <Sheet sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: "16px" }}>
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

          <Sheet sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: "16px" }}>
            <HeavyItemsPicker setValue={setValue} control={control} />
            <AssemblyDisassemblyPicker setValue={setValue} />
          </Sheet>

          <Sheet sx={{ display: "flex", alignItems: "end", justifyContent: "space-between", pb: "16px" }}>
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
                background: movingCost ? "rgba(72, 134, 255, 0.40)" : "rgba(255, 137, 25, 0.40)",
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Book for</span>
                {movingCost !== null ? (
                  <span>${movingCost}</span>
                ) : (
                  <div style={{ background: "#FFF1C2", borderRadius: "8px", height: "21px", width: "50px" }}></div>
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
              Get a better deal
            </Button>
          </Sheet>
        </Sheet>
      </form>
    </Sheet>
  );
}
