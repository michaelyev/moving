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
import Link from "next/link";
import Image from "next/image";
import { BookButton } from "../BookButton/BookButton";

const pages = [
  { name: "Services", link: "#services" },
  { name: "Pricing", link: "#pricing" },
  { name: "FAQ", link: "#faq" },
  { name: "Company", link: "#company" },
];

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:960px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Container
        maxWidth="lg"
        sx={{
          background: "#4886FF",
          borderRadius: 8,
          color: "#FFFFFF",
          mt: { xs: 2, sm: 4 },
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            component="a"
            href="/"
            variant="body1"
            noWrap
            sx={{
              mr: 2,
              fontWeight: "bold",
              color: "inherit",
              textDecoration: "none",
              transition: "color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                color: "var(--primary-info)",
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            MOVESTREAM
          </Typography>
          <Image alt="logo" src="/Subject.png" height={35} width={55} />
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              <Button
                onClick={handleDrawerToggle}
                sx={{ color: "var(--info-main)" }}
              >
                <MenuIcon />
              </Button>
              <MobileMenu
                open={drawerOpen}
                onClose={handleDrawerToggle}
                pages={pages}
              />
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
                <Link key={item.name} href={item.link} passHref>
                  <Button sx={{ fontSize: "1rem", color: "var(--info-main)" }}>
                    {item.name}
                  </Button>
                </Link>
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
            <Box
              component="a"
              href="tel:+12066656711"
              sx={{
                color: "var(--info-main)",
                mr: 2,
                textDecoration: "none",
                fontWeight: "bold",
                transition: "color 0.3s ease, transform 0.3s ease",
                "&:hover": {
                  color: "var(--primary-info)",
                  transform: "scale(1.1)",
                  cursor: "pointer",
                },
              }}
            >
              206-665-6711
            </Box>

            <BookButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
