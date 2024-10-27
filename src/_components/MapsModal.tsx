// @ts-nocheck

import React, { useState, useRef } from 'react';
import { Button, Modal, Sheet, Input } from '@mui/joy';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useMediaQuery } from '@mui/material';

const defaultCenter = { lat: 47.6062, lng: -122.3321 }; // Default to Seattle, WA

interface GoogleMapModalProps {
  onLocationsSelect: (pickup: { address: string, position: { lat: number, lng: number } }, dropOff: { address: string, position: { lat: number, lng: number } }, distance: string) => void;
  onClose: () => void;
  pickupAddress: string | null;
  dropOffAddress: string | null;
}

export const GoogleMapModal: React.FC<GoogleMapModalProps> = ({
  onLocationsSelect, onClose, pickupAddress: initialPickup, dropOffAddress: initialDropOff,
}) => {
  const [pickupAddress, setPickupAddress] = useState<string | null>(initialPickup);
  const [pickupPosition, setPickupPosition] = useState<{ lat: number, lng: number } | null>(null);

  const [dropOffAddress, setDropOffAddress] = useState<string | null>(initialDropOff);
  const [dropOffPosition, setDropOffPosition] = useState<{ lat: number, lng: number } | null>(null);

  const [isPickupActive, setIsPickupActive] = useState(true); // Track which input is active

  const autocompletePickupRef = useRef<any>(null);
  const autocompleteDropOffRef = useRef<any>(null);

  const isMobile = useMediaQuery('(max-width:600px)');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAFrlvAYZVCNuAg2Ix5pmbwgiTTjCpF5k4', // Replace with your API Key
    libraries: ['places', 'geometry'],
  });

  const handleMapClick = (event: any) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      if (isPickupActive) {
        setPickupPosition({ lat, lng });
        getAddressFromCoordinates(lat, lng, 'pickup');
      } else {
        setDropOffPosition({ lat, lng });
        getAddressFromCoordinates(lat, lng, 'dropOff');
      }
    }
  };

  const geocodeAddress = (address: string, type: 'pickup' | 'dropOff') => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0].geometry.location) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        if (type === 'pickup') {
          setPickupPosition({ lat, lng });
          setPickupAddress(address);
        } else {
          setDropOffPosition({ lat, lng });
          setDropOffAddress(address);
        }
      }
    });
  };

  const getAddressFromCoordinates = (lat: number, lng: number, type: 'pickup' | 'dropOff') => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        if (type === 'pickup') {
          setPickupAddress(results[0].formatted_address);
          setIsPickupActive(false);
        } else {
          setDropOffAddress(results[0].formatted_address);
        }
      }
    });
  };

  const handlePlaceChanged = (type: 'pickup' | 'dropOff') => {
    const place = (type === 'pickup' ? autocompletePickupRef.current : autocompleteDropOffRef.current)?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      if (type === 'pickup') {
        setPickupPosition({ lat, lng });
        setPickupAddress(place.formatted_address || '');
        setIsPickupActive(false);
      } else {
        setDropOffPosition({ lat, lng });
        setDropOffAddress(place.formatted_address || '');
        handleConfirmLocations();
      }
    }
  };

  // Fetch driving distance between Pickup and Drop-Off
  const fetchDrivingDistance = async () => {
    if (!pickupPosition || !dropOffPosition) return null;

    const service = new window.google.maps.DistanceMatrixService();
    return new Promise<string | null>((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [pickupPosition],
          destinations: [dropOffPosition],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL, // Добавлено для расстояния в милях
        },
        
        (response, status) => {
          if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
            resolve(distance);
          } else {
            reject(null);
          }
        }
      );
    });
  };

  const handleConfirmLocations = async () => {
    const distance = await fetchDrivingDistance();
    const finalPickup = {
      address: pickupAddress || initialPickup || '',
      position: pickupPosition || { lat: 0, lng: 0 },
    };

    const finalDropOff = {
      address: dropOffAddress || initialDropOff || '',
      position: dropOffPosition || { lat: 0, lng: 0 },
    };

    if (finalPickup.address && finalDropOff.address) {
      onLocationsSelect(finalPickup, finalDropOff, distance || 'Unknown');
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Sheet
        sx={{
          width: { sm: "60%", xs: "100%" },
          height: { sm: "50%", xs: "100%" },
          padding: "20px",
          borderRadius: "44px",
          backgroundColor: "rgba(184, 184, 184, 0.90)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "16px",
          marginX: "auto",
        }}
      >
        {!isMobile && isLoaded && (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "24px",
            }}
            center={pickupPosition || dropOffPosition || defaultCenter}
            zoom={12}
            onClick={handleMapClick}
          >
            {pickupPosition && <Marker position={pickupPosition} />}
            {dropOffPosition && <Marker position={dropOffPosition} />}
          </GoogleMap>
        )}

        <Sheet
          sx={{
            width: { xs: "100%", sm: "40%" },
            display: "flex",
            flexDirection: "column",
            background: "white",
            padding: "16px 24px",
            borderRadius: "24px",
          }}
        >
          {isLoaded && (
            <>
              <Autocomplete
                onLoad={(autocomplete) =>
                  (autocompletePickupRef.current = autocomplete)
                }
                onPlaceChanged={() => handlePlaceChanged("pickup")}
              >
                <Input
                  placeholder="Pickup Address"
                  value={pickupAddress || ""}
                  onFocus={() => setIsPickupActive(true)}
                  onChange={(e) => {
                    const newAddress = e.target.value;
                    setPickupAddress(newAddress);
                    geocodeAddress(newAddress, "pickup");
                  }}
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    backgroundColor: isPickupActive ? "#FFEDDA" : "#fff",
                    padding: "10px 20px",
                  }}
                />
              </Autocomplete>

              <Autocomplete
                onLoad={(autocomplete) =>
                  (autocompleteDropOffRef.current = autocomplete)
                }
                onPlaceChanged={() => handlePlaceChanged("dropOff")}
              >
                <Input
                  placeholder="Drop-Off Address"
                  value={dropOffAddress || ""}
                  onFocus={() => setIsPickupActive(false)}
                  onChange={(e) => {
                    const newAddress = e.target.value;
                    setDropOffAddress(newAddress);
                    geocodeAddress(newAddress, "dropOff");
                  }}
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    backgroundColor: !isPickupActive ? "#FFEDDA" : "#fff",
                    padding: "10px 20px",
                  }}
                />
              </Autocomplete>
            </>
          )}

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
              onClick={onClose}
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
                ":hover": { backgroundColor: "#FF6700" },
                width: "77%",
              }}
              onClick={handleConfirmLocations}
              disabled={!pickupAddress || !dropOffAddress}
            >
              Confirm Locations
            </Button>
          </Sheet>
        </Sheet>
      </Sheet>
    </Modal>
  );
};
