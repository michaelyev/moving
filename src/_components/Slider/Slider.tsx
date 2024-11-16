'use client'
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

// Array of moving case details
const movingCases = [
  {
    imageSrc: '/cases/1_bedroom.jpg',
    title: '1 Bedroom Apartment',
    bedrooms: 1,
    heavyItems: 2,
    heavyItemsDetails: "Sofa, Coffee Table",
    assemblyItems: 3,
    assemblyItemsDetails: "Bed, Wardrobe",
    squareFootage: 600,
    totalCost: "$620",
    movers: 2,
    miles: 15,
    stories: 1,
    totalHours: "4.5 hours",
    clutterDescription: "Moderate number of items",
    packingOption: "Partial",
  },
  {
    imageSrc: '/cases/2_bedroom.jpg',
    title: '2 Bedroom Apartment',
    bedrooms: 2,
    heavyItems: 3,
    heavyItemsDetails: "Sofa, Dining Table, Bookcase",
    assemblyItems: 4,
    assemblyItemsDetails: "Beds, Dining Table, Desk",
    squareFootage: 900,
    totalCost: "$970",
    movers: 3,
    miles: 25,
    stories: 2,
    totalHours: "6.2 hours",
    clutterDescription: "High number of items",
    packingOption: "Full",
  },
  {
    imageSrc: '/cases/3_bedroom.webp',
    title: '3 Bedroom Apartment',
    bedrooms: 3,
    heavyItems: 5,
    heavyItemsDetails: "Sofa, Dining Table, TV Stand, Wardrobe, Desk",
    assemblyItems: 6,
    assemblyItemsDetails: "Beds, Wardrobes, Dining Table, TV Stand",
    squareFootage: 1200,
    totalCost: "$1,300",
    movers: 4,
    miles: 40,
    stories: 2,
    totalHours: "7.4 hours",
    clutterDescription: "Very high number of items",
    packingOption: "Full",
  },
  {
    imageSrc: '/cases/1500_house.jpg',
    title: '1500 Sq Ft House',
    bedrooms: 3,
    heavyItems: 6,
    heavyItemsDetails: "Sofas, Dining Table, Desk, Bookcase, Wardrobe",
    assemblyItems: 8,
    assemblyItemsDetails: "Beds, Wardrobes, Dining Table, Sofas",
    squareFootage: 1500,
    totalCost: "$1,480",
    movers: 4,
    miles: 50,
    stories: 2,
    totalHours: "8.3 hours",
    clutterDescription: "High number of items",
    packingOption: "Partial",
  },
  {
    imageSrc: '/cases/2500_house.jpg',
    title: '2500 Sq Ft House',
    bedrooms: 4,
    heavyItems: 8,
    heavyItemsDetails: "Sofas, Dining Table, Bookcase, Wardrobe, Desk, Piano",
    assemblyItems: 10,
    assemblyItemsDetails: "Beds, Wardrobes, Dining Table, Sofa, Bookcase",
    squareFootage: 2500,
    totalCost: "$1,980",
    movers: 5,
    miles: 70,
    stories: 3,
    totalHours: "10.1 hours",
    clutterDescription: "Very high number of items",
    packingOption: "Full",
  },
];

const InfiniteSwiper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      modules={[Pagination]}
      loop={true}
      centeredSlides={true}
      pagination={{ clickable: true }}
      slidesPerView={isMobile ? 1 : 1.3}
      spaceBetween={25}
      style={{
        width: "100%",
        paddingBottom: 90,
        borderRadius: '24px',
        overflow: "hidden"
      }}
    >
      {movingCases.map((item, index) => (
        <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              height: "500px",
              backgroundColor: "#f5f5f5",
              borderRadius: "24px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image src={item.imageSrc} alt={item.title} fill style={{ objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                right: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                padding: "16px",
                lineHeight: "1.4",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{item.title}</h3>
              <div style={{ fontSize: "14px" }}>
                <strong>Bedrooms:</strong> {item.bedrooms}<br />
                <strong>Heavy Items:</strong> {item.heavyItems} ({item.heavyItemsDetails})<br />
                <strong>Assembly/Disassembly:</strong> {item.assemblyItems} ({item.assemblyItemsDetails})<br />
                <strong>Square Footage:</strong> {item.squareFootage} sqft<br />
                <strong>Clutter:</strong> {item.clutterDescription}<br />
                <strong>Packing:</strong> {item.packingOption}<br />
                <strong>Total Cost:</strong> {item.totalCost}<br />
                <strong>Movers:</strong> {item.movers}<br />
                <strong>Distance:</strong> {item.miles} miles<br />
                <strong>Stories:</strong> {item.stories}<br />
                <strong>Total Hours:</strong> {item.totalHours}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InfiniteSwiper;
