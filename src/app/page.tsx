// @ts-nocheck

"use client"; // Required for working with state in Next.js app

import { AddressInput } from "@/_components/AddressInput";
import { BlueButton } from "@/_components/BlueButton";
import { Booking } from "@/_components/BookingComponentCalculator";
import { CalendarComponent } from "@/_components/Calendar";
import { ClutterSlide } from "@/_components/ClutterSlide";
import { Movers } from "@/_components/Movers";
import { PackagingButtons } from "@/_components/PackagingButtons";
import PhoneNumberInput from "@/_components/PhoneNumberInput";
import { PropertyTypeSelection } from "@/_components/PropertyTypeSelection";
import Sheet from "@mui/joy/Sheet";
import BoltIcon from "@mui/icons-material/Bolt";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { HeavyItemsPicker } from "@/_components/HeavyItems";
import { AssemblyDisassemblyPicker } from "@/_components/AssemblyDisassembly";
import { PaymentMethodPicker } from "@/_components/PaymentMethod";
import { Button } from "@mui/joy";

export default function Home() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      addressFrom: "",
      addressTo: "",
      distance: "",
      propertyType: "",
      apartmentDetails: {},
      houseDetails: {},
      assemblyItems: {}, // Initial state for assembly items`
      date: null,
      time: "7:00 AM", // Начальное время
      movers: 2,
      clutterLevel: 1,
      packingOption: 1,
      phoneNumber: "",
    },
  });

  const [selectedTime, setSelectedTime] = useState("7:00 AM"); // Для управления временем

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Handle the form data (send to an API, etc.)
  };
  const phoneNumber = watch ('phoneNumber')
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
          {/* Address Input - Controller */}
          <Controller
            name="addresses"
            control={control}
            render={({ field }) => (
              <AddressInput
                setValue={setValue}
                pickupAddressName="addressFrom"
                dropOffAddressName="addressTo"
                distanceName="distance" // New prop for distance
                {...field}
              />
            )}
          />

          {/* Property Type Selection */}
          <Controller
            name="propertyType"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PropertyTypeSelection onChange={onChange} value={value} />
            )}
          />

          {/* Calendar (Date Picker) */}
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
                  value={field.value} // Передаем значение даты
                  onChange={field.onChange} // Передаем изменение даты
                  time={selectedTime} // Текущее время
                  onTimeChange={(e) => setSelectedTime(e.target.value)} // Изменение времени
                />
              )}
            />

            {/* Movers (Number of movers) */}
            <Controller
              name="movers"
              control={control}
              render={({ field }) => <Movers {...field} />}
            />
          </Sheet>

          {/* Clutter Slide */}
          <Controller
            name="clutterLevel"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ClutterSlide onChange={onChange} value={value} />
            )}
          />

          {/* Packaging Buttons (Type of Packaging) */}
          <Controller
            name="packingOption"
            control={control}
            defaultValue="None"
            render={({ field }) => (
              <PackagingButtons value={field.value} onChange={field.onChange} />
            )}
          />

          {/* Heavy Items / Dismount (Buttons) */}
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

          {/* Phone Number Input */}
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
              p: { xs: 1, sm: 2 }, // padding по оси Y
              borderRadius: 24, // border radius
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
                "&:hover": {
                  backgroundColor: "#FF881A",
                },
              }}
              /* disabled={!phoneNumber} */
              type="submit"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Book for</span>
                <div
                  style={{
                    background: "#FFF1C2",
                    borderRadius: "8px",
                    height: "21px",
                    width: "50px",
                  }}
                ></div>
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
                },
              }}
              type="submit"
            >
              Got a better deal ?
            </Button>
          </Sheet>
        </Sheet>
      </form>
    </Sheet>
  );
}
