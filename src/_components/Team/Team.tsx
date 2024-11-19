'use client';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

const TeamSwiper = () => {
  const teamMembers = [
    { name: "John Doe", role: "Mover" },
    { name: "Jane Smith", role: "Driver" },
    { name: "Mike Johnson", role: "Coordinator" },
    { name: "Emily Davis", role: "Assistant" },
  ];

  return (
    <div className="px-6 py-8">
      <h2 className="text-center text-2xl font-bold mb-4">Meet Our Team</h2>
      <p className="text-center text-gray-600 mb-8">
        Our team is the heart of our operation, bringing skill, dedication, and
        a positive attitude to every move. Each member is trained,
        background-checked, and committed to making your move go smoothly.
      </p>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="pb-8"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide
            key={member.role}
            className="flex items-center text-center"
          >
     
              <div className="h-[300px] w-[300px] bg-black"></div>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSwiper;
