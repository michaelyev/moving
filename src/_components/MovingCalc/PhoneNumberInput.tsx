// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const PhoneNumberInput = ({ value, onChange, movingCost }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [isComplete, setIsComplete] = useState(false);

  // Regular expression for validating 10-digit phone number (e.g., 2222222222)
  const phoneRegex = /^\d{10}$/;

  // Handle input changes
  const handleInputChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhoneNumber(input);
    setIsComplete(phoneRegex.test(input)); // Update validity status
    onChange(input); // Notify parent of the change
  };

  // Automatically notify parent when the number is valid
  useEffect(() => {
    if (phoneRegex.test(phoneNumber)) {
      onChange(phoneNumber);
    }
  }, [phoneNumber, onChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: isComplete
          ? '#4CAF50' // Green border when valid
          : movingCost && phoneNumber.length === 0
          ? '#FF0000' // Red border when movingCost exists and phone number is empty
          : phoneNumber.length > 0 && !isComplete
          ? '#FF0000' // Red border when input started but invalid
          : '#E0E0E0', // Default border
        borderRadius: '12px',
        padding: '8px 16px',
        '&:hover': {
          borderColor: '#FF8919', // Orange on hover
        },
        maxHeight: '66px', // Keep original height
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pb: 0 }}>
          Phone number
        </Typography>
        <TextField
          placeholder="206XXXXXXX" // Updated placeholder
          variant="standard"
          value={phoneNumber}
          onChange={handleInputChange}
          error={!isComplete && phoneNumber.length > 0} // Show error only when invalid and input started
          InputProps={{
            disableUnderline: true, // Match original design
          }}
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberInput;
