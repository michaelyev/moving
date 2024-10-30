import { useState, useEffect } from 'react';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

interface MoversProps {
  value: number;
  onChange: (value: number) => void;
  minMovers?: number;
}

export const Movers = ({ value, onChange, minMovers = 2 }: MoversProps) => {
  const [movers, setMovers] = useState<number>(Math.max(value || 2, minMovers));

  useEffect(() => {
    onChange(movers);
  }, [movers, onChange]);

  useEffect(() => {
    if (movers < minMovers) {
      setMovers(minMovers);
    }
  }, [minMovers, movers]);

  const handleIncrement = () => {
    if (movers < 4) {
      setMovers(movers + 1);
    }
  };

  const handleDecrement = () => {
    if (movers > minMovers) {
      setMovers(movers - 1);
    }
  };

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '42%',
        justifyContent: 'space-between',
        border: '1px solid #E0E0E0',
        borderRadius: '12px',
        padding: '8px 16px',
        minHeight: '48px',
        '&:hover': {
          borderColor: '#FF8919',
        },
      }}
    >
      <Button
        sx={{
          all: 'unset',
          flexDirection: 'column',
          alignItems: 'flex-start',
          display: 'flex',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'unset',
          },
        }}
      >
        <Typography
          sx={{
            color: '#343A40',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '14px',
            paddingBottom: '6px',
          }}
        >
          Movers
        </Typography>
        <Typography fontWeight="light" color="#615D5D">
          {movers}
        </Typography>
      </Button>
      <Sheet>
        <Button
          onClick={handleIncrement}
          sx={{
            all: 'unset',
            padding: 'auto',
            cursor: 'pointer',
            mb: 0.5,
            py: 0.28,
            backgroundColor: '#FFF1C2',
            height: '18px',
            width: '29px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            '&:hover': {
              backgroundColor: '#FF8919',
            },
          }}
        >
          <AddOutlinedIcon />
        </Button>
        <Button
          onClick={handleDecrement}
          sx={{
            all: 'unset',
            padding: 'auto',
            cursor: 'pointer',
            backgroundColor: '#FFF1C2',
            height: '18px',
            py: 0.28,
            width: '29px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            '&:hover': {
              backgroundColor: '#FF8919',
            },
          }}
        >
          <RemoveOutlinedIcon />
        </Button>
      </Sheet>
    </Sheet>
  );
};
