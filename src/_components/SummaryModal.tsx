import React from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

export function SummaryModal({ open, onClose, data }) {
  if (!data) return null;

  const { totalCost, totalHours, workHours, movers, distance, duration, clutterLevel, assemblyItems, heavyItems, packingOption } = data;

  return (
    <Modal open={open} onClose={onClose}>
      <Sheet
        sx={{
          maxWidth: 400,
          margin: "auto",
          p: 4,
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6">Order Summary</Typography>
        <Typography mt={2}><strong>Total Cost:</strong> ${totalCost}</Typography>
        <Typography mt={1}><strong>Total Hours:</strong> {totalHours.toFixed(2)} hours</Typography>
        <Typography mt={1}><strong>Work Hours:</strong> {workHours.toFixed(2)} hours</Typography>
        <Typography mt={1}><strong>Movers Required:</strong> {movers}</Typography>
        <Typography mt={1}><strong>Distance:</strong> {distance} mi</Typography>
        <Typography mt={1}><strong>Travel Time:</strong> {duration} minutes</Typography>
        <Typography mt={1}><strong>Clutter Level:</strong> {clutterLevel}</Typography>
        <Typography mt={1}><strong>Assembly Items:</strong> {Object.keys(assemblyItems).length}</Typography>
        <Typography mt={1}><strong>Heavy Items:</strong> {Object.keys(heavyItems).length}</Typography>
        <Typography mt={1}><strong>Packing Option:</strong> {packingOption}</Typography>
        <Button onClick={onClose} sx={{ mt: 3 }}>Close</Button>
      </Sheet>
    </Modal>
  );
}
