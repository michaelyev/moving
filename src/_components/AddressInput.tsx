/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import { Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';
import Sheet from '@mui/joy/Sheet';
import { GoogleMapModal } from './MapsModal'; // Assuming the Maps modal is exported from 'GoogleMapModal'

export const AddressInput: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenMapModal = () => {
    setOpenModal(true); // Opens the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Closes the modal
  };

  const handleLocationsSelect = (locations: any) => {
    console.log('Selected locations:', locations);
    handleCloseModal(); // Closes modal after locations are selected
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
          {/* Pickup From */}
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
              onClick={() => handleOpenMapModal()}  // Opens the modal for "Pickup From"
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
                Zip, City or State
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

          {/* Drop Off To */}
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
              onClick={() => handleOpenMapModal()}  // Opens the modal for "Drop Off To"
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
                Zip, City or State
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
          onLocationsSelect={handleLocationsSelect}
          onClose={handleCloseModal} // Close the modal after selection
        />
      )}
    </>
  );
};
