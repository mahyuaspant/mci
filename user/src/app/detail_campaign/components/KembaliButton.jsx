"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

const KembaliButton = ({ isBeranda = false }) => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center ">
      <button
        onClick={() => {
          isBeranda ? router.push("/") : router.back();
        }}
        className="w-full  flex items-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
          <FaChevronLeft className="text-white group-hover:text-yellow-400 transition-all duration-500" />
        </div>
        <span>Kembali {isBeranda && "Ke Beranda"}</span>
      </button>
    </div>
  );
};

export default KembaliButton;
