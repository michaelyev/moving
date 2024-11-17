// @ts-nocheck

"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Sheet, Typography, Input, FormLabel, FormHelperText, Button, Box } from "@mui/joy";
import { submitData } from "@/lib/formSubmit";

export const BookButton = ({ variant = "regular" }) => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted: ", data);
      // Submit data to the server
      await submitData("moving-form", data);
  
      // Close the form
      setShowForm(false);
  
      // Show the success popup
      setShowSuccessPopup(true);
  
      // Hide the success message after 3 seconds
      setTimeout(() => setShowSuccessPopup(false), 3000);
  
      // Reset the form
      reset();
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };
  

  return (
    <>
      {/* Popup Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { xs: "90%", sm: "400px" },
              padding: 3,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              zIndex: 1010,
            }}
          >
            <Typography level="h4" component="h1" sx={{ marginBottom: 2, textAlign: "center" }}>
              Book Your Service
            </Typography>

            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <div>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Enter your name" />
                  {errors.name && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.name.message}
                    </FormHelperText>
                  )}
                </div>
              )}
            />

            {/* Phone Number Field */}
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,}$/,
                  message: "Enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <div>
                  <FormLabel>Phone Number</FormLabel>
                  <Input {...field} placeholder="Enter your phone number" />
                  {errors.phoneNumber && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.phoneNumber.message}
                    </FormHelperText>
                  )}
                </div>
              )}
            />

            {/* Message Field */}
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <div>
                  <FormLabel>Message</FormLabel>
                  <Input {...field} placeholder="Enter your message" multiline minRows={3} />
                  {errors.message && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.message.message}
                    </FormHelperText>
                  )}
                </div>
              )}
            />

            <Button
              type="submit"
              sx={{
                px: 3,
                py: 1,
                backgroundColor: "var(--primary-main)",
                color: "#fff",
                borderRadius: 8,
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  backgroundColor: "var(--primary-main)",
                  transform: "scale(1.05)",
                },
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              sx={{
                mt: 2,
                px: 3,
                py: 1,
                backgroundColor: "gray",
                color: "#fff",
                borderRadius: 8,
                transition: "background-color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  backgroundColor: "darkgray",
                  transform: "scale(1.05)",
                },
              }}
            >
              Cancel
            </Button>
          </Sheet>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 3,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 2000,
            textAlign: "center",
          }}
        >
          <Typography level="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Thank you!
          </Typography>
          <Typography level="body1">We&apos;ll be in touch shortly.</Typography>
          </Box>
      )}

      {/* Book Now Button */}
      <Button
        sx={{
          px: 3,
          py: 1,
          backgroundColor: "var(--primary-main)",
          color: "#fff",
          borderRadius: 8,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: "var(--primary-main)",
            transform: "scale(1.05)",
          },
        }}
        onClick={() => {
          setShowForm(true);
          setShowSuccessPopup(false); // Reset success popup state
        }}
      >
        Book Now
      </Button>
    </>
  );
};
