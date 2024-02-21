import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";
import { useNavigate } from "react-router-dom";

const update = (body) => {
  return axios.put(`/api/v1/profile/${body.id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return update(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useUpdateProfile;
