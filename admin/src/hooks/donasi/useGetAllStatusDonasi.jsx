import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/status_donasi?page=${body.currentPage}&&limit=${body.limit || 10
    }&&search=${body.searchTerm}`
  );
};

const useGetAllStatusDonasi = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["status_donasi", body],
    select: (data) => data?.data?.data,
  });

  return query;
};

export default useGetAllStatusDonasi;
