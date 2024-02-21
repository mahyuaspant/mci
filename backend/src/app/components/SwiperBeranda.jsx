"use client";

import React from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SliderBeranda from "../../assets/images/slider_beranda.webp";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function SwiperBeranda({ carouselData }) {
  return (
    <div className="flex flex-col items-end gap-[10px]">
      <Swiper
        className="mySwiper w-full"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {carouselData?.data?.map((item) => {
          return (
            <SwiperSlide
              key={item._id}
              className="text-center h-20 text-lg bg-white flex justify-center items-center"
            >
              <Image
                src={item?.image?.url}
                alt={item?.image?.url}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full lg:w-full object-cover h-52 lg:h-64 mx-auto"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
