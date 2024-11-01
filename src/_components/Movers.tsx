import { useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material';

interface MoversProps {
  value: number;
  onChange: (value: number) => void;
  minMovers?: number;
}

export const Movers = ({ onChange, minMovers = 2 }: MoversProps) => {
  // Ensure synchronization with parent component whenever minMovers changes
  useEffect(() => {
    onChange(minMovers);
  }, [minMovers, onChange]);

  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        width: "42%",
        border: "1px solid #E0E0E0",
        borderRadius: "12px",
        padding: "8px 16px",
        minHeight: "67px",
        "&:hover": {
          borderColor: "#FF8919",
        },
      }}
    >
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            color: "#343A40",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "14px",
            paddingBottom: "6px",
          }}
        >
          Movers
        </Typography>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
          fontWeight="light"
          color="#615D5D"
        >
          Needed
        </Typography>
      </Sheet>
      <Typography
        sx={{
          padding: "auto",
          backgroundColor: "#FFF1C2",
          height: "48px",
          width: "29px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          fontWeight: "bold",
          color: "#615D5D",
        }}
      >
        {minMovers}
      </Typography>
    </Sheet>
  );
};
