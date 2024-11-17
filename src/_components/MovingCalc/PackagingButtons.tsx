// @ts-nocheck

import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';

export function PackagingButtons({ value, onChange }) {
  const [selectedOption, setSelectedOption] = useState(value || 'None');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    onChange(option); // Передаем выбранное значение родительскому компоненту
  };

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", pb: '8px', marginX: "auto", width: '100%',  }}>
        Box packing needed
      </Typography>

      <ButtonGroup
        sx={{ width: "100%", marginX: "auto", pb: "16px", display: 'flex', borderColor: '#BCBCBC' }}
        variant="outlined"
        aria-label="Basic button group"
      >
        <Button
          sx={{ width: "33.33%" }}
          variant={selectedOption === 'None' ? 'contained' : 'outlined'}
          onClick={() => handleButtonClick('None')}
        >
          None
        </Button>
        <Button
          sx={{ width: "33.33%" }}
          variant={selectedOption === 'Partial' ? 'contained' : 'outlined'}
          onClick={() => handleButtonClick('Partial')}
        >
          Partial
        </Button>
        <Button
          sx={{ width: "33.9%" }}
          variant={selectedOption === 'Full' ? 'contained' : 'outlined'}
          onClick={() => handleButtonClick('Full')}
        >
          Full
        </Button>
      </ButtonGroup>
    </>
  );
}
