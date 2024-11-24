'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ComplianceSwiper = () => {
  const slides = [
    {
      title: "Compliance with Washington UTC Moving Rules",
      content: `We strictly follow the regulations outlined by the 
      Washington Utilities and Transportation Commission (UTC). Learn more at 
      [UTC Moving Guide](https://www.utc.wa.gov/MovingGuide).`,
    },
    {
      title: "Permits and Approvals",
      content: `
        - We obtain necessary permits from Seattle Department of Transportation (SDOT).
        - Applications include detailed building dimensions, route plans, and permits.
        - Submitted 21 days before the move.
        - Route surveys conducted for buildings taller than 14'6".
      `,
    },
    {
      title: "Equipment Standards",
      content: `
        - Only authorized, regularly inspected equipment is used.
        - Trucks and dollies are licensed, insured, and inspected.
        - Adequate power is ensured for safe operation on steep grades.
      `,
    },
    {
      title: "Safety Measures",
      content: `
        - Certified flaggers and pedestrian traffic control for safe operations.
        - Team members use high-voltage rated rubber gloves for overhead utilities.
        - Safety blocks are positioned to prevent accidental movement during winching.
      `,
    },
    {
      title: "Lighting and Warning Equipment",
      content: `
        - Red flags during daylight and amber/red electric warning lights at night.
        - Lights installed on all building corners, sides, and vehicles for visibility.
      `,
    },
    {
      title: "Route and Utility Coordination",
      content: `
        - Collaborate with utilities to manage overhead wires or obstructions.
        - Costs for utility adjustments are covered by the mover.
        - Notify local authorities (fire, police) for street/sidewalk closures.
      `,
    },
    {
      title: "Personnel and Spare Equipment",
      content: `
        - Adequate staffing for piloting, flagging traffic, and equipment management.
        - Spare dollies and equipment are always available on-site to avoid delays.
      `,
    },
    {
      title: "Why Choose Us?",
      content: `
        - Licensed, insured, and authorized movers.
        - Full compliance with UTC and SDOT regulations.
        - Prioritize safety, efficiency, and customer satisfaction.
      `,
    },
  ];

  return (
    <div style={{ width: "80%", margin: "auto", paddingTop: "20px" }}>
      <h2>Our Commitment to Compliance</h2>
      <Swiper
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div style={{ padding: "20px", textAlign: "left" }}>
              <h3>{slide.title}</h3>
              <p>{slide.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ComplianceSwiper;
