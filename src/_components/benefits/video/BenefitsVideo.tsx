import { Box, Typography } from "@mui/material";

const BenefitsVideo = () => {
  return (
    <Box marginTop={14}>
      <Typography sx={{ typography: { xs: "h4", md: "h3" } }} variant="h3">
        Watch How We Make Moving Easier
      </Typography>
      <Box
        width="100%"
        height={500}
        borderRadius={4}
        mt={4}
        sx={{
          backgroundColor: "grey.300",
        }}
      />
    </Box>
  );
};

export default BenefitsVideo;
