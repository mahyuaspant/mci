import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "@/utils/helper";

const create = (body) => {
  return axios.post("/api/v1/berita", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useCreateBerita = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      successNotify(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useCreateBerita;
