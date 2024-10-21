import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const PhoneNumberInput = () => {
  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "55%",
        justifyContent: "space-between",
        border: "1px solid #E0E0E0",
        borderRadius: "12px",
        padding: "8px 16px",
        "&:hover": {
          borderColor: "#FF8919", // Remove the hover background
        },
        maxHeight: '66px'
      }}
    >
      {/* Phone Number Label and Input */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pb: 0 }}>Phone number</Typography>
        <TextField
          placeholder="+1 (___) ___-____"
          variant="standard"
          InputProps={{
            disableUnderline: true, // Remove underline to match the flat design
            
          }}
          
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberInput;
