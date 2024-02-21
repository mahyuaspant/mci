import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotify, successNotify } from "@/utils/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const create = (body) => {
  return axios.post("/api/v1/status_donasi/admin", body);
};

const useCreateStatusDonasi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["status_donasi"] });
      successNotify("Berhasil menambahkan status donasi");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useCreateStatusDonasi;
