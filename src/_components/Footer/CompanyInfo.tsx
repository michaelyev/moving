import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const CompanyInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h6">movestream</Typography>
        <Typography display="block">
          Your Trusted Partner for a Stress-Free Moving Experience
        </Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          mt: { xs: "1rem", lg: "none" },
          flexDirection: "column",
        }}
      >
        <Typography variant="body2">
          Fully licensed and insured company:
        </Typography>
        <Typography variant="caption">
          UBI #60011878 <br /> UTC: THG056947 <br /> DOT No. 3246649
        </Typography>
      </Box>
    </Box>
  );
};

export default CompanyInfo;
