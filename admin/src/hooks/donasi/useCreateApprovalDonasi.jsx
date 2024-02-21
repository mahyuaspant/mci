import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotify, successNotify } from "@/utils/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const create = (body) => {
  return axios.post("/api/v1/status_donasi", body);
};

const useCreateApprovalDonasi = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["donasi"],
      });
      successNotify(
        `Berhasil melakukan aksi pada donatur ${data?.data?.data?.name}`
      );
      navigate("/dashboard/status");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useCreateApprovalDonasi;
