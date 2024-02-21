"use client";

import { SearchInput } from "@/components";
import { getBerita } from "@/services";
import { dateFormat } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Section = () => {
  const [search, setSearch] = useState("");
  const [loadingBerita, setLoadingBerita] = useState(false);
  const [value] = useDebounce(search, 1000);
  const [dataBerita, setDataBerita] = useState([]);

  async function fetchDataBerita() {
    setLoadingBerita(true);
    const result = await getBerita({ search: value });
    return result;
  }

  useEffect(() => {
    fetchDataBerita()
      .then((res) => {
        setDataBerita(res);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setLoadingBerita(false);
      });
  }, [value]);

  useEffect(() => {
    fetchDataBerita()
      .then((res) => {
        setDataBerita(res);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setLoadingBerita(false);
      });
  }, []);
  return (
    <>
      <SearchInput onChange={(e) => setSearch(e.target.value)} />

      {loadingBerita ? (
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
          {dataBerita?.data?.length < 1 ? (
            <span className="text-center py-40">
              Berita {search} tidak ditemukan
            </span>
          ) : (
            dataBerita?.data?.map((item) => {
              return (
                <Link
                  key={item._id}
                  href={`/berita/${item?._id}`}
                  className="flex flex-col  border  rounded-lg"
                >
                  <Image
                    src={item?.image?.url}
                    alt={item?.image?.url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full object-cover h-44 lg:h-52 mx-auto"
                  />
                  <div className="flex flex-col gap-[10px] p-3 ">
                    <div className="flex flex-col ">
                      <h3 className=" font-semibold text-sm sm:text-base text-justify line-clamp-1">
                        {item?.title}
                      </h3>
                    </div>
                    <small>Diposting pada {dateFormat(item?.createdAt)}</small>
                  </div>
                </Link>
              );
            })
          )}
        </>
      )}
    </>
  );
};

export default Section;
