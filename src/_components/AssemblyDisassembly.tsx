// @ts-nocheck
import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { assemblyItemsData } from '@/constants/calculator/assemblyItemsData' // Import the array with assembly items
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const AssemblyDisassemblyPicker = ({ setValue }) => {
  const [open, setOpen] = useState(false);

  // Initialize items with quantity and price but don't show the price
  const [items, setItems] = useState(() => {
    return assemblyItemsData.reduce((acc, item) => {
      acc[item.name] = { quantity: 0, price: item.price }; // Initialize with quantity 0 and store price
      return acc;
    }, {});
  });

  // Check if any item has a quantity greater than 0
  const hasSelectedItems = () => {
    return Object.values(items).some((item) => item.quantity > 0);
  };

  const handleIncrement = (itemName) => {
    setItems((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        quantity: prev[itemName].quantity + 1, // Increment the quantity
      },
    }));
  };

  const handleDecrement = (itemName) => {
    setItems((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        quantity: prev[itemName].quantity > 0 ? prev[itemName].quantity - 1 : 0, // Decrement the quantity
      },
    }));
  };

  const handleConfirm = () => {
    setValue('assemblyItems', items); // Pass the items object (including quantity and price) back to the form
    setOpen(false); // Close the modal
  };

  return (
    <>
      {/* Blue Button to open modal */}
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
        Assembly/Disassembly
      </Button>

      {/* Modal with assembly items picker */}
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
            Pick Assembly/Disassembly Items
          </Typography>

          {assemblyItemsData.map((item) => (
            <Sheet
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "4px 0",
                background: 'unset'
              }}
            >
              <Typography>{item.name}</Typography>

              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Button
                  onClick={() => handleDecrement(item.name)}
                  sx={{
                    backgroundColor: "#FFF1C2",
                    height: "32px",
                    width: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#FF8919" },
                  }}
                >
                  <Typography fontSize="20px">-</Typography>
                </Button>

                <Typography>{items[item.name].quantity}</Typography>

                <Button
                  onClick={() => handleIncrement(item.name)}
                  sx={{
                    backgroundColor: "#FFF1C2",
                    height: "32px",
                    width: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#FF8919" },
                  }}
                >
                  <Typography fontSize="20px">+</Typography>
                </Button>
              </div>
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
              onClick={() => setOpen(false)}
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
              disabled={!hasSelectedItems()} // Disable button if no items are selected
            >
              Confirm
            </Button>
          </Sheet>
        </Sheet>
      </Modal>
    </>
  );
};
