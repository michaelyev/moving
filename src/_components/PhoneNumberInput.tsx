// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

const PhoneNumberInput = ({ value, onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [isComplete, setIsComplete] = useState(false);

  // Регулярное выражение для проверки формата номера телефона
  const phoneRegex = /^\+1 \(\d{3}\) \d{3}-\d{4}$/;

  // Проверка и обновление состояния при вводе
  const handleInputChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input);
    onChange(input); // Отправка наверх

    // Проверка на корректность и полноту ввода
    setIsComplete(phoneRegex.test(input));
  };

  // Автоматическая отправка, когда номер полностью введен
  useEffect(() => {
    if (phoneRegex.test(phoneNumber)) {
      onChange(phoneNumber);
    }
  }, [phoneNumber, onChange]);

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "55%",
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: phoneNumber && !isComplete ? "green" : "#E0E0E0", // Красный бордер при ошибке
        borderRadius: "12px",
        padding: "8px 16px",
        "&:hover": {
          borderColor: "#FF8919",
        },
        maxHeight: '66px'
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', pb: 0 }}>Phone number</Typography>
        <TextField
          placeholder="+1 (___) ___-____"
          variant="standard"
          value={phoneNumber}
          onChange={handleInputChange}
          error={phoneNumber && !isComplete} // Ошибка, если формат неверен и поле не пустое
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberInput;
