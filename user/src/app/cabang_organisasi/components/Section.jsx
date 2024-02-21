"use client";

import { KontakCard, SearchInput } from "@/components";
import { getCabang } from "@/services";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Section = () => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [dataCabang, setDataCabang] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function fetchCabang() {
    setIsLoading(true);
    const result = await getCabang({ search: value });
    return result;
  }

  useEffect(() => {
    fetchCabang()
      .then((res) => {
        setDataCabang(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [value]);

  useEffect(() => {
    fetchCabang()
      .then((res) => {
        setDataCabang(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SearchInput
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="flex flex-col gap-3">
        {dataCabang?.total === 0 && !isLoading && (
          <span>{search} tidak ditemukan</span>
        )}
        {isLoading ? (
          <>
            <KontakCard isSkeleton={true} />
            <KontakCard isSkeleton={true} />
            <KontakCard isSkeleton={true} />
            <KontakCard isSkeleton={true} />
            <KontakCard isSkeleton={true} />
          </>
        ) : (
          dataCabang?.data?.map((item) => {
            return (
              <KontakCard
                key={item._id}
                name={item.name}
                address={item.address}
                no_telp={item.no_telp}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Section;
