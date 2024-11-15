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
import { Metadata } from "next";
import Benefits from "@/_components/benefits/Benefits";
import PricingCalculator from "@/_components/Prices/Prices";
import InfiniteSwiper from "@/_components/Slider/Slider";

export const metadata: Metadata = {
	title: "Movestream: Seattle Moving Company",
	description:
		"Renova offers expert remodeling services in Seattle. Specializing in kitchens, bathrooms, basements, and more. Free consultations & financing options available.",
};

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
          marginTop: 2,
          display: { sm: "none" },
        }}
      >
        Seattle&apos;s Best Moving Company | MoveStream
      </Typography>
      <Hero />
      <PricingCalculator />
      <InfiniteSwiper />

      <Container sx={{ marginTop: 4, padding: "unset" }}>
        {" "}
        <img
          src="/IMG_9425.jpeg"
          width="100%"
          height="40%"
          style={{ borderRadius: "24px", padding: 0 }}
        />
      </Container>
      <ServiceCard />
      <Benefits />
      <FAQ />
    </Container>
  );
};

export default Page;

