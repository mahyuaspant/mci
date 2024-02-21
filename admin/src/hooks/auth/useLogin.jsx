import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store";
import { errorNotify, successNotify } from "@/utils/helper";

const login = (body) => {
  return axios.post("/api/v1/auth", {
    username: body.username,
    password: body.password,
  });
};

const useLogin = () => {
  const queryClient = new QueryClient();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (body) => {
      return login(body);
    },
    onSuccess: (data) => {
      successNotify(data?.data?.message);
      setToken(data?.data?.token);
      navigate("/dashboard/home");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      errorNotify(error?.response?.data?.message);
    },
  });

  return mutation;
};

export default useLogin;
