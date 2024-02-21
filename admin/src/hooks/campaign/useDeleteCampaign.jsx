import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorNotify, successNotify } from "@/utils/helper";
import axios from "axios";

const remove = (body) => {
  return axios.delete(`/api/v1/campaign/${body.id}`);
};

const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return remove(body);
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

export default useDeleteCampaign;
