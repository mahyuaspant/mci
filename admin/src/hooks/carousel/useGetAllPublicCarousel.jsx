import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const getAll = () => {
  return axios.get(`/api/v1/carousel/public`);
};

const useGetAllPublicCarousel = () => {
  const query = useQuery({
    queryFn: () => {
      return getAll();
    },
    queryKey: ["carousel"],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetAllPublicCarousel;
