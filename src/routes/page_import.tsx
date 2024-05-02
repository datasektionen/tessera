import React from "react";

export const MainPage = React.lazy(() => import("../pages/main"));
export const ProfilePage = React.lazy(() => import("../pages/profile"));
export const EditEventAddTicketReleasePage = React.lazy(
  () => import("../pages/event/edit/add_ticket_release")
);
export const EditTicketTypes = React.lazy(
  () => import("../pages/event/edit/edit_ticket_types")
);
export const ProfileTicketRequestsPage = React.lazy(
  () => import("../pages/profile/profile_ticket_requests")
);
export const ProfileTicketsPage = React.lazy(
  () => import("../pages/profile/profile_tickets")
);
export const ProfileOrganizationsPage = React.lazy(
  () => import("../pages/profile/profile_organizations")
);
export const CreateOrganizationPage = React.lazy(
  () => import("../pages/organization/create")
);
export const ManageEventPage = React.lazy(
  () => import("../pages/event/manage")
);
export const TicketScannerPage = React.lazy(
  () => import("../pages/event/ticket_scanner")
);
export const EventEconomyPage = React.lazy(
  () => import("../pages/event/economy")
);
export const EditTicketReleaseAddonsPage = React.lazy(
  () => import("../pages/event/edit/edit_addons")
);
export const ManageEventTicketReleasesPage = React.lazy(
  () => import("../pages/event/manage/ticket_releases")
);
export const ManageEventTicketsPage = React.lazy(
  () => import("../pages/event/manage/tickets")
);
export const ManageEventFormResponsesPage = React.lazy(
  () => import("../pages/event/manage/ticket_form_reponse_list_page")
);
export const FourOFour404 = React.lazy(() => import("../pages/errors/404"));

export const EventDetail = React.lazy(() => import("../pages/event/detail"));

export const EventsPage = React.lazy(() => import("../pages/event"));

export const CreateEventPage = React.lazy(
  () => import("../pages/event/create")
);

export const EditEventPage = React.lazy(
  () => import("../pages/event/edit/edit_event")
);

export const LoginPage = React.lazy(() => import("../pages/user_login"));
export const ProtectedRoute = React.lazy(
  () => import("../components/login/PrivateRoute")
);
export const Logout = React.lazy(() => import("../components/user/logout"));

export const HandleLoginCallback = React.lazy(
  () => import("../pages/login/callback")
);
export const ExternalVerifyEmail = React.lazy(
  () => import("../pages/user_login/verify-email")
);
export const ContactPage = React.lazy(() => import("../pages/contact"));

export const ForgotPassword = React.lazy(
  () => import("../pages/user_login/forgot_password")
);
export const PasswordReset = React.lazy(
  () => import("../pages/user_login/password_reset")
);
export const SendOut = React.lazy(
  () => import("../pages/event/send_out/new_send_out")
);
export const VerifyPreferredEmail = React.lazy(
  () => import("../pages/user/preferred_email/verify")
);

export const PrivacyPolicy = React.lazy(
  () => import("../components/legal/privacy")
);

export const SettingsFinancialPage = React.lazy(
  () => import("../pages/event/settings/financial")
);

export const EventSendOutsPage = React.lazy(
  () => import("../pages/event/send_out/list_send_out")
);

export const ManageSendOutList = React.lazy(
  () => import("../pages/event/send_out/list_send_out")
);

export const EditEventTicketReleasesPage = React.lazy(
  () => import("../pages/event/edit/edit_ticket_releases")
);

export const EditEventFormPage = React.lazy(
  () => import("../pages/event/edit/edit_event_form")
);

export const PricingPage = React.lazy(() => import("../pages/pricing"));

export const BecomeAnManagerPage = React.lazy(
  () => import("../pages/organizer/become_an_manager")
);
