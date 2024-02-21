"use client";
import { getBerita, getCampaign, getKategori, getProfile } from "@/services";
import Image from "next/image";
import SwiperBeranda from "./SwiperBeranda";
import SwiperSection from "./SwiperSection";
import Link from "next/link";
import { FeatureCircle } from "@/components";
import React, { useEffect, useState } from "react";

const Section = () => {
  const [search, setSearch] = useState("");
  const [dataKategori, setDataKategori] = useState([]);
  const [dataCampaign, setDataCampaign] = useState([]);
  const [dataBerita, setDataBerita] = useState([]);
  const [dataProfile, setDataProfile] = useState([]);
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  async function kategoriFetch() {
    const result = await getKategori();
    return result;
  }
  async function campaignFetch() {
    const result = await getCampaign({ search });
    return result;
  }
  async function beritaFetch() {
    const result = await getBerita();
    return result;
  }

  async function profileFetch() {
    const result = await getProfile();

    return result;
  }

  useEffect(() => {
    campaignFetch()
      .then((res) => {
        setDataCampaign(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingCampaign(false);
      });
  }, [search]);

  useEffect(() => {
    setLoadingCampaign(true);

    Promise.all([
      kategoriFetch(),
      campaignFetch(),
      beritaFetch(),
      profileFetch(),
    ])
      .then(([kategoriRes, campaignRes, beritaRes, profileRes]) => {
        setDataKategori(kategoriRes);
        setDataCampaign(campaignRes);
        setDataBerita(beritaRes);
        setDataProfile(profileRes);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingCampaign(false); // Setelah semua fetching selesai, atur loading menjadi false
      });
  }, []);

  return (
    <>
      {/* section 1 */}

      <div className="grid grid-cols-4 gap-[15px] items-center  justify-between ">
        {dataKategori?.data?.map((item) => {
          return (
            <FeatureCircle
              onClick={() => {
                if (item.name == search || loadingCampaign == true) {
                  return null;
                }
                setLoadingCampaign(true);
                setSearch(item.name);
              }}
              key={item._id}
              imageSrc={`${item.icon.url}`}
              text={item.name}
            />
          );
        })}
      </div>

      {/* SECTION 2 */}
      <div className="w-full flex flex-col gap-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">Salurkan Dana</h2>
          <Link
            href={"/eksplorasi"}
            className="text-[#53B872] font-semibold text-lg underline"
          >
            Lihat Semua
          </Link>
        </div>
        {loadingCampaign ? (
          <>
            <div className="flex flex-col gap-4 w-full">
              <div className="skeleton h-44 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </>
        ) : (
          <>
            {dataCampaign?.data?.length < 1 ? (
              <span className="text-center py-40">
                Campaign {search} tidak ditemukan
              </span>
            ) : (
              <SwiperSection
                isDonasi={true}
                slidesDataDonasi={dataCampaign?.data}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Section;
