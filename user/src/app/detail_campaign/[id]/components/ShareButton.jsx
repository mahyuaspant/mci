"use client";

import { FeatureCircle } from "@/components";
import { mainUrl } from "@/utils/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const ShareButton = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-10">
      <Link
        href={`https://web.facebook.com/sharer.php?u=${mainUrl}${pathname}`}
        target="_blank"
        className="w-full h-full"
      >
        <FeatureCircle
          icon={<FaFacebook size={40} className="text-blue-600" />}
        />
      </Link>
      <Link
        href={`https://api.whatsapp.com/send?text=${mainUrl}${pathname}`}
        target="_blank"
        className="w-full h-full"
      >
        <FeatureCircle
          icon={<IoLogoWhatsapp size={40} className="text-green-600" />}
        />
      </Link>
    </div>
  );
};

export default ShareButton;
