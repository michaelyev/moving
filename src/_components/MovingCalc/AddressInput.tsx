import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import { Box, Typography } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Sheet from "@mui/joy/Sheet";
import { GoogleMapModal } from "./MapsModal";

interface AddressInputProps {
  setValue: (name: string, value: string) => void;
  pickupAddressName: string;
  dropOffAddressName: string;
  distanceName: string;
  durationTime: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  setValue,
  pickupAddressName,
  dropOffAddressName,
  distanceName,
  durationTime,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [pickupPosition, setPickupPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [dropOffAddress, setDropOffAddress] = useState<string | null>(null);
  const [dropOffPosition, setDropOffPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleOpenMapModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLocationsSelect = (
    pickup: { address: string; position: { lat: number; lng: number } },
    dropOff: { address: string; position: { lat: number; lng: number } },
    distance: string,
    duration: string
  ) => {
    setPickupAddress(pickup.address);
    setPickupPosition(pickup.position);
    setDropOffAddress(dropOff.address);
    setDropOffPosition(dropOff.position);

    setValue(pickupAddressName, pickup.address);
    setValue(dropOffAddressName, dropOff.address);
    setValue(distanceName, distance);
    setValue(durationTime, duration);
    handleCloseModal();
  };

  useEffect(() => {
    const fetchDistanceAndDuration = async (retry = 0) => {
      if (!pickupPosition || !dropOffPosition) return;

      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickupPosition],
          destinations: [dropOffPosition],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distance = (
              response.rows[0].elements[0].distance.value / 1609.34
            ).toFixed(1);
            const duration = Math.round(
              response.rows[0].elements[0].duration.value / 60
            );
            setValue(distanceName, distance);
            setValue(durationTime, duration);
          } else if (retry < 2) {
            fetchDistanceAndDuration(retry + 1);
          } else {
            setValue(distanceName, "Unknown");
            setValue(durationTime, "Unknown");
          }
        }
      );
    };

    if (pickupPosition && dropOffPosition) {
      fetchDistanceAndDuration();
    }
  }, [pickupPosition, dropOffPosition, setValue, distanceName, durationTime]);

  return (
    <>
      <Box
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "8px ",
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
          justifyContent="space-evenly" // Ensures even spacing
          spacing={2}
          sx={{ width: "100%" }}
        >
          {/* Pickup Section */}
          <Sheet
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "33%", // Take 1/3 of the available space
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
                width: "100%",
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
          </Sheet>

          {/* Central Button */}
          <Button
            sx={{
              all: "unset",
              padding: "auto",
              cursor: "pointer",
              backgroundColor: "#FFF1C2",
              height: "48px",
              width: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
            }}
          >
            <SwapHorizIcon />
          </Button>

          {/* Drop Off Section */}
          <Sheet
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "33%", // Take 1/3 of the available space
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
                width: "100%",
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
