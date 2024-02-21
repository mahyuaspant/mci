import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotify, successNotify } from "@/utils/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const create = (body) => {
  return axios.post("/api/v1/campaign", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaign"] });
      successNotify("Campaign berhasil dibuat!");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useCreateCampaign;
