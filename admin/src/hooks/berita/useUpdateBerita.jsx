import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

const update = (body) => {
  return axios.put(`/api/v1/berita/${body.id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useUpdateBerita = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return update(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useUpdateBerita;
