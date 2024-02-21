import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";
import { useNavigate } from "react-router-dom";

const update = (body) => {
  return axios.put(`/api/v1/campaign/${body.id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return update(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaign"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useUpdateCampaign;
