import { useAuth } from "@/store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default ProtectedRoutes;
