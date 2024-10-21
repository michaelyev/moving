// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef } from 'react';
import { Button, Modal, Sheet, Input } from '@mui/joy';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery from Material-UI

const defaultCenter = { lat: 47.6062, lng: -122.3321 }; // Default to Seattle, WA

interface GoogleMapModalProps {
  onLocationsSelect: (locations: any) => void;
  onClose: () => void;
}

export const GoogleMapModal: React.FC<GoogleMapModalProps> = ({ onLocationsSelect, onClose }) => {
  const [startAddress, setStartAddress] = useState<string | null>(null);
  const [endAddress, setEndAddress] = useState<string | null>(null);
  const [startPosition, setStartPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [endPosition, setEndPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [activeInput, setActiveInput] = useState('start'); // Track active input

  const isMobile = useMediaQuery('(max-width:600px)'); // Check if the screen width is 600px or less (mobile)
  
  const autocompleteStartRef = useRef(null);
  const autocompleteEndRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAFrlvAYZVCNuAg2Ix5pmbwgiTTjCpF5k4', // Replace with your API Key
    libraries: ['places'],
  });

  // Handle map click to assign a position to the active input
  const handleMapClick = (event: any) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      if (activeInput === 'start') {
        setStartPosition({ lat, lng });
        getAddressFromCoordinates(lat, lng, setStartAddress);
        setActiveInput('end');
      } else if (activeInput === 'end') {
        setEndPosition({ lat, lng });
        getAddressFromCoordinates(lat, lng, setEndAddress);
      }
    }
  };

  // Convert lat/lng to address using Geocoder
  const getAddressFromCoordinates = (lat: number, lng: number, setAddress: (address: string) => void) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  // Function to handle place selection from Autocomplete
  const handlePlaceChanged = (setAddress: (address: string) => void, setPosition: (position: { lat: number, lng: number }) => void, autocompleteRef: any) => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setPosition({ lat, lng });
      setAddress(place.formatted_address || '');
    }
  };

  // Handle confirmation of the selected addresses and close the modal
  const handleConfirmLocations = () => {
    if (startAddress && startPosition && endAddress && endPosition) {
      onLocationsSelect({
        start: { address: startAddress, position: startPosition },
        end: { address: endAddress, position: endPosition },
      });
      onClose(); // Close the modal after confirming both locations
    }
  };

  // Handle manual input for geocoding typed addresses
  const handleAddressInput = (event: any, setAddress: (address: string) => void, setPosition: (position: { lat: number, lng: number }) => void) => {
    const address = event.target.value;
    setAddress(address);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const position = results[0].geometry.location;
        setPosition({ lat: position.lat(), lng: position.lng() });
      }
    });
  };

  return (
    <Modal open onClose={onClose}>
      <Sheet
        sx={{
          width: { sm: "60%", xs: "100%" }, // Responsive width
          height: "50%",
          padding: "20px",
          borderRadius: "44px",
          backgroundColor: "rgba(184, 184, 184, 0.90)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Adjust flex direction based on screen size
          gap: "16px",
          marginX: "auto",
        }}
      >
        {/* Map Section - Only visible on larger screens */}
        {!isMobile && (
          <Sheet
            sx={{
              width: { xs: "100%", sm: "60%" }, // Adjust the width for mobile and desktop
              height: "100%",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={startPosition || defaultCenter}
                zoom={12}
                onClick={handleMapClick}
              >
                {startPosition && <Marker position={startPosition} />}
                {endPosition && <Marker position={endPosition} />}
              </GoogleMap>
            )}
          </Sheet>
        )}

        {/* Form Section with Mobile Map */}
        <Sheet
          sx={{
            width: { xs: "100%", sm: "40%" }, // Make form section full width on mobile
            display: "flex",
            height: "100%",
            flexDirection: "column",
            background: "white",
            padding: "16px 24px",
            borderRadius: "24px",
          }}
        >
          {/* Mobile-Only Map inside form */}
          {isMobile && isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%", borderRadius: '24px' }} // Mobile map
              center={startPosition || defaultCenter}
              zoom={12}
              onClick={handleMapClick}
            >
              {/* Show two markers when both positions are available */}
              {startPosition && <Marker position={startPosition} />}
              {endPosition && <Marker position={endPosition} />}
            </GoogleMap>
          )}

          {/* Pickup Address Input with Autocomplete */}
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteStartRef.current = autocomplete)
              }
              onPlaceChanged={() =>
                handlePlaceChanged(
                  setStartAddress,
                  setStartPosition,
                  autocompleteStartRef
                )
              }
            >
              <Input
                placeholder="Pickup From"
                value={startAddress || ""}
                onClick={() => setActiveInput("start")} // Set active input when clicked
                onChange={(e) =>
                  handleAddressInput(e, setStartAddress, setStartPosition)
                }
                sx={{
                  mb: 2,
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "10px 20px",
                  mt: 2
                }}
              />
            </Autocomplete>
          )}

          {/* Drop Off Address Input with Autocomplete */}
          {isLoaded && (
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteEndRef.current = autocomplete)
              }
              onPlaceChanged={() =>
                handlePlaceChanged(
                  setEndAddress,
                  setEndPosition,
                  autocompleteEndRef
                )
              }
            >
              <Input
                placeholder="Drop Off To"
                value={endAddress || ""}
                onClick={() => setActiveInput("end")} // Set active input when clicked
                onChange={(e) =>
                  handleAddressInput(e, setEndAddress, setEndPosition)
                }
                sx={{
                  mb: 2,
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: "10px 20px",
                }}
              />
            </Autocomplete>
          )}

          {/* Confirm Button */}
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
                backgroundColor: "#FF8919",
                color: "#fff",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#FF6700",
                },
                mb: 2,
              }}
              onClick={onClose} // Close the modal
            >
              <KeyboardReturnIcon />
            </Button>
            <Button
              sx={{
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#FF8919",
                color: "#fff",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#FF6700",
                },
                width: "90%",
              }}
              onClick={handleConfirmLocations}
              disabled={!startAddress || !endAddress} // Disable button until both addresses are selected
            >
              Confirm
            </Button>
          </Sheet>
        </Sheet>
      </Sheet>
    </Modal>
  );
};
