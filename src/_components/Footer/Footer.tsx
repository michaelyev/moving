// @ts-nocheck

"use client";
import {
  Box,
  Container,
  Divider,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import CompanyInfo from "./CompanyInfo";
import Services from "./Services";
import Company from "./Company";
import Contact from "./Contact";


const Footer = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Container sx={{ padding: 'unset'}} maxWidth="lg">
      <Box
        mt={2}
        mb={4}
        p={4}
        sx={{
          background: "#4886FF",
          borderRadius: 8,
          color: "#FFFFFF", // Используем глобальную переменную цвета, если она указана
        }}
      >
        <Grid container spacing={5}>
          <Grid xs={12} sm={6} md={3}>
            <CompanyInfo />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Services isSmallScreen={isSmallScreen} />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Company isSmallScreen={isSmallScreen} />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Contact isSmallScreen={isSmallScreen} />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
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
        <Divider sx={{ backgroundColor: "#FBFCFC", mt: "1rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Typography textAlign="left" variant="caption">
            © 2024 movestream. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit">
              Terms & Conditions
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
