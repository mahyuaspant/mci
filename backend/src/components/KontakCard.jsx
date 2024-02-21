import { convertToWhatsAppFormat } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";

const KontakCard = ({ isSkeleton = false, name, address, no_telp }) => {
  return (
    <>
      {isSkeleton ? (
        <div className="flex flex-col gap-4 border-2 p-5 rounded-lg">
          <h1 className="font-bold text-base sm:text-lg skeleton h-5"></h1>
          <div className="flex gap-3 w-full">
            <FaLocationDot size={20} />
            <span className="w-full skeleton h-5"></span>
          </div>
          <Link
            target="_blank"
            href={
              "https://wa.me/+62895611861777?text=Hi, saya ingin menanyakan tentang MCI"
            }
            className="flex items-center gap-3 justify-center font-bold rounded-lg text-sm sm:text-base h-14 lg:h-16 text-white bg-black "
          >
            <IoChatbubbleEllipses size={30} />
            Kontak Narahubung
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 border-2 p-5 rounded-lg">
          <h1 className="font-bold text-base sm:text-lg">{name}</h1>
          <div className="flex gap-3 w-full">
            <FaLocationDot size={20} />
            <span className="text-xs sm:text-sm">{address}</span>
          </div>
          <Link
            target="_blank"
            href={`https://wa.me/${convertToWhatsAppFormat(
              no_telp
            )}?text=Assalamualaikum wr wb, saya ingin menanyakan tentang ${name}`}
            className="flex items-center gap-3 justify-center font-bold rounded-lg text-sm sm:text-base h-14 lg:h-16 text-white bg-black "
          >
            <IoChatbubbleEllipses size={30} />
            Kontak Narahubung
          </Link>
        </div>
      )}
    </>
  );
};

export default KontakCard;
