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
import ProfileOrganizationsPage from "../pages/profile/profile_organizations";
import Logout from "../components/user/logout";
import EventsPage from "../pages/event";
import CreateEventPage from "../pages/event/create";
import EditEventPage from "../pages/event/edit";
import ProfileTicketRequestsPage from "../pages/profile/profile_ticket_requests";
import ProfileTicketsPage from "../pages/profile/profile_tickets";
import EditEventAddTicketReleasePage from "../pages/event/edit_ticket_release";
import EditTicketReleases from "../components/events/edit/ticket_release/edit_ticket_releases";
import EditTicketTypes from "../pages/event/edit_ticket_types";
import ManageEventPage from "../pages/event/manage";
import { CssVarsProvider } from "@mui/joy";
import theme from "../theme";
import External from "../pages/external";
import { resetFetchUser } from "../redux/features/authSlice";
import HandleLoginCallback from "../pages/login/callback";
import { ReactElement, ReactNode } from "react";
import ExternalVerifyEmail from "../pages/external/verify-email";
import { useTranslation } from "react-i18next";
import ContactPage from "../pages/contact";
import FourOFour404 from "../pages/errors/404";
import TicketScannerPage from "../pages/event/ticket_scanner";
import ForgotPassword from "../pages/external/forgot_password";
import PasswordReset from "../pages/external/password_reset";
import SendOut from "../components/events/send_out";
import VerifyPreferredEmail from "../pages/user/preferred_email/verify";
import EventEconomyPage from "../pages/event/economy";
import EditTicketReleaseAddonsPage from "../pages/event/edit_addons";
import ManageEventTicketReleasesPage from "../pages/event/manage/ticket_releases";
import ManageEventTicketsPage from "../pages/event/manage/tickets";
import ManageEventFormResponsesPage from "../pages/event/manage/ticket_form_reponse_list_page";

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
const ProfileOrganizationsPageWithCurrentUser = withCurrentUserRequest(
  ProfileOrganizationsPage
);
const CreateOrganizationPageWithCurrentUser = withCurrentUserRequest(
  CreateOrganizationPage
);
const ManageEventPageWithCurrentUser = withCurrentUserRequest(ManageEventPage);
const TicketScannerPageWithCurrentUser =
  withCurrentUserRequest(TicketScannerPage);
const EventEconomyPageWithCurrentUser =
  withCurrentUserRequest(EventEconomyPage);

const EditTicketReleaseAddonsWithCurrentUser = withCurrentUserRequest(
  EditTicketReleaseAddonsPage
);

const ManageEventTicketReleasesWithCurrentUser = withCurrentUserRequest(
  ManageEventTicketReleasesPage
);

const ManageEventTicketsWithCurrentUser = withCurrentUserRequest(
  ManageEventTicketsPage
);

const ManageEventFormResponsesWithCurrentUser = withCurrentUserRequest(
  ManageEventFormResponsesPage
);

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
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
        <Route
          path={ROUTES.EXTERNAL_VERIFY_EMAIL}
          element={<ExternalVerifyEmail />}
        />
        <Route
          path={ROUTES.VERIFY_PREFERRED_EMAIL}
          element={<VerifyPreferredEmail />}
        />
        <Route path={ROUTES.MAIN} element={<MainPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
          <Route path={ROUTES.CONTACT_PAGE} element={<ContactPage />} />
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
            path={ROUTES.EDIT_EVENT_TICKET_RELEASE_ADDONS}
            element={<EditTicketReleaseAddonsWithCurrentUser />}
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
            element={<ProfileOrganizationsPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.CREATE_ORGANIZATION}
            element={<CreateOrganizationPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.MANAGE_EVENT}
            element={<ManageEventPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.MANAGE_EVENT_TICKET_RELEASES}
            element={<ManageEventTicketReleasesWithCurrentUser />}
          />

          <Route
            path={ROUTES.MANAGE_EVENT_TICKETS}
            element={<ManageEventTicketsWithCurrentUser />}
          />

          <Route
            path={ROUTES.MANAGE_EVENT_RESPONSES}
            element={<ManageEventFormResponsesWithCurrentUser />}
          />

          <Route path={ROUTES.SEND_OUT} element={<SendOut />} />
          <Route
            path={ROUTES.EVENT_ECONOMY}
            element={<EventEconomyPageWithCurrentUser />}
          />
          <Route
            path={ROUTES.TICKET_SCANNER}
            element={<TicketScannerPageWithCurrentUser />}
          />
        </Route>
        <Route path="*" element={<FourOFour404 />} />
        <Route path="/404" element={<FourOFour404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
