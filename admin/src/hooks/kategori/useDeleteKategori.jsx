import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

const remove = (body) => {
  return axios.delete(`/api/v1/kategori/${body.id}`);
};

const useDeleteKategori = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return remove(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["example"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useDeleteKategori;
