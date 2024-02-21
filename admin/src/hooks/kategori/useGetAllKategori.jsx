import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getAll = (body) => {
  return axios.get(
    `/api/v1/kategori?page=${body.currentPage}&&limit=10&&search=${body.searchTerm}`
  );
};

const useGetAllExample = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["example", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetAllExample;
