"use client";
import MobileMenu from "./MobileMenu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

const pages = ["Services", "Pricing", "FAQ", "Company"];

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:960px)"); // Прямой медиазапрос для мобильных
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} >
      <Container
        maxWidth="lg"
        sx={{
          background:
            "#4886FF",
          borderRadius: 8,
          color: '#FFFFFF',

        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="body1"
            noWrap
            sx={{ mr: 2, fontWeight: "bold" }}
          >
            movestream
          </Typography>
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <Button onClick={handleDrawerToggle} sx={{ color: "var(--info-main)" }}>
                <MenuIcon />
              </Button>
              <MobileMenu open={drawerOpen} onClose={handleDrawerToggle} pages={pages} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {pages.map((item) => (
                <Button key={item} sx={{ fontSize: "1rem", color: "var(--info-main)" }}>
                  {item}
                </Button>
              ))}
            </Box>
          )}
          <Box
            sx={{
              alignItems: "center",
              gap: "1rem",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography sx={{ color: "var(--info-main)", mr: 2 }}>
              +1 232 232 454
            </Typography>
            <Button
              sx={{
                px: 3,
                py: 1,
                backgroundColor: "var(--primary-main)",
                color: "#fff",
                borderRadius: 8,
              }}
            >
              Book Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
