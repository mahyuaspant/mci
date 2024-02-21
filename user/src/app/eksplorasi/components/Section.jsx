"use client";

import { DonasiCard, FeatureCircle, SearchInput } from "@/components";
import { getCampaign, getKategori } from "@/services";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Section = () => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [dataKategori, setDataKategori] = useState([]);
  const [dataCampaign, setDataCampaign] = useState([]);
  const [loadingCampaign, setLoadingCampaign] = useState(false);
  async function kategoriFetch() {
    const result = await getKategori();
    return result;
  }
  async function campaignFetch() {
    const result = await getCampaign({ search: value });
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
  }, [value]);

  useEffect(() => {
    setLoadingCampaign(true);

    Promise.all([kategoriFetch(), campaignFetch()])
      .then(([kategoriRes, campaignRes]) => {
        setDataKategori(kategoriRes);
        setDataCampaign(campaignRes);
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
      <div className="flex flex-col gap-5 px-0 sm:px-5">
        <SearchInput onChange={(e) => setSearch(e.target.value)} />
        {loadingCampaign ? (
          <>
            <div className="flex flex-col gap-4 w-full mb-3">
              <div className="skeleton h-44 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-full mb-3">
              <div className="skeleton h-44 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
            <div className="flex flex-col gap-4 w-full mb-3">
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
              dataCampaign?.data?.map((item) => (
                <DonasiCard key={item._id} {...item} isExplorasi={true} />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Section;
