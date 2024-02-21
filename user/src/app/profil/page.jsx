import { MainLayout } from "@/layouts";
import Image from "next/image";
import React from "react";
import { FeatureCircle, KontakCard } from "@/components";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { getProfile } from "@/services";

export const metadata = async () => {
  const dataProfile = await getProfile();
  return {
    title: dataProfile?.data?.name,
    description: dataProfile?.data?.abous_us,
    image: dataProfile?.data?.logo?.url,
  };
};

const Profil = async () => {
  const dataProfile = await getProfile();

  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <MainLayout>
        <div className="flex flex-col ">
          <Image
            src={dataProfile?.data?.logo?.url}
            alt={dataProfile?.data?.logo?.url}
            width={0}
            height={0}
            sizes="100vw"
            className="w-52 lg:w-96 object-cover h-52 lg:h-96 mx-auto"
          />
          <div className="gap-10 flex flex-col">
            <KontakCard
              name={dataProfile?.data?.name}
              no_telp={dataProfile?.data?.no_telp}
              address={dataProfile?.data?.address}
            />
            <div className="px-5 py-8 border relative flex flex-col">
              <div className="flex flex-col items-center">
                <button className="absolute bg-yellow-400 text-sm sm:text-base text-black font-semibold px-20 -top-5 py-2 rounded-full">
                  Deskripsi
                </button>
              </div>
              <p className="text-justify text-xs sm:text-sm">
                {dataProfile?.data?.about_us}
              </p>
            </div>
            <div className="w-full flex-col flex gap-5 items-center justify-center">
              <h3 className="font-bold">Ikuti Kami: </h3>
              <div className="flex gap-10">
                <Link
                  href={dataProfile?.data?.facebook}
                  target="_blank"
                  className="w-full h-full"
                >
                  <FeatureCircle
                    icon={<FaFacebook size={40} className="text-blue-600" />}
                  />
                </Link>
                <Link
                  href={dataProfile?.data?.instagram}
                  target="_blank"
                  className="w-full h-full"
                >
                  <FeatureCircle
                    icon={
                      <FaSquareInstagram size={40} className="text-[#e8476d]" />
                    }
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Profil;
