// Import statements should be at the top
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, {
  ComponentType,
  startTransition,
  Suspense,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "./def";
import ProtectedRoute from "../components/login/PrivateRoute";
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
  ProfileOrganizationsPage,
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
  External,
  ForgotPassword,
  PasswordReset,
  ExternalVerifyEmail,
  VerifyPreferredEmail,
  ContactPage,
  SendOut,
  PrivacyPolicy,
  EventDetail,
  WelcomePage,
  SettingsFinancialPage,
  EventSendOutsPage,
  ManageSendOutList,
  EditEventTicketReleasesPage,
  EditEventFormPage,
  PricingPage,
} from "./page_import";

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

const SettingsFinancialPageWithCurrentUser = withCurrentUserRequest(
  SettingsFinancialPage
);

const ManageSendOutNewWithCurrentUser = withCurrentUserRequest(SendOut);
const ManageSendOutListWithCurrentUser =
  withCurrentUserRequest(ManageSendOutList);

const EventSendOutsPageWithCurrentUser =
  withCurrentUserRequest(EventSendOutsPage);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

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
          <Route path={ROUTES.PRICING} element={<PricingPage />} />

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
            <Route
              path={ROUTES.EVENTS}
              element={<EventsPageWithCurrentUser />}
            />
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
              path={ROUTES.EDIT_EVENT_TICKET_RELEASES}
              element={<EditEventTicketReleasesPageWithCurrentUser />}
            />
            <Route
              path={ROUTES.EDIT_EVENT_FORM}
              element={<EditEventFormPageWithCurrentUser />}
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
              path={ROUTES.SETTIGNS_FINANCIAL}
              element={<SettingsFinancialPageWithCurrentUser />}
            />

            <Route
              path={ROUTES.MANAGE_SEND_OUT_NEW}
              element={<EventSendOutsPageWithCurrentUser />}
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
