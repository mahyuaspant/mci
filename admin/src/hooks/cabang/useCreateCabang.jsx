import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

import { useNavigate } from "react-router-dom";

const create = (body) => {
  return axios.post("/api/v1/cabang", body);
};

const useCreateCabang = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cabang"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useCreateCabang;
