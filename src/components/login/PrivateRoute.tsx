import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setLoginRedirect } from "../../redux/features/authSlice";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const { isLoggedIn, loading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (userLoading) {
    return null;
  }

  if (!isLoggedIn) {
    const urlAfterLogin = encodeURIComponent(location.pathname);
    dispatch(setLoginRedirect(urlAfterLogin));
    let redirectUrl = redirectPath;
    if (!location.pathname.includes("logout")) {
      redirectUrl = `${redirectPath}?redirect=${urlAfterLogin}`;
    }

    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
