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

  if (userLoading) {
    console.log("User loading");
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  console.log("User is logged in");

  return <Outlet />;
};

export default ProtectedRoute;
