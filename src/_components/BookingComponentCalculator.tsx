import { Button, Sheet } from "@mui/joy";


export const Booking = () => {
  
    return (
      <Sheet
        sx={{
          width: { sm: '416px', xs: '104%' },
          p: { xs: 1, sm: 2 }, // padding по оси Y
          borderRadius: 24, // border radius
          background:
            "linear-gradient(90deg, rgba(255, 209, 51, 0.20) 9%, rgba(72, 134, 255, 0.20) 89%)",
          position: "relative",
          right: { xs: '8px', sm: '16px' },
          justifyContent: "space-between",
          display: "flex",
          marginX: "auto"
        }}
      >
        <Button
          sx={{
            background: "rgba(255, 137, 25, 0.40)",
            borderRadius: "100px",
            width: "42%",
            minHeight: "40px",
            "&:hover": {
              backgroundColor: "#FF881A", // Remove the hover background
            },
          }}
        >
          Book for
        </Button>
        <Button
          sx={{
            background: "rgba(255, 137, 25, 0.40)",
            borderRadius: "100px",
            width: "42%",
            minHeight: "40px",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#FF881A",
            },
          }}
        >
          Got a better deal ?
        </Button>
      </Sheet>
    );
  };
  