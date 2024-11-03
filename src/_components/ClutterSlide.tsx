// @ts-nocheck

import React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Typography } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';

const clutterImages = [
  '/images/clutter1.png', // Image for clutter level 1
  '/images/clutter2.png', // Image for clutter level 2
  '/images/clutter3.png', // Image for clutter level 3
  '/images/clutter4.png', // Image for clutter level 4
  '/images/clutter5.png', // Image for clutter level 5
  '/images/clutter6.png', // Image for clutter level 6
  '/images/clutter7.png', // Image for clutter level 7
  '/images/clutter8.png', // Image for clutter level 8
  '/images/clutter9.png', // Image for clutter level 9
];

export const ClutterSlide = ({ value, onChange }) => {
  const [clutterLevel, setClutterLevel] = React.useState(value || 1);
  const [showTooltip, setShowTooltip] = React.useState(false);

  // Обновление значения при изменении слайдера
  const handleSliderChange = (event, newValue) => {
    setClutterLevel(newValue);
    onChange(newValue); // Обновление значения в родительском компоненте
  };

  // Открытие тултипа при нажатии и удержании мыши
  const handlePointerDown = () => {
    setShowTooltip(true);
  };

  // Закрытие тултипа при отпускании мыши
  const handlePointerUp = () => {
    setShowTooltip(false);
  };

  return (
    <Box sx={{ marginX: "auto", pb: "8px", width: "100%" }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        Clutter
      </Typography>

      {/* Slider with Tooltip displaying clutter image */}
      <Box sx={{ position: "relative", width:{ sm: "100%", xs: '75%'}, mx: "auto", mt: 2 }}>
        <Slider
          sx={{  }}
          aria-label="Clutter level"
          value={clutterLevel}
          onChange={handleSliderChange}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
          onPointerDown={handlePointerDown} // Обработка нажатия на обертке
          onPointerUp={handlePointerUp} // Обработка отпускания на обертке
        />

        {/* Tooltip-style Image Display */}
        {showTooltip && (
          <Sheet
            sx={{
              position: "absolute",
              width: { xs: "90%", sm: "400px" },
              top: "-250px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "18px", mb: 1 }}>
              Clutter Level: {clutterLevel}
            </Typography>

            {/* Display the image corresponding to the clutter level */}
            <Image
              src={clutterImages[clutterLevel - 1]}
              alt={`Clutter level ${clutterLevel}`}
              width={280}
              height={180}
              style={{ borderRadius: "8px" }}
            />
          </Sheet>
        )}
      </Box>

      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        <Typography fontWeight="light" color="#615D5D">
          Minimal
        </Typography>
        <Typography fontWeight="light" color="#615D5D">
          Heavy
        </Typography>
      </Sheet>
    </Box>
  );
};
