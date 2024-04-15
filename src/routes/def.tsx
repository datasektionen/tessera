export const generateEditTicketReleaseTicketTypes = (
  eventId: number,
  ticketReleaseId: number
) => {
  return `/events/${eventId}/ticket-release/${ticketReleaseId}/ticket-types`;
};

export const generateEditTicketReleaseAddons = (
  eventId: number,
  ticketReleaseId: number
) => {
  return `/events/${eventId}/ticket-release/${ticketReleaseId}/addons`;
};

export const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  LOGIN_COMPLETE: "/login-complete/:token",
  LOGOUT: "/logout",
  EVENTS: "/events",
  EVENT_DETAIL: "/events/:eventID",
  EVENT_TICKET_RELEASE: "/events/:eventID/ticket-release",
  EDIT_EVENT_ADD_TICKET_RELEASE: "/events/:eventID/edit/add-ticket-release",
  EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES:
    "/events/:eventID/ticket-release/:ticketReleaseID/ticket-types",
  EDIT_EVENT_TICKET_RELEASE_ADDONS:
    "/events/:eventID/ticket-release/:ticketReleaseID/addons",
  CREATE_EVENT: "/create-event",
  MANAGE_EVENT: "/events/:eventID/manage",
  MANAGE_EVENT_TICKET_RELEASES: "/events/:eventID/manage/ticket-releases",
  MANAGE_EVENT_TICKETS: "/events/:eventID/manage/tickets",
  MANAGE_EVENT_RESPONSES: "/events/:eventID/manage/event-form-responses",
  SETTIGNS_FINANCIAL: "/events/:eventID/settings/financial",
  SETTINGS_LANDING_PAGE: "/test-page",
  EDIT_EVENT: "/events/:eventID/edit",
  EVENT_TICKET_RELEASE_DETAIL:
    "/events/:eventID/ticket-release/:ticketReleaseID",
  ALLOCATE_TICKETS:
    "/events/:eventID/ticket-release/:ticketReleaseID/allocate-tickets",
  PROFILE_TICKET_REQUESTS: "/profile/ticket-requests",
  PROFILE_TICKETS: "/profile/tickets",
  TICKETS: "/events/:eventID/tickets",
  TICKET_DETAIL: "/events/:eventID/tickets/:ticketID",
  ORGANIZATIONS: "/organizations",
  ORGANIZATION_DETAIL: "/organizations/:organizationID",
  ORGANIZATION_USERS: "/organizations/:organizationID/users",
  CREATE_ORGANIZATION: "/organizations/create",
  TICKET_RELEASE_METHODS: "/ticket-release-methods",
  TICKET_TYPES: "/ticket-types",
  USER_FOOD_PREFERENCES: "/user-food-preferences",
  TICKET_RELEASE_CONSTANTS: "/ticket-release/constants",
  PROFILE: "/profile",
  PROFILE_ORGANIZATIONS: "/profile/organizations",
  EXTERNAL: "/external",
  FORGOT_PASSWORD: "/forgot-password",
  PASSWORD_RESET: "/reset-password/:token",
  HANDLE_LOGIN_CALLBACK: "/handle-login-callback",
  EXTERNAL_VERIFY_EMAIL: "/verify-email/:token",
  VERIFY_PREFERRED_EMAIL: "/verify-preferred-email/:token",
  CONTACT_PAGE: "/contact",
  TICKET_SCANNER: "/events/:eventID/manage/scan",
  RENEW_FOOD_PREFS_CONSENT: "/profile/food-preferences/renew-consent",
  SEND_OUT: "/events/:eventID/send-out",
  EVENT_ECONOMY: "/events/:eventID/economy",
  PRIVACY_POLICY: "/privacy-policy",
};
