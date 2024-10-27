// @ts-nocheck

"use client"; // Required for working with state in Next.js app

import { AddressInput } from "@/_components/AddressInput";
import { CalendarComponent } from "@/_components/Calendar";
import { ClutterSlide } from "@/_components/ClutterSlide";
import { Movers } from "@/_components/Movers";
import { PackagingButtons } from "@/_components/PackagingButtons";
import PhoneNumberInput from "@/_components/PhoneNumberInput";
import { PropertyTypeSelection } from "@/_components/PropertyTypeSelection";
import Sheet from "@mui/joy/Sheet";
import BoltIcon from "@mui/icons-material/Bolt";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { HeavyItemsPicker } from "@/_components/HeavyItems";
import { AssemblyDisassemblyPicker } from "@/_components/AssemblyDisassembly";
import { PaymentMethodPicker } from "@/_components/PaymentMethod";
import { Button } from "@mui/joy";

function calculateMovingCost(data) {
  const baseRates = {
    2: 140,  // Hourly rate for 2 movers
    3: 190,  // Hourly rate for 3 movers
    4: 240   // Hourly rate for 4 movers
  };

  const additionalFactors = {
    floor: { multiplier: 1.2, increment: 1 },
    freightElevator: 0.9,
    clutterLevel: { 1: 0, 2: 0.5, 3: 1, 4: 1.5, 5: 2, 6: 2.5, 7: 3, 8: 3.5, 9: 4 }, // 9 positions
    heavyItems: 0.5,
    assemblyItems: 0.3,
    distanceRate: 0.5,
    packingOption: { None: 1, Basic: 1.1, Premium: 1.2 }, // Packaging multiplier
  };

  let movers = 2;
  if (data.propertyType?.pickupProperty?.type === "Apartment") {
    const rooms = data.propertyType.pickupProperty.details.rooms;
    if (rooms >= 3) movers = 3;
    if (rooms >= 4) movers = 4;
  } else if (data.propertyType?.pickupProperty?.type === "House") {
    const sqFt = parseInt(data.propertyType.pickupProperty.details.squareFeet);
    if (sqFt > 1500) movers = 3;
    if (sqFt > 2500) movers = 4;
  }

  let hourlyRate = baseRates[movers];
  let additionalTime = 0;

  if (data.propertyType?.pickupProperty.details.floor > 1 && data.propertyType.pickupProperty.details.freightElevator === "no") {
    additionalTime += (data.propertyType.pickupProperty.details.floor - 1) * additionalFactors.floor.increment;
    hourlyRate *= additionalFactors.floor.multiplier;
  } else if (data.propertyType.pickupProperty.details.freightElevator === "yes") {
    hourlyRate *= additionalFactors.freightElevator;
  }

  additionalTime += additionalFactors.clutterLevel[data.clutterLevel] || 0;
  for (const item in data.assemblyItems) {
    additionalTime += data.assemblyItems[item].quantity * additionalFactors.assemblyItems;
  }
  for (const item in data.heavyItems) {
    additionalTime += data.heavyItems[item].quantity * additionalFactors.heavyItems;
  }

  const distanceMiles = parseFloat(data.distance);
  additionalTime += distanceMiles * additionalFactors.distanceRate;

  // Apply packaging multiplier
  const packingMultiplier = additionalFactors.packingOption[data.packingOption] || 1;
  const totalHourlyRate = hourlyRate * packingMultiplier;
  const estimatedHours = 1 + additionalTime;

  return Math.round(totalHourlyRate * estimatedHours);
}

export default function Home() {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      addressFrom: "",
      addressTo: "",
      distance: "",
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

  // Watch for changes in necessary fields to trigger cost calculation
  const addressFrom = watch("addressFrom");
  const addressTo = watch("addressTo");
  const distance = watch("distance");
  const propertyType = watch("propertyType");
  const clutterLevel = watch("clutterLevel");
  const movers = watch("movers");
  const assemblyItems = watch("assemblyItems");
  const heavyItems = watch("heavyItems");
  const packingOption = watch("packingOption");

  useEffect(() => {
    if (addressFrom && addressTo && propertyType) {
      const cost = calculateMovingCost({
        addressFrom,
        addressTo,
        distance,
        propertyType,
        clutterLevel,
        movers,
        assemblyItems,
        heavyItems,
        packingOption,
      });
      setMovingCost(cost);
    }
  }, [addressFrom, addressTo, propertyType, distance, clutterLevel, movers, assemblyItems, heavyItems, packingOption]);

  return (
    <Sheet
      sx={{
        width: { xs: "100%", sm: "448px", p: 0 },
        marginX: "auto",
        background: "unset",
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

      <form>
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
              render={({ field }) => <Movers {...field} />}
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
                background: "rgba(255, 137, 25, 0.40)",
                borderRadius: "100px",
                width: "42%",
                minHeight: "40px",
                animation: movingCost ? "fadeIn 0.5s ease" : "none",
                "@keyframes fadeIn": {
                  from: { opacity: 0 },
                  to: { opacity: 1 },
                },
                "&:hover": {
                  backgroundColor: "#FF881A",
                },
              }}
              type="button"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
