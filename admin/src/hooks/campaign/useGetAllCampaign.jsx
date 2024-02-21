import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const findAll = (body) => {
  return axios.get(
    `/api/v1/campaign?page=${body.currentPage}&&limit=${
      body.limit || 10
    }&&search=${body.searchTerm}`
  );
};

const useGetAllCampaign = (body) => {
  const query = useQuery({
    queryFn: () => {
      return findAll(body);
    },
    queryKey: ["campaign", body],
    select: (data) => data?.data,
  });

  return query;
};

export default useGetAllCampaign;
