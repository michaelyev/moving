'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const cardStyle = {
  width: "300px",
  height: "320px",
  backgroundColor: "#f5f5f5",
  borderRadius: "24px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const InfiniteSwiper = () => {
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={20}
      loop={true} // Enables infinite scrolling
      centeredSlides={false}
      style={{ marginTop:4 }}
    >
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} style={{ width: "300px", marginTop:4 }}>
          <div style={cardStyle}>
            <h3 style={{ margin: 0, marginBottom: "8px" }}>Card {index + 1}</h3>
            <p style={{ margin: 0, color: "#666" }}>This is a sample card content.</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InfiniteSwiper;
