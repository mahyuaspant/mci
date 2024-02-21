import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAll = (body) => {
  return axios.get(
    `/api/v1/dashboard?year=${body.year || 2024}&&categorie=${body.categorie || ""}`
  );
};

const useGetDashboard = (body) => {
  const query = useQuery({
    queryFn: () => {
      return getAll(body);
    },
    queryKey: ["dashboard", body],
    select: (data) => data?.data?.data,
  });

  return query;
};

export default useGetDashboard;
