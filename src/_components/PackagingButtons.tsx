import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material'

export function PackagingButtons() {
  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", pb: '8px', marginX: "auto", width: '100%' }}>
        Packing needed
      </Typography>

      <ButtonGroup
        sx={{ width: "100%", marginX: "auto", pb: "16px", display: 'flex' }}
        variant="outlined"
        aria-label="Basic button group"
      >
        <Button sx={{ width: "33.33%" }}>None</Button>
        <Button sx={{ width: "33.33%" }}>Partial</Button>
        <Button sx={{ width: "33.9%" }}>Full</Button>
      </ButtonGroup>
    </>
  );
}