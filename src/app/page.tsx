"use client"; // Required for working with state in Next.js app

import { AddressInput } from "@/_components/AddressInput";
import { BlueButton } from "@/_components/BlueButton";
import { Booking } from "@/_components/BookingComponentCalculator";
import { Calendar } from "@/_components/Calendar";
import { ClutterSlide } from "@/_components/ClutterSlide";
import { Movers } from "@/_components/Movers";
import { PackagingButtons } from "@/_components/PackagingButtons";
import PhoneNumberInput from "@/_components/PhoneNumberInput";
import { PropertyTypeSelection } from "@/_components/PropertyTypeSelection";
import Sheet from "@mui/joy/Sheet";
import BoltIcon from "@mui/icons-material/Bolt";
import { useForm, Controller } from "react-hook-form";

export default function Home() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      addressFrom: "",
      addressTo: "",
      propertyType: "",
      date: null,
      movers: 1,
      clutterLevel: 1,
      packagingType: 1,
      phoneNumber: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    // Handle the form data (send to an API, etc.)
  };

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
                {...field}
              />
            )}
          />

          {/* Property Type Selection */}
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => <PropertyTypeSelection {...field} />}
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
              render={({ field }) => <Calendar {...field} />}
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
            render={({ field }) => <ClutterSlide {...field} />}
          />

          {/* Packaging Buttons (Type of Packaging) */}
          <Controller
            name="packagingType"
            control={control}
            render={({ field }) => <PackagingButtons {...field} />}
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
            <BlueButton>Heavy Items</BlueButton>
            <BlueButton>Dismount</BlueButton>
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
              render={({ field }) => <PhoneNumberInput {...field} />}
            />
            <BlueButton>Dismount</BlueButton>
          </Sheet>

          {/* Submit Button (Booking) */}
          <Booking />
        </Sheet>
      </form>
    </Sheet>
  );
}
