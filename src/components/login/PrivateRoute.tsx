import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const { isLoggedIn, loading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("authLoading", authLoading);

  if (authLoading) {
    return null;
  }

  console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
