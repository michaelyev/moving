import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material'
import Image from 'next/image';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

export const Movers = () => {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "42%",
        justifyContent: "space-between",
        border: "1px solid #E0E0E0",
        borderRadius: "12px",
        padding: "8px 16px",
        minHeight: '48px',
        "&:hover": {
          borderColor: "#FF8919", // Remove the hover background
        },
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
          Movers
        </Typography>
        <Typography fontWeight="light" color="#615D5D">
          2
        </Typography>
      </Button>
      <Sheet >
        <Button
          sx={{
            all: "unset",
            padding: "auto",
            cursor: "pointer",
            mb: .5,
            py: .28,
            backgroundColor: "#FFF1C2",
            height: "18px",
            width: "29px", // Чтобы сделать кнопку квадратной
            display: "flex", // Flex-контейнер
            justifyContent: "center", // Центровка по горизонтали
            alignItems: "center", // Центровка по вертикали
            borderTopLeftRadius : "12px",
            borderTopRightRadius : "12px",
            "&:hover": {
              backgroundColor: "#FF8919", // Remove the hover background
            },
          }}
        >
          <AddOutlinedIcon />
        </Button>
        <Button
          sx={{
            all: "unset",
            padding: "auto",
            cursor: "pointer",
            backgroundColor: "#FFF1C2",
            height: "18px",
            py: .28,
            width: "29px", // Чтобы сделать кнопку квадратной
            display: "flex", // Flex-контейнер
            justifyContent: "center", // Центровка по горизонтали
            alignItems: "center", // Центровка по вертикали
            borderBottomLeftRadius : "12px",
            borderBottomRightRadius : "12px",
            "&:hover": {
              backgroundColor: "#FF8919", // Remove the hover background
            },
          }}
        >
          <RemoveOutlinedIcon height={13} width={13}  />
        </Button>
      </Sheet>
    </Sheet>
  );
}
