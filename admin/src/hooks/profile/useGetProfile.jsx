import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const get = () => {
  return axios.get(`/api/v1/profile`);
};

const useGetProfile = () => {
  const query = useQuery({
    queryFn: () => {
      return get();
    },
    queryKey: ["profile"],
    select: (data) => data.data.data,
  });

  return query;
};

export default useGetProfile;
