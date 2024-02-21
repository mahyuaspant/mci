import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getAll = () => {
  return axios.get(`/api/v1/kategori/public`);
};

const useGetAllPublicKategori = () => {
  const query = useQuery({
    queryFn: () => {
      return getAll();
    },
    queryKey: ["example"],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetAllPublicKategori;
