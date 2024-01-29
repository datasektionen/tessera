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

  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  console.log("isLoggedIn", isLoggedIn);
  console.log("authLoading", authLoading);

  if (userLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
