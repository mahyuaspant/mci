import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { errorNotify, successNotify } from "@/utils/helper";

const create = (body) => {
  return axios.post(
    `/api/v1/carousel`,
    {
      image: body.image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const useCreateCarousel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body) => {
      return create(body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carousel"] });
      successNotify("Behasil menambahkan carousel");
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });
  return mutation;
};

export default useCreateCarousel;
