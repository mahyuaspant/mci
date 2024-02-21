"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { DonasiCard } from "@/components";
import { dateFormat } from "@/utils/helper";

const SlideBeritaContent = ({ title, content, image, _id, createdAt }) => (
  <div>
    <Link href={`/berita/${_id}`} className="flex flex-col  border  rounded-lg">
      <Image
        src={image.url}
        alt={image.url}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full object-cover h-44 lg:h-52 mx-auto"
      />
      <div className="flex flex-col gap-[10px] p-3 ">
        <div className="flex flex-col ">
          <h3 className=" font-semibold text-sm sm:text-base text-justify line-clamp-1">
            {title}
          </h3>
        </div>
        <small>Diposting pada {dateFormat(createdAt)}</small>
      </div>
    </Link>
  </div>
);

export default function SwiperSection({
  isDonasi = false,
  isBerita = false,
  slidesDataDonasi = [],
  slidesDataBerita = [],
}) {
  return (
    <Swiper
      slidesPerView={1.5}
      spaceBetween={30}
      pagination={false}
      modules={[Pagination]}
      className="mySwiper w-full "
    >
      {isDonasi &&
        slidesDataDonasi.map((item) => (
          <SwiperSlide key={item._id} className="">
            <DonasiCard {...item} />
          </SwiperSlide>
        ))}
      {isBerita &&
        slidesDataBerita.map((item) => (
          <SwiperSlide key={item._id} className="">
            <SlideBeritaContent {...item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
