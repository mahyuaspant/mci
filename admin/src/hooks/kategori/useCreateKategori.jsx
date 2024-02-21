import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

const create = (body) => {
  return axios.post(
    `/api/v1/kategori`,
    {
      name: body.name,
      icon: body.icon,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useCreateKategori = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["example"] });
      successNotify("Behasil menambahkan kategori");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useCreateKategori;
