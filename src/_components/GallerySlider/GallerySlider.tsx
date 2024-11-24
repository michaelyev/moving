"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const imagePaths = [
  "/imagesSlider/camphoto_33463914.jpg",
  "/imagesSlider/IMG_6275.jpeg",
  "/imagesSlider/IMG_6290.jpeg",
  "/imagesSlider/IMG_6301.jpeg",
  "/imagesSlider/IMG_6341.jpeg",
  "/imagesSlider/IMG_9400.jpeg",
  "/imagesSlider/IMG_9401.jpeg",
  "/imagesSlider/IMG_9403.jpeg",
  "/imagesSlider/IMG_9405.jpeg",
  "/imagesSlider/IMG_9427.jpeg",
  "/imagesSlider/IMG_9447.jpeg",
  "/imagesSlider/IMG_9453.jpeg",
  "/imagesSlider/IMG_9455.jpeg",
  "/imagesSlider/IMG_9456.jpeg",
  "/imagesSlider/IMG_9459.jpeg",
  "/imagesSlider/IMG_9467.jpeg",
  "/imagesSlider/IMG_9469.jpeg",
  "/imagesSlider/IMG_9472.jpeg",
  "/imagesSlider/IMG_9473.jpeg",
  "/imagesSlider/IMG_9477.jpeg",
  "/imagesSlider/IMG_9485.jpeg"
];

const ImageSwiper = () => {
  return (
    <Swiper
      slidesPerView={3} // Show 3 slides by default
      spaceBetween={16} // Space between slides
      loop={true} // Enable looping
      pagination={{ clickable: true }}

      breakpoints={{
        768: {
          slidesPerView: 3, // Show 3 slides on larger screens
          spaceBetween: 16,
        },
        0: {
          slidesPerView: 1.5, // Show ~1.5 slides on mobile
          spaceBetween: 8,
        },
      }}
      style={{ marginTop: "1rem", paddingBottom: "20px" }} // Margin-top applied here
    >
      {imagePaths.map((src, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "100%",
            height: "auto",

          }}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            width={500}
            height={300}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%", // Ensure slide width adjusts automatically
              height: "100%",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
