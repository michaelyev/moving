import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material'
import Image from 'next/image';



export const Calendar = () => {
  return (
    <Sheet
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
        }
      }}
    >
      <Button
        sx={{
          all: "unset", // Resets all default styles
          flexDirection: "column",
          alignItems: "flex-start",
          display: "flex",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "unset", // Remove the hover background
          },
        }}
      >
        <Typography
          sx={{
            color: "#343A40",

            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "14px", // Adjust as necessary
            paddingBottom: "6px",
          }}
        >
          Move Date
        </Typography>
        <Typography fontWeight="light" color="#615D5D">
          Select Date & Time
        </Typography>
      </Button>

      <Button
        sx={{
          all: "unset",
          padding: "auto",
          cursor: "pointer",
          backgroundColor: "#FFF1C2",
          height: "48px",
          width: "29px", // Чтобы сделать кнопку квадратной
          display: "flex", // Flex-контейнер
          justifyContent: "center", // Центровка по горизонтали
          alignItems: "center", // Центровка по вертикали
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#FF8919", // Remove the hover background
          },
        }}
      >
        <Image height={13} width={13} alt="" src="icons/calendar.svg" />
      </Button>
    </Sheet>
  );
}


