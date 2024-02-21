import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/cabang?page=${body.currentPage}&&limit=5&&search=${body.searchTerm}`
  );
};

const useGetAllCabang = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["cabang", body],
    select: (data) => data?.data?.data,
  });

  return query;
};

export default useGetAllCabang;
