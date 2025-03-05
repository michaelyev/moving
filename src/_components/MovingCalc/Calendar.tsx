// @ts-nocheck
import { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'react-calendar/dist/Calendar.css';

export const CalendarComponent = ({ value, onChange, time, onTimeChange }) => {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [selectedTime, setSelectedTime] = useState(time || "7:00 AM"); // ✅ Fix: Store selected time locally

  // Generate available time slots
  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 7; hour <= 20; hour++) {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour <= 12 ? hour : hour - 12;
      timeOptions.push(`${formattedHour}:00 ${period}`);
      timeOptions.push(`${formattedHour}:30 ${period}`);
    }
    return timeOptions;
  };

  // ✅ Fix: Update time and pass to parent
  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime); // ✅ Store locally
    onTimeChange(newTime); // ✅ Pass to parent form
  };

  // ✅ Fix: Ensure selected date & time are logged and stored
  const handleConfirm = () => {
    console.log("Selected Date:", value);
    console.log("Selected Time:", selectedTime);
    setOpen(false);
  };

  return (
    <>
      {/* Display selected date & time */}
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
            borderColor: "#FF8919",
          },
        }}
      >
        <Button onClick={() => setOpen(true)} sx={{ all: "unset", flexDirection: "column", alignItems: "flex-start", display: "flex", cursor: "pointer" }}>
          <Typography sx={{ color: "#343A40", fontSize: "14px", fontWeight: 600, lineHeight: "14px", paddingBottom: "6px" }}>
            Move Date
          </Typography>
          <Typography fontWeight="light" color="#615D5D">
            {value ? `${value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${selectedTime}` : "Date & Time"}
          </Typography>
        </Button>

        <Button
          onClick={() => setOpen(true)}
          sx={{
            all: "unset",
            cursor: "pointer",
            backgroundColor: "#FFF1C2",
            height: "48px",
            width: "29px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "12px",
            "&:hover": { backgroundColor: "#FF8919" },
          }}
        >
          <Image height={13} width={13} alt="" src="icons/calendar.svg" />
        </Button>
      </Sheet>

      {/* Modal for selecting date & time */}
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
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            {value ? `Selected: ${value.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at ${selectedTime}` : "Select Move Date and Time"}
          </Typography>

          {/* Calendar Selection */}
          <Calendar
            value={value || today}
            onChange={(newDate) => onChange(newDate)}
            minDate={today}
            view="month"
            maxDetail="month"
            minDetail="month"
          />

          {/* Time Selection */}
          <Typography sx={{ fontWeight: 600, fontSize: "16px", marginTop: "16px" }}>
            Select Time
          </Typography>
          <Select
            value={selectedTime}
            onChange={handleTimeChange}
            fullWidth
            sx={{ borderRadius: "12px" }}
          >
            {generateTimeOptions().map((timeOption) => (
              <MenuItem key={timeOption} value={timeOption}>
                {timeOption}
              </MenuItem>
            ))}
          </Select>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirm}
            sx={{
              backgroundColor: "#FF8919",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              ":hover": { backgroundColor: "#FF6700" },
            }}
          >
            Confirm
          </Button>
        </Sheet>
      </Modal>
    </>
  );
};
