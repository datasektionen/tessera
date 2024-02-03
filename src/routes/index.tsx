// Import statements should be at the top
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ComponentType, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "./def";
import WelcomePage from "../pages/welcome";
import MainPage from "../pages/main";
import ProtectedRoute from "../components/login/PrivateRoute";
import EventDetail from "../pages/event/detail";
import { AppDispatch, RootState } from "../store";
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
import { CssVarsProvider } from "@mui/joy";
import theme from "../theme";
import External from "../pages/external";
import { resetFetchUser } from "../redux/features/authSlice";
import HandleLoginCallback from "../pages/login/callback";
import { ReactElement, ReactNode } from "react";

type WithCurrentUserRequestProps = {
  // define your props here, for example:
  // someProp: string;
};

function withCurrentUserRequest<P>(
  Component: ComponentType<P>
): ComponentType<P & React.JSX.IntrinsicAttributes> {
  const WrappedComponent: React.FC<P & React.JSX.IntrinsicAttributes> = (
    props
  ) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(currentUserRequest());
    }, [dispatch]);

    return <Component {...props} />;
  };

  return WrappedComponent;
}

const MainPageWithCurrentUser = withCurrentUserRequest(MainPage);
const EventDetailWithCurrentUser = withCurrentUserRequest(EventDetail);
const ProfilePageWithCurrentUser = withCurrentUserRequest(ProfilePage);
const EventsPageWithCurrentUser = withCurrentUserRequest(EventsPage);
const CreateEventPageWithCurrentUser = withCurrentUserRequest(CreateEventPage);
const EditEventPageWithCurrentUser = withCurrentUserRequest(EditEventPage);
const EditEventAddTicketReleasePageWithCurrentUser = withCurrentUserRequest(
  EditEventAddTicketReleasePage
);
const EditTicketTypesWithCurrentUser = withCurrentUserRequest(EditTicketTypes);
const ProfileTicketRequestsPageWithCurrentUser = withCurrentUserRequest(
  ProfileTicketRequestsPage
);
const ProfileTicketsPageWithCurrentUser =
  withCurrentUserRequest(ProfileTicketsPage);
const ProfileOrgnizationsPageWithCurrentUser = withCurrentUserRequest(
  ProfileOrgnizationsPage
);
const CreateOrganizationPageWithCurrentUser = withCurrentUserRequest(
  CreateOrganizationPage
);
const ManageEventPageWithCurrentUser = withCurrentUserRequest(ManageEventPage);

function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<WelcomePage />} />
        <Route
          path={ROUTES.HANDLE_LOGIN_CALLBACK}
          element={<HandleLoginCallback />}
        />
        <Route path={ROUTES.EXTERNAL} element={<External />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.MAIN} element={<MainPageWithCurrentUser />} />
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
          <Route
            path={ROUTES.EVENT_DETAIL}
            element={<EventDetailWithCurrentUser />}
          />
          <Route
            path={ROUTES.PROFILE}
            element={<ProfilePageWithCurrentUser />}
          />
          <Route path={ROUTES.EVENTS} element={<EventsPageWithCurrentUser />} />
          <Route
            path={ROUTES.CREATE_EVENT}
            element={<CreateEventPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.EDIT_EVENT}
            element={<EditEventPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.EDIT_EVENT_ADD_TICKET_RELEASE}
            element={<EditEventAddTicketReleasePageWithCurrentUser />}
          />
          <Route
            path={ROUTES.EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES}
            element={<EditTicketTypesWithCurrentUser />}
          />
          <Route
            path={ROUTES.PROFILE_TICKET_REQUESTS}
            element={<ProfileTicketRequestsPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.PROFILE_TICKETS}
            element={<ProfileTicketsPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.PROFILE_ORGANIZATIONS}
            element={<ProfileOrgnizationsPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.CREATE_ORGANIZATION}
            element={<CreateOrganizationPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.MANAGE_EVENT}
            element={<ManageEventPageWithCurrentUser />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
