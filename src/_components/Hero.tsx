'use client'
import { Card, Container, Sheet, Typography, Box } from "@mui/joy";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MovingCalc } from "@/_components/MovingCalc/MovingCalc";


export const Hero = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginX: "auto",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-between",
        alignItems: "flex-start",
        background: "unset",
        padding: "unset",
        marginTop: 4,
        bottom: 0
      }}
    >
      <Sheet
        sx={{
          width: { sm: "60%", xs: "100%" },
          height: "100%",
          mb: { xs: 2 },
          background: "unset",
          display: "flex",
          flexDirection: "column",
          minHeight: "500px",
        }}
      >
        <Card variant="plain" sx={{ background: "unset" }}>
          <Typography
            sx={{
              fontSize: { sm: "2rem", xs: "1.5rem" },
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: 2
            }}
          >
            Seattle&apos;s Best Moving Company | MoveStream
          </Typography>
          <Typography level="h2" sx={{ fontSize: "xl", mb: 0.5 }}>
            Professional & Reliable
          </Typography>
          <Typography>
            MoveStream apartment and house moving services across Seattle and surrounding areas. We guarantee stress-free moving experience for homes and businesses. Turn-key solutions for all your moving needs.
          </Typography>
        </Card>

        {/* Spacer element to push Swiper to the bottom */}
        <Box sx={{ flexGrow: 1 }} />

        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          style={{
            height: "300px",
            width: "100%",
            borderRadius: "16px",
          }}
        >
          <SwiperSlide>
            <img
              src="/600x400/IMG_9455.jpeg"
              alt="Slide 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
          
          <SwiperSlide>
            <img
              src="/600x400/IMG_9401.jpeg"
              alt="Slide 3"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/600x400/IMG_9477.jpeg"
              alt="Slide 2"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/600x400/IMG_9456.jpeg"
              alt="Slide 1"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
          
        </Swiper>
      </Sheet>

      <MovingCalc />
    </Container>
  );
}
