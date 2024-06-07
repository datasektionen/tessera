// Import statements should be at the top
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, {
  ComponentType,
  startTransition,
  Suspense,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "./def";
import ProtectedRoute, {
  SuperAdminProtectedRoute,
} from "../components/login/PrivateRoute";
import { currentUserRequest } from "../redux/features/userSlice";
import Logout from "../components/user/logout";
import TesseraWrapper from "../components/wrappers/page_wrapper";
import LoadingOverlay from "../components/Loading";

import {
  MainPage,
  ProfilePage,
  EditEventAddTicketReleasePage,
  EditTicketTypes,
  ProfileTicketRequestsPage,
  ProfileTicketsPage,
  CreateOrganizationPage,
  ManageEventPage,
  TicketScannerPage,
  EventEconomyPage,
  EditTicketReleaseAddonsPage,
  ManageEventTicketReleasesPage,
  ManageEventTicketsPage,
  ManageEventFormResponsesPage,
  FourOFour404,
  EventsPage,
  CreateEventPage,
  EditEventPage,
  HandleLoginCallback,
  ForgotPassword,
  PasswordReset,
  ExternalVerifyEmail,
  ContactPage,
  SendOut,
  PrivacyPolicy,
  EventDetail,
  SettingsFinancialPage,
  EventSendOutsPage,
  ManageSendOutList,
  EditEventTicketReleasesPage,
  EditEventFormPage,
  LoginPage,
  PricingPage,
  PostLoginPage,
  BecomeAManagerPage,
  ManagerPage,
  ManagerTeamsPage,
  EditEventLandingEditorPage,
  EditLandingPageSettingsPage,
  EventDetailLandingPage,
  ManagerSetupPage,
} from "./page_import";
import GrapesJSEditor from "../pages/event/edit/edit_landing_page/edit_page";

import GuestTicketRequestPage from "../pages/event/guest/guest_ticket_request";
import AdminPage from "../admin";
import { useEventAccess } from "../components/events/use_event_access";
import { useCanAccessEvent } from "../utils/event_access";

function withCurrentUserRequest<P>(
  Component: ComponentType<P>
): ComponentType<P & React.JSX.IntrinsicAttributes> {
  const WrappedComponent: React.FC<P & React.JSX.IntrinsicAttributes> = (
    props
  ) => {
    const dispatch = useDispatch();

    useEffect(() => {
      startTransition(() => {
        dispatch(currentUserRequest());
      });
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
const EditEventTicketReleasesPageWithCurrentUser = withCurrentUserRequest(
  EditEventTicketReleasesPage
);

const EditEventFormPageWithCurrentUser =
  withCurrentUserRequest(EditEventFormPage);

const ProfileTicketRequestsPageWithCurrentUser = withCurrentUserRequest(
  ProfileTicketRequestsPage
);
const ProfileTicketsPageWithCurrentUser =
  withCurrentUserRequest(ProfileTicketsPage);
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

const EditEventLandingPageWithCurrentUser = withCurrentUserRequest(
  EditEventLandingEditorPage
);
const EditLandingPageSettingsPageWithCurrentUser = withCurrentUserRequest(
  EditLandingPageSettingsPage
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

const SettingsFinancialPageWithCurrentUser = withCurrentUserRequest(
  SettingsFinancialPage
);

const ManageSendOutNewWithCurrentUser = withCurrentUserRequest(SendOut);
const ManageSendOutListWithCurrentUser =
  withCurrentUserRequest(ManageSendOutList);

const EventSendOutsPageWithCurrentUser =
  withCurrentUserRequest(EventSendOutsPage);

const PostLoginPageWithCurrentUser = withCurrentUserRequest(PostLoginPage);

const ManagerPageWithCurrentUser = withCurrentUserRequest(ManagerPage);

const ManagerSettingsPageWithCurrentUser =
  withCurrentUserRequest(ManagerSetupPage);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const ProtectedEventRoutes: React.FC = () => {
  const { eventID } = useParams(); // Required for the eventID
  const navigate = useNavigate();

  const canAccess = useCanAccessEvent(eventID!);

  if (!canAccess) {
    navigate(-1);
    return null;
  } else {
    return <Outlet />;
  }
};

function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <ScrollToTop />

      <Suspense
        fallback={
          <TesseraWrapper>
            <LoadingOverlay />
          </TesseraWrapper>
        }
      >
        <Routes>
          <Route
            path={ROUTES.HANDLE_LOGIN_CALLBACK}
            element={<HandleLoginCallback />}
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.PASSWORD_RESET} element={<PasswordReset />} />
          <Route
            path={ROUTES.EXTERNAL_VERIFY_EMAIL}
            element={<ExternalVerifyEmail />}
          />

          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.PRICING} element={<PricingPage />} />

          <Route path={ROUTES.EVENT_DETAIL} element={<EventDetail />} />

          <Route
            path={ROUTES.EVENT_DETAIL_LANDING_PAGE}
            element={<EventDetailLandingPage />}
          />

          <Route
            path={ROUTES.GUEST_TICKET_REQUEST}
            element={<GuestTicketRequestPage />}
          />

          <Route element={<ProtectedRoute />}>
            {/* Become and Manager */}
            <Route
              path={ROUTES.POST_LOGIN}
              element={<PostLoginPageWithCurrentUser />}
            />

            <Route
              path={ROUTES.BECOME_A_MANAGER}
              element={<BecomeAManagerPage />}
            />

            {/* --------- */}

            {/* Manager related rotues */}
            <Route
              path={ROUTES.MANAGER_DASHBOARD}
              element={<ManagerPageWithCurrentUser />}
            />

            <Route
              path={ROUTES.MANAGER_SETUP}
              element={<ManagerSettingsPageWithCurrentUser />}
            />

            <Route path={ROUTES.MANAGER_TEAMS} element={<ManagerTeamsPage />} />

            {/* ---------- */}

            <Route element={<SuperAdminProtectedRoute />}>
              <Route
                path={ROUTES.EVENTS}
                element={<EventsPageWithCurrentUser />}
              />
              <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            </Route>

            {/* Event check route */}
            <Route element={<ProtectedEventRoutes />}>
              {/* Edit event */}
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
                path={ROUTES.EDIT_EVENT_TICKET_RELEASES}
                element={<EditEventTicketReleasesPageWithCurrentUser />}
              />
              <Route
                path={ROUTES.EDIT_EVENT_FORM}
                element={<EditEventFormPageWithCurrentUser />}
              />

              {/* Landing page editor */}

              <Route
                path={ROUTES.EDIT_EVENT_LANDING_PAGE_EDTIOR}
                element={<EditEventLandingPageWithCurrentUser />}
              />
              <Route
                path={ROUTES.EDIT_EVENT_LANDING_PAGE_SETTINGS}
                element={<EditLandingPageSettingsPageWithCurrentUser />}
              />

              {/* Manage */}
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

              <Route
                path={ROUTES.MANAGE_SEND_OUT_NEW}
                element={<ManageSendOutNewWithCurrentUser />}
              />
              <Route
                path={ROUTES.MANAGE_SEND_OUT_LIST}
                element={<ManageSendOutListWithCurrentUser />}
              />
              <Route
                path={ROUTES.MANAGE_EVENT_ECONOMY}
                element={<EventEconomyPageWithCurrentUser />}
              />
              <Route
                path={ROUTES.TICKET_SCANNER}
                element={<TicketScannerPageWithCurrentUser />}
              />

              <Route
                path={ROUTES.MANAGE_SEND_OUT_NEW}
                element={<EventSendOutsPageWithCurrentUser />}
              />
            </Route>

            <Route path={ROUTES.LOGOUT} element={<Logout />} />
            <Route path={ROUTES.CONTACT_PAGE} element={<ContactPage />} />

            <Route
              path={ROUTES.PROFILE}
              element={<ProfilePageWithCurrentUser />}
            />

            <Route
              path={ROUTES.CREATE_EVENT}
              element={<CreateEventPageWithCurrentUser />}
            />

            {/* ---------------*/}

            <Route
              path={ROUTES.PROFILE_TICKET_ORDERS}
              element={<ProfileTicketRequestsPageWithCurrentUser />}
            />
            <Route
              path={ROUTES.PROFILE_TICKETS}
              element={<ProfileTicketsPageWithCurrentUser />}
            />

            <Route
              path={ROUTES.CREATE_ORGANIZATION}
              element={<CreateOrganizationPageWithCurrentUser />}
            />
          </Route>
          <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
          <Route path="*" element={<FourOFour404 />} />
          <Route path="/404" element={<FourOFour404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
