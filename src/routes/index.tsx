import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ROUTES } from "./def";
import WelcomePage from "../pages/welcome";

function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
        {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}
        {/* <Route path={ROUTES.EVENTS} element={<EventsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
