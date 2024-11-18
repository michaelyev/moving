// @ts-nocheck
import React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Typography } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';

const clutterImages = [
  '/things/1.webp', // Image for clutter level 1
  '/things/2.webp', // Image for clutter level 2
  '/things/3.webp', // Image for clutter level 3
  '/things/4.webp', // Image for clutter level 4
  '/things/5.webp'
];

// Human-readable terms for clutter levels
const clutterDescriptions = [
  'Minimal Items',    // Level 1
  'Light Items',      // Level 2
  'Moderate Items',   // Level 3
  'Many Items',       // Level 4
  'Very Many Items'   // Level 5
];

export const ClutterSlide = ({ value, onChange }) => {
  const [clutterLevel, setClutterLevel] = React.useState(value || 1);
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleSliderChange = (event, newValue) => {
    setClutterLevel(newValue);
    onChange(newValue); // Notify parent component
  };

  const handlePointerDown = () => {
    setShowTooltip(true);
  };

  const handlePointerUp = () => {
    setShowTooltip(false);
  };

  return (
    <Box sx={{ marginX: "auto", pb: "8px", width: "100%" }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        Clutter
      </Typography>

      {/* Slider with Tooltip displaying clutter image */}
      <Box sx={{ position: "relative", width: { sm: "100%", xs: '75%' }, mx: "auto", mt: 2 }}>
        <Slider
          aria-label="Clutter level"
          value={clutterLevel}
          onChange={handleSliderChange}
          step={1}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />

        {/* Tooltip-style Image Display */}
        {showTooltip && (
          <Sheet
            sx={{
              position: "absolute",
              width: { xs: "380px", sm: "400px" },
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
              {clutterDescriptions[clutterLevel - 1]}
            </Typography>

            {/* Center the image */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                src={clutterImages[clutterLevel - 1]}
                alt={`Clutter level ${clutterLevel}`}
                width={280}
                height={180}
                style={{ borderRadius: "8px" }}
              />
            </Box>
          </Sheet>
        )}
      </Box>
    </Box>
  );
};
