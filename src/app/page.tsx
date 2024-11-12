// @ts-nocheck

import { Container, Typography } from "@mui/joy";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ServiceCard from "@/_components/Services/ServicesCard";
import FAQ from "@/_components/FAQ/Faq";
import { Hero } from "@/_components/Hero";
import Image from "next/image";

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "unset" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { sm: "2rem", xs: "1.5rem" },
          textTransform: "uppercase",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 0,
          display: { sm: "none" },
        }}
      >
        Seattle&apos;s Best Moving Company | MoveStream
      </Typography>
      <Hero />

      <ServiceCard />
      <Container sx={{ marginTop: 4, padding: "unset" }}>
        {" "}
        <img src="/IMG_9425.jpeg" width="100%" height="40%" style={{ borderRadius: "24px" }} />
      </Container>
      <FAQ />
    </Container>
  );
};

export default Page;
