// @ts-nocheck

import { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography, Checkbox } from '@mui/material';
import Image from 'next/image';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export const PropertyTypeSelection = ({ onChange, value }) => {
  const [step, setStep] = useState('pickup'); // "pickup" or "drop-off"
  const [openChoiceModal, setOpenChoiceModal] = useState(false);
  const [openApartment, setOpenApartment] = useState(false);
  const [openHouse, setOpenHouse] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [apartmentDetails, setApartmentDetails] = useState({
    rooms: 0,
    floor: 1,
    freightElevator: null,
  });

  const [houseDetails, setHouseDetails] = useState({
    squareFeet: '',
    stories: 1,
  });

  const resetSelection = () => {
    setApartmentDetails({ rooms: 0, floor: 1, freightElevator: null });
    setHouseDetails({ squareFeet: '', stories: 1 });
    setOpenApartment(false);
    setOpenHouse(false);
  };

  const handleTypeSelect = (type) => {
    if (type === 'Apartment') {
      setOpenApartment(true);
    } else {
      setOpenHouse(true);
    }
  };

  const handleConfirmDetails = () => {
    const data = openApartment
      ? { type: 'Apartment', details: apartmentDetails }
      : { type: 'House', details: houseDetails };

    if (step === 'pickup') {
      onChange({ pickupProperty: data, dropOffProperty: value?.dropOffProperty });
      setStep('drop-off');
      setOpenChoiceModal(true);
    } else {
      onChange({ pickupProperty: value?.pickupProperty, dropOffProperty: data });
      setOpenChoiceModal(false);
    }
    resetSelection();
  };

  const isApartmentConfirmDisabled = !apartmentDetails.rooms && !apartmentDetails.floor && !apartmentDetails.freightElevator;
  const isHouseConfirmDisabled = !houseDetails.squareFeet && !houseDetails.stories;

  const startEditSelection = () => {
    setEditMode(true);
    setStep('pickup');
    onChange({ pickupProperty: null, dropOffProperty: null });
  };

  const ChoiceModal = () => (
    <Modal open={openChoiceModal} onClose={() => setOpenChoiceModal(false)}>
      <Sheet sx={modalStyles}>
        <Typography sx={{ fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>
          Select Drop-off Property
        </Typography>

        <Sheet sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={() => handleTypeSelect('Apartment')} sx={selectionButtonStyle}>
            <Image
              alt=""
              height={14}
              width={14}
              src="icons/interface-login-key--entry-key-lock-login-pass-unlock.svg"
            />
            Apartment
          </Button>

          <Button onClick={() => handleTypeSelect('House')} sx={selectionButtonStyle}>
            <Image
              alt=""
              height={14}
              width={14}
              src="icons/interface-home-5--door-entrance-home-house-map-roof-round-window.svg"
            />
            House
          </Button>
        </Sheet>
      </Sheet>
    </Modal>
  );

  const ApartmentModal = () => (
    <Modal open={openApartment} onClose={() => setOpenApartment(false)}>
      <Sheet sx={modalStyles}>
        <Typography sx={{ fontWeight: 600, fontSize: "18px", textAlign: "center" }}>Apartment Details</Typography>
        <Sheet sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography>Bedrooms</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button onClick={() => setApartmentDetails(prev => ({ ...prev, rooms: Math.max(0, prev.rooms - 1) }))}>
                <RemoveOutlinedIcon />
              </Button>
              <Typography>{apartmentDetails.rooms}</Typography>
              <Button onClick={() => setApartmentDetails(prev => ({ ...prev, rooms: prev.rooms + 1 }))}>
                <AddOutlinedIcon />
              </Button>
            </div>
          </div>
          <div>
            <Typography>Floor</Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button onClick={() => setApartmentDetails(prev => ({ ...prev, floor: Math.max(1, prev.floor - 1) }))}>
                <RemoveOutlinedIcon />
              </Button>
              <Typography>{apartmentDetails.floor}</Typography>
              <Button onClick={() => setApartmentDetails(prev => ({ ...prev, floor: prev.floor + 1 }))}>
                <AddOutlinedIcon />
              </Button>
            </div>
          </div>
        </Sheet>

        {apartmentDetails.floor > 1 && (
          <>
            <Typography>Elevator</Typography>
            <Sheet sx={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'unset' }}>
              <Checkbox
                checked={apartmentDetails.freightElevator === 'yes'}
                onChange={() =>
                  setApartmentDetails(prev => ({
                    ...prev,
                    freightElevator: prev.freightElevator === 'yes' ? null : 'yes'
                  }))
                }
              />
              <Typography>Yes</Typography>
            </Sheet>
          </>
        )}

        <Sheet sx={{ display: 'flex', gap: '3%', marginTop: 'auto', width: '100%' }}>
          <Button onClick={() => setOpenApartment(false)} sx={cancelButtonStyle}>
            <KeyboardReturnIcon />
          </Button>
          <Button onClick={handleConfirmDetails} sx={confirmButtonStyle} disabled={isApartmentConfirmDisabled}>
            Confirm
          </Button>
        </Sheet>
      </Sheet>
    </Modal>
  );

  const HouseModal = () => (
    <Modal open={openHouse} onClose={() => setOpenHouse(false)}>
      <Sheet sx={modalStyles}>
        <Typography sx={{ fontWeight: 600, fontSize: "18px", textAlign: "center" }}>House Details</Typography>
        <Sheet>
          <Typography>How Many Square Feet</Typography>
          <input
            type="text"
            value={houseDetails.squareFeet}
            onChange={(e) => setHouseDetails(prev => ({ ...prev, squareFeet: e.target.value }))}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #E0E0E0' }}
          />
        </Sheet>

        <Typography>Number of Stories</Typography>
        <Sheet sx={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'unset' }}>
          <Button onClick={() => setHouseDetails(prev => ({ ...prev, stories: Math.max(0, prev.stories - 1) }))}>
            <RemoveOutlinedIcon />
          </Button>
          <Typography>{houseDetails.stories}</Typography>
          <Button onClick={() => setHouseDetails(prev => ({ ...prev, stories: houseDetails.stories + 1 }))}>
            <AddOutlinedIcon />
          </Button>
        </Sheet>

        <Sheet sx={{ display: 'flex', gap: '3%', marginTop: 'auto', width: '100%' }}>
          <Button onClick={() => setOpenHouse(false)} sx={cancelButtonStyle}>
            <KeyboardReturnIcon />
          </Button>
          <Button onClick={handleConfirmDetails} sx={confirmButtonStyle} disabled={isHouseConfirmDisabled}>
            Confirm
          </Button>
        </Sheet>
      </Sheet>
    </Modal>
  );

  return (
    <div>
      {!value?.pickupProperty && !value?.dropOffProperty && (
        <Typography variant="subtitle2" sx={{ fontWeight: "bold", pb: '8px', marginX: "auto", width: '100%' }}>
          Select Your Home Type
        </Typography>
      )}

      {(editMode || step === 'pickup' || step === 'drop-off') && !value?.pickupProperty && !value?.dropOffProperty && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Button onClick={() => handleTypeSelect('Apartment')} sx={selectionButtonStyle}>
            <Image
              alt=""
              height={14}
              width={14}
              src="icons/interface-login-key--entry-key-lock-login-pass-unlock.svg"
            />
            Apartment
          </Button>

          <Button onClick={() => handleTypeSelect('House')} sx={selectionButtonStyle}>
            <Image
              alt=""
              height={14}
              width={14}
              src="icons/interface-home-5--door-entrance-home-house-map-roof-round-window.svg"
            />
            House
          </Button>
        </div>
      )}

      {ChoiceModal()}

      {value?.pickupProperty && value?.dropOffProperty && (
        <Typography sx={{ fontSize: '16px', textAlign: 'center', color: '#4CAF50', fontWeight: 'bold', marginTop: '16px' }}>
          All properties selected! Click below to change.
          <Button variant="text" onClick={startEditSelection} sx={{ marginTop: '8px', color: '#FF6700' }}>
            Edit Selection
          </Button>
        </Typography>
      )}

      {ApartmentModal()}
      {HouseModal()}
    </div>
  );
};

// Styles
const modalStyles = {
  width: { xs: "90%", sm: "400px" },
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  background: "white",
  borderRadius: "24px 24px 0 0",
  padding: "24px",
  boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const cancelButtonStyle = {
  height: "48px",
  borderRadius: "12px",
  backgroundColor: "red",
  color: "#fff",
  fontWeight: "bold",
  ":hover": { backgroundColor: "#FF6700" },
  mb: 2,
  width: "20%",
};

const confirmButtonStyle = {
  height: "48px",
  borderRadius: "12px",
  backgroundColor: "#FF8919",
  color: "#fff",
  fontWeight: "bold",
  ":hover": { backgroundColor: "#FF6700" },
  width: "77%",
};

const selectionButtonStyle = {
  height: "40px",
  display: "flex",
  alignItems: "center",
  width: "42%",
  borderRadius: "12px",
  backgroundColor: "#4886FF",
  gap: "10px",
  "&:hover": { backgroundColor: "#FF881A" },
};
