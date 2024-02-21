import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/berita?page=${body.currentPage}&&limit=10&&search=${body.searchTerm}`
  );
};

const useGetAllBerita = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["berita", body],
    select: (data) => data?.data?.data,
  });

  return query;
};

export default useGetAllBerita;
