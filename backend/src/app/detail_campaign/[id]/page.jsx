import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heart from "../../../assets/images/heart.webp";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { KembaliButton } from "../components";
import { FeatureCircle } from "@/components";
import { getDonatur, getOneCampaign } from "@/services";
import { dateFormat, formatToRupiah } from "@/utils/helper";
import { ShareButton } from "./components";

export const generateMetadata = async ({ params }) => {
  const dataCampaign = await getOneCampaign(params.id);

  return {
    title: dataCampaign?.data?.data?.title,
    description: `Tunjukkan kebaikan hatimu dan bergabunglah dengan kami dalam memberikan dampak positif pada masyarakat! Sumbangkan sekarang untuk mendukung ${dataCampaign?.data?.data?.title} yang membawa perubahan nyata dalam kehidupan orang-orang yang membutuhkan.`,
  };
};

const DetailCampaign = async ({ params }) => {
  const detailCampaign = await getOneCampaign(params.id);
  const donaturData = await getDonatur();
  console.log(detailCampaign);
  return (
    <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center ">
      <div className="flex min-h-screen flex-col mx-auto w-full gap-5 p-5 max-w-2xl bg-white pb-20">
        <div className="w-full flex items-center ">
          <KembaliButton />
        </div>
        <article className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="w-full h-64">
              <Image
                src={detailCampaign?.data?.data?.image?.url}
                alt={detailCampaign?.data?.data?.image?.url}
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="font-bold text-lg">
              {detailCampaign?.data?.data?.title}
            </h1>
            <div className="flex gap-5 items-center">
              <FeatureCircle
                imageSrc={detailCampaign?.data?.detailCategorie?.icon?.url}
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-[#53B872] font-semibold">
                  {detailCampaign?.data?.data?.categorie}
                </h3>
                <small>{dateFormat(detailCampaign?.data?.created_at)}</small>
              </div>
            </div>
          </div>

          <div className="w-full h-full border flex gap-3 flex-col shadow-sm py-6 px-6 rounded-lg">
            <div className="flex justify-between">
              <span className="font-light text-black text-sm lg:text-base">
                Sisa Waktu
              </span>
              <span className="text-sm lg:text-base">
                {detailCampaign?.data?.remainingDays} Hari
              </span>
            </div>
            <progress
              className="progress progress-warning bg-[#FFF9F9]"
              value={detailCampaign?.data?.progress}
              max="100"
            ></progress>
            <div className="flex justify-between">
              <span className="font-bold text-black  text-sm lg:text-base">
                {formatToRupiah(
                  detailCampaign?.data?.data?.current_contribution
                )}
              </span>
              {detailCampaign?.data?.progress == 100 ? (
                <span className="text-xs sm:text-base text-green-600">
                  Terkumpul
                </span>
              ) : (
                <span className="text-xs sm:text-base text-red-600">
                  Proses
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full justify-between">
            <span>Target Dana :</span>
            <span className="text-[#53B872] font-bold">
              {formatToRupiah(detailCampaign?.data?.data?.target_contribution)}
            </span>
          </div>

          <div className="px-5 w-full h-full py-8 border relative flex flex-col">
            <div className="w-full flex flex-col items-center">
              <button className="absolute bg-yellow-400 text-black font-semibold px-20 -top-5 py-2 rounded-full">
                Deskripsi
              </button>
            </div>
            <div
              className="prose lg:prose-xl w-full h-full break-all"
              dangerouslySetInnerHTML={{
                __html: detailCampaign?.data?.data?.description,
              }}
            ></div>
          </div>

          <div className="px-5 py-8 border relative flex flex-col  ">
            <div className="w-full flex items-center justify-center">
              <button className="absolute bg-yellow-400 text-black font-semibold px-20 -top-5 py-2 rounded-full">
                Donator
              </button>
            </div>
            <div className="flex flex-col gap-5 w-full">
              {donaturData?.data?.map((item) => {
                return (
                  <div
                    className="flex gap-5 items-center w-full"
                    key={item._id}
                  >
                    <FeatureCircle imageSrc={Heart} />

                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex w-full justify-between">
                        <span className="font-semibold text-xs sm:text-sm">
                          {item.isAnonymous ? "Hamba Allah" : item.name}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-green-500">
                          {formatToRupiah(item.donation_amount)}
                        </span>
                      </div>
                      <small>{item.message}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex-col flex gap-5 items-center justify-center">
            <h3 className="font-bold">Bagikan ke:</h3>
            <ShareButton />
          </div>
        </article>
      </div>
      {detailCampaign?.data?.remainingDays !== 0 && (
        <div className="w-full max-w-[95%] sm:max-w-xl rounded-lg h-16 text-white flex fixed bottom-3 bg-black  ">
          <Link
            href={"/detail_campaign/form_konfirmasi"}
            className="w-full h-full text-white py-5 flex items-center justify-center font-bold"
          >
            Salurkan Dana Sekarang
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetailCampaign;
