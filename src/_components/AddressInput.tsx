// @ts-nocheck

import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import { Box, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddIcon from "@mui/icons-material/Add";
import Sheet from "@mui/joy/Sheet";
import { GoogleMapModal } from "./MapsModal";

interface AddressInputProps {
  setValue: (name: string, value: string) => void;
  pickupAddressName: string;
  dropOffAddressName: string;
  distanceName: string; // New prop to store the distance value
}

export const AddressInput: React.FC<AddressInputProps> = ({
  setValue,
  pickupAddressName,
  dropOffAddressName,
  distanceName,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [dropOffAddress, setDropOffAddress] = useState<string | null>(null);

  const handleOpenMapModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  // Update to handle distance
  const handleLocationsSelect = (
    pickup: { address: string; position: { lat: number; lng: number } },
    dropOff: { address: string; position: { lat: number; lng: number } },
    distance: string,
    duration: string // добавляем duration
  ) => {
    console.log("Distance received in AddressInput:", distance);
    console.log("Duration received in AddressInput:", duration);
  
    setPickupAddress(pickup.address);
    setDropOffAddress(dropOff.address);
    setValue(pickupAddressName, pickup.address);
    setValue(dropOffAddressName, dropOff.address);
    setValue(distanceName, distance);
    handleCloseModal();
  };
  
  return (
    <>
      <Box
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "16px",
          "&:hover": { borderColor: "#FF8919" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Sheet
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleOpenMapModal}
              sx={{
                all: "unset",
                flexDirection: "column",
                alignItems: "flex-start",
                display: "flex",
                cursor: "pointer",
                width: "calc(100% - 29px)",
                "&:hover": { background: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "#343A40",
                  fontSize: "14px",
                  fontWeight: 600,
                  paddingBottom: "6px",
                }}
              >
                Pickup From
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
                fontWeight="light"
                color="#615D5D"
              >
                {pickupAddress || "Zip, City or State"}
              </Typography>
            </Button>
            <Button
              sx={{
                all: "unset",
                padding: "auto",
                cursor: "pointer",
                backgroundColor: "#FFF1C2",
                height: "48px",
                width: "29px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
              }}
            >
              <SwapHorizIcon />
            </Button>
          </Sheet>

          <Sheet
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleOpenMapModal}
              sx={{
                all: "unset",
                flexDirection: "column",
                alignItems: "flex-start",
                display: "flex",
                cursor: "pointer",
                width: "calc(100% - 29px)",
                "&:hover": { background: "none" },
              }}
            >
              <Typography
                sx={{
                  color: "#343A40",
                  fontSize: "14px",
                  fontWeight: 600,
                  paddingBottom: "6px",
                  whiteSpace: "none",
                }}
              >
                Drop Off To
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
                fontWeight="light"
                color="#615D5D"
              >
                {dropOffAddress || "Zip, City or State"}
              </Typography>
            </Button>
            <Button
              sx={{
                all: "unset",
                padding: "auto",
                cursor: "pointer",
                backgroundColor: "#FFF1C2",
                height: "48px",
                width: "29px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
              }}
            >
              <AddIcon />
            </Button>
          </Sheet>
        </Stack>
      </Box>
      {openModal && (
        <GoogleMapModal
          onLocationsSelect={handleLocationsSelect}
          onClose={handleCloseModal}
          pickupAddress={pickupAddress}
          dropOffAddress={dropOffAddress}
        />
      )}
    </>
  );
};