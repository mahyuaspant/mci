import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import axios from "axios";
import { useAuth } from "./store";
import { errorNotify } from "./utils/helper";

function App() {
  const navigate = useNavigate();
  const { token, setLogout } = useAuth();
  axios.interceptors.response.use(
    function (response) {
      // 200 type responses, this should be left as it is
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        errorNotify(error.response.data.message, 12312312312);
        setLogout();
        navigate("/");
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error)
      // Handle your 401 error, maybe the UI changes and removing from local storage
      return Promise.reject(error);
    }
  );
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.defaults.baseURL = "https://backend-mci.vercel.app";

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
