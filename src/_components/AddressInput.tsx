import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import Sheet from '@mui/joy/Sheet';
import { GoogleMapModal } from './MapsModal';

interface AddressInputProps {
  setValue: (name: string, value: string) => void;
  pickupAddressName: string;
  dropOffAddressName: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({ setValue, pickupAddressName, dropOffAddressName }) => {
  const [openModal, setOpenModal] = useState(false);
  const [addressType, setAddressType] = useState<'pickup' | 'dropOff'>('pickup'); // Store which address type is active
  const [pickupAddress, setPickupAddress] = useState<string | null>(null);
  const [dropOffAddress, setDropOffAddress] = useState<string | null>(null);

  const handleOpenMapModal = (type: 'pickup' | 'dropOff') => {
    setAddressType(type); // Set the type (pickup/drop-off)
    setOpenModal(true); // Opens the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Closes the modal
  };

  const handleLocationsSelect = (location: { address: string, position: { lat: number, lng: number } }) => {
    if (addressType === 'pickup') {
      setPickupAddress(location.address); // Update pickup address
      setValue(pickupAddressName, location.address); // Update form state for pickup
    } else {
      setDropOffAddress(location.address); // Update drop-off address
      setValue(dropOffAddressName, location.address); // Update form state for drop-off
    }
    handleCloseModal(); // Close the modal after selection
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
          mb: '16px',
          "&:hover": {
            borderColor: "#FF8919",
          }
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          {/* Pickup From Button */}
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
              onClick={() => handleOpenMapModal('pickup')}  // Opens the modal for "Pickup From"
              sx={{
                all: "unset",
                flexDirection: "column",
                alignItems: "flex-start",
                display: "flex",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "unset",
                }
              }}
            >
              <Typography
                sx={{
                  color: "#343A40",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "14px",
                  paddingBottom: "6px",
                }}
              >
                Pickup From
              </Typography>
              <Typography fontWeight="light" color="#615D5D">
                {pickupAddress || 'Zip, City or State'}
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
                "&:hover": {
                  backgroundColor: "#FF8919",
                },
              }}
            >
              <SwapHorizIcon />
            </Button>
          </Sheet>

          {/* Drop Off To Button */}
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
              onClick={() => handleOpenMapModal('dropOff')}  // Opens the modal for "Drop Off To"
              sx={{
                all: "unset",
                flexDirection: "column",
                alignItems: "flex-start",
                display: "flex",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "unset",
                }
              }}
            >
              <Typography
                sx={{
                  color: "#343A40",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "14px",
                  paddingBottom: "6px",
                }}
              >
                Drop Off To
              </Typography>
              <Typography fontWeight="light" color="#615D5D">
                {dropOffAddress || 'Zip, City or State'}
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
                "&:hover": {
                  backgroundColor: "#FF8919",
                },
              }}
            >
              <AddIcon />
            </Button>
          </Sheet>
        </Stack>
      </Box>

      {openModal && (
        <GoogleMapModal
          activeAddressType={addressType} // Pass active address type (pickup or drop-off)
          onLocationsSelect={handleLocationsSelect}
          onClose={handleCloseModal} // Close the modal after selection
          dropOffAddress = {dropOffAddress}
          pickupAddress = {pickupAddress}
        />
      )}
    </>
  );
};
