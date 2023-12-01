import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ROUTES } from "./def";
import WelcomePage from "../pages/welcome";
import MainPage from "../pages/main";
import ProtectedRoute from "../components/login/PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
        </Route>

        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        {/* <Route path={ROUTES.EVENTS} element={<EventsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
