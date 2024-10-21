import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet'
import Image from 'next/image';
import React from 'react'

export const PropertyTypeSelection = () => {
  return (
    <Sheet
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: "16px"
      }}
    >
      <Button
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          width: "42%",
          borderRadius: "12px",
          backgroundColor: "#4886FF",
          gap: '10px',
          "&:hover": {
            backgroundColor: "#FF881A", // Remove the hover background
          }
        }}
      >
        <Image
          alt=""
          height={14}
          width={14}
          src="icons/interface-login-key--entry-key-lock-login-pass-unlock.svg"
        />
        Apartment
      </Button>
      <Button
        sx={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          width: "42%",
          borderRadius: "12px",
          backgroundColor: "#4886FF",
          gap: '10px',
          "&:hover": {
            backgroundColor: "#FF881A", // Remove the hover background
          }
        }}
      >
        <Image
          alt=""
          height={14}
          width={14}
          src="icons/interface-home-5--door-entrance-home-house-map-roof-round-window.svg"
        />
        House
      </Button>
    </Sheet>
  );
}
