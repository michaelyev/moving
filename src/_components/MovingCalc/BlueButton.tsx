// @ts-nocheck

import Button from '@mui/joy/Button'
import Image from 'next/image'

export const BlueButton = ({children}) => {
  return (
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
        {children}
      </Button>
  )
}
