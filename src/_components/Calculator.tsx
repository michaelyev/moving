"use client"; // Делает этот компонент клиентским

import { AddressInput } from "@/_components/AddressInput";
import { BlueButton } from '@/_components/BlueButton';
import { Booking } from '@/_components/BookingComponentCalculator';
import { Calendar } from '@/_components/Calendar';
import { ClutterSlide } from '@/_components/ClutterSlide';
import { Movers } from '@/_components/Movers';
import { PackagingButtons } from '@/_components/PackagingButtons';
import PhoneNumberInput from '@/_components/PhoneNumberInput';
import { PropertyTypeSelection } from '@/_components/PropertyTypeSelection';
import Sheet from '@mui/joy/Sheet';
import BoltIcon from '@mui/icons-material/Bolt';
import { CssVarsProvider } from "@mui/joy/styles";
import theme from "@/theme/theme";

export function Calculator () {
  return (
    <CssVarsProvider theme={theme}>
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
          <BoltIcon></BoltIcon>
          Instant Quote No Email
        </Sheet>
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
          <AddressInput />
          <PropertyTypeSelection />
          <Sheet
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pb: "16px",
            }}
          >
            <Calendar />
            <Movers />
          </Sheet>
          <ClutterSlide />
          <PackagingButtons />
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
          <Sheet
            sx={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              pb: "16px",
            }}
          >
            <PhoneNumberInput />
            <BlueButton>Dismount</BlueButton>
          </Sheet>
          <Booking />
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
}
