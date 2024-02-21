import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { errorNotify, successNotify } from "@/utils/helper";

const remove = (body) => {
  console.log(body);
  return axios.delete(`/api/v1/cabang/${body.id}`);
};

const useDeleteCabang = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return remove(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cabang"] });
      successNotify(data?.data?.message);
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useDeleteCabang;
