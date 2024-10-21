'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Typography } from '@mui/material'
import Sheet from '@mui/joy/Sheet';

function valueText(value: number) {
  return `${value}°C`;
}


export const ClutterSlide = () => {
  return (
    <Box sx={{ marginX: "auto", pb: "8px", width: '100%',  }}>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
        Clutter
      </Typography>
      <Slider
        sx={{ marginX: "auto", width: "95%", mb: 0, display: 'flex' }}
        aria-label="Small steps"
        defaultValue={1}
        getAriaValueText={valueText}
        step={1}
        marks
        min={1}
        max={10}
        valueLabelDisplay="auto"
        /* sx={{ pb: "6px" }} */
      />

      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
}
