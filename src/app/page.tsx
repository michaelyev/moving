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
import TeamSwiper from "@/_components/Team/Team";
import ImageSwiper from "@/_components/GallerySlider/GallerySlider";
import GoogleReviewCount from "@/_components/GoogleReviews";
import { GoogleReviewMobile } from "@/_components/GoogleReviewsMobile";
import { ThumbtackReview } from "@/_components/Thumbtack";

export const metadata: Metadata = {
	title: "Movestream: Seattle Moving Company",
	description:
		"Movestream provides reliable moving services in Seattle. From local moves to heavy lifting, we handle it all with care. Affordable rates, professional movers, and personalized support.",
};

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "unset" }}>
      {/* <Typography
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
      </Typography> */}
      <Hero />

      <GoogleReviewMobile />

      <ThumbtackReview />
      
      <section id="calculator">
        <PricingCalculator />
      </section>
     

      <InfiniteSwiper />

      {/* <Container sx={{ marginTop: 4, padding: "unset" }}>
        {" "}
        <img
          src="/IMG_9425.jpeg"
          width="100%"
          height="40%"
          style={{ borderRadius: "24px", padding: 0 }}
        />
      </Container> */}
      <ServiceCard />

      <Benefits />
      <ImageSwiper />
      <FAQ />
    </Container>
  );
};

export default Page;

