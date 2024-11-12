// @ts-nocheck
import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Radio from '@mui/material/Radio';
import { Typography } from '@mui/material';
import Image from 'next/image';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const PaymentMethodPicker = ({ setValue }) => {
  const [open, setOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleConfirm = () => {
    setValue('paymentMethod', selectedMethod); // Передаем выбранный метод в родительский компонент
    setOpen(false); // Закрываем модалку
  };

  const paymentMethods = ['Cash', 'Card', 'Check', 'Zelle']; // Массив методов оплаты

  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <Button
        onClick={() => setOpen(true)}
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          width: "42%",
          borderRadius: "12px",
          backgroundColor: "#4886FF",
          gap: "10px",
          "&:hover": {
            backgroundColor: "#FF881A", // Remove the hover background
          },
        }}
      >
        <Image
          alt=""
          height={14}
          width={14}
          src="icons/interface-home-5--door-entrance-home-house-map-roof-round-window.svg"
        />
        Payment
      </Button>

      {/* Модальное окно с выбором метода оплаты */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Sheet
          sx={{
            width: { xs: "90%", sm: "400px" },
            marginX: "auto",
            marginTop: "10%",
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "18px", textAlign: "center" }}
          >
            Pick Payment Method
          </Typography>

          {paymentMethods.map((method) => (
            <Sheet
              key={method}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 0",
                background: 'unset',
              }}
            >
              <Typography>{method}</Typography>
              <Radio
                checked={selectedMethod === method}
                onChange={() => setSelectedMethod(method)}
              />
            </Sheet>
          ))}

          <Sheet
            sx={{
              display: "flex",
              marginTop: "auto",
              width: "100%",
              gap: "3%",
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              sx={{
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "red",
                color: "#fff",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#FF6700" },
                mb: 2,
                width: "20%",
              }}
            >
              <KeyboardReturnIcon />
            </Button>
            <Button
              onClick={handleConfirm}
              sx={{
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#FF8919",
                color: "#fff",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#FF6700" },
                width: "77%",
              }}
              disabled={!selectedMethod} // Отключить, если метод не выбран
            >
              Confirm
            </Button>
          </Sheet>
        </Sheet>
      </Modal>
    </>
  );
};
