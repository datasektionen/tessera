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
import ProfileOrgnizationsPage from "../pages/profile/profile_organizations";
import Logout from "../components/user/logout";
import EventsPage from "../pages/event";
import CreateEventPage from "../pages/event/create";
import EditEventPage from "../pages/event/edit";
import ProfileTicketRequestsPage from "../pages/profile/profile_ticket_requests";
import ProfileTicketsPage from "../pages/profile/profile_tickets";
import EditEventAddTicketReleasePage from "../pages/event/edit_ticket_release";
import EditTicketReleases from "../components/events/edit/edit_ticket_releases";
import EditTicketTypes from "../pages/event/edit_ticket_types";
import ManageEventPage from "../pages/event/manage";

function AppRoutes() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUserRequest());
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<WelcomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
          <Route path={ROUTES.EVENT_DETAIL} element={<EventDetail />} />
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.EVENTS} element={<EventsPage />} />
          <Route path={ROUTES.CREATE_EVENT} element={<CreateEventPage />} />
          <Route path={ROUTES.MANAGE_EVENT} element={<ManageEventPage />} />
          <Route path={ROUTES.EDIT_EVENT} element={<EditEventPage />} />
          <Route
            path={ROUTES.EDIT_EVENT_ADD_TICKET_RELEASE}
            element={<EditEventAddTicketReleasePage />}
          />
          <Route
            path={ROUTES.EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES}
            element={<EditTicketTypes />}
          />

          <Route
            path={ROUTES.PROFILE_TICKET_REQUESTS}
            element={<ProfileTicketRequestsPage />}
          />
          <Route
            path={ROUTES.PROFILE_TICKETS}
            element={<ProfileTicketsPage />}
          />
          <Route
            path={ROUTES.PROFILE_ORGANIZATIONS}
            element={<ProfileOrgnizationsPage />}
          />
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
