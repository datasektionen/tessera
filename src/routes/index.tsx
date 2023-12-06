// Import statements should be at the top
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "./def";
import WelcomePage from "../pages/welcome";
import MainPage from "../pages/main";
import ProtectedRoute from "../components/login/PrivateRoute";
import EventDetail from "../pages/event/detail";
import { AppDispatch } from "../store";
import { currentUserRequest } from "../redux/features/userSlice";
import ProfilePage from "../pages/profile";
import CreateOrganizationPage from "../pages/organization/create";

function AppRoutes() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserRequest());
  }, [dispatch]);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.EVENT_DETAIL} element={<EventDetail />} />
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route
            path={ROUTES.CREATE_ORGANIZATION}
            element={<CreateOrganizationPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
