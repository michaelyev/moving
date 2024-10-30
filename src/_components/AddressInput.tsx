import React, { useState, useEffect } from "react";
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
  const [pickupPosition, setPickupPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [dropOffAddress, setDropOffAddress] = useState<string | null>(null);
  const [dropOffPosition, setDropOffPosition] = useState<{ lat: number, lng: number } | null>(null);

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

  // Fetch distance and duration whenever addresses or positions change
  useEffect(() => {
    const fetchDistanceAndDuration = async (retry = 0) => {
      if (!pickupPosition || !dropOffPosition) return;
  
      console.log("Pickup Position:", pickupPosition);
      console.log("Drop Off Position:", dropOffPosition);
  
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickupPosition],
          destinations: [dropOffPosition],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
          console.log("Distance Matrix API Response:", response);
  
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distance = (response.rows[0].elements[0].distance.value / 1609.34).toFixed(1); // Meters to miles
            const duration = Math.round(response.rows[0].elements[0].duration.value / 60); // Seconds to minutes
            
            console.log("Calculated Distance:", distance);
            console.log("Calculated Duration:", duration);
  
            // Set the values in the form
            setValue(distanceName, distance);
            setValue(durationTime, duration);
          } else if (retry < 2) { // Retry logic if the status is not OK
            console.warn("Retrying distance matrix request...");
            fetchDistanceAndDuration(retry + 1);
          } else {
            console.error("Failed to fetch distance and duration:", status);
            if (response?.rows[0]?.elements[0]?.status) {
              console.error("Element Status:", response.rows[0].elements[0].status);
            }
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
