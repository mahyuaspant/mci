import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

const remove = (body) => {
  return axios.delete(`/api/v1/berita/${body.id}`);
};

const useDeleteBerita = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body) => {
      return remove(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
      successNotify("Berhasil menghapus berita");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useDeleteBerita;
