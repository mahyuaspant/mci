import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../store";

const useLogOut = () => {
  const { setLogout } = useAuth();

  const query = useQuery({
    queryFn: () => {
      setLogout();
    },
    queryKey: ["auth"],
    enabled: false,
  });

  return query;
};

export default useLogOut;
