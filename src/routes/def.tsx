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

interface GenerateRouteParams {
  eventId?: number | string;
  ticketReleaseId?: number | string;
  token?: string;
  ticketId?: number;
  organizationId?: number;
}

export const generateRoute = (
  route: string,
  {
    eventId,
    ticketReleaseId,
    token,
    ticketId,
    organizationId,
  }: GenerateRouteParams
) => {
  let result = route;
  if (eventId) {
    result = route.replace(":eventID", eventId!.toString());
  }

  if (ticketReleaseId) {
    result = result.replace(":ticketReleaseID", ticketReleaseId.toString());
  }

  if (token) {
    result = result.replace(":token", token);
  }

  if (ticketId) {
    result = result.replace(":ticketID", ticketId.toString());
  }

  if (organizationId) {
    result = result.replace(":organizationID", organizationId.toString());
  }

  return result;
};

export const ROUTES = {
  // Main routes
  MAIN: "/",
  LOGIN: "/login",
  LOGIN_COMPLETE: "/login-complete/:token",
  LOGOUT: "/logout",

  // Manager related routes
  MANAGER_DASHBOARD: "/manager/dashboard",
  MANAGER_EVENTS: "/manager/events",
  MANAGER_TEAMS: "/manager/teams",
  MANAGER_SETTINGS_GENERAL: "/manager/settings/general",
  MANAGER_SETTINGS_SUBSCRIPTION: "/manager/settings/subscription",
  MANAGER_SETTINGS_FINANCIAL: "/manager/settings/financial",
  MANAGER_SETTINGS_USERS: "/manager/settings/users",
  MANAGER_SETTINGS_CONFIGURATION: "/manager/settings/configuration",

  // Event related routes
  EVENTS: "/events",
  EVENT_DETAIL: "/events/:refID",
  EVENT_TICKET_RELEASE: "/events/:eventID/ticket-release",
  EVENT_TICKET_RELEASE_DETAIL:
    "/events/:eventID/ticket-release/:ticketReleaseID",
  TICKETS: "/events/:eventID/tickets",
  TICKET_DETAIL: "/events/:eventID/tickets/:ticketID",

  // Event management routes
  MANAGE_EVENT: "/events/:eventID/manage",
  MANAGE_EVENT_TICKET_RELEASES: "/events/:eventID/manage/ticket-releases",
  MANAGE_EVENT_TICKETS: "/events/:eventID/manage/tickets",
  MANAGE_EVENT_RESPONSES: "/events/:eventID/manage/event-form-responses",
  MANAGE_SEND_OUT_LIST: "/events/:eventID/manage/send-outs",
  MANAGE_SEND_OUT_NEW: "/events/:eventID/manage/send-outs/new",
  SETTIGNS_FINANCIAL: "/events/:eventID/manage/settings/financial",
  MANAGE_EVENT_ECONOMY: "/events/:eventID/manage/economy",
  TICKET_SCANNER: "/events/:eventID/manage/scan",

  // Event editing routes
  EDIT_EVENT: "/events/:eventID/edit",
  EDIT_EVENT_ADD_TICKET_RELEASE: "/events/:eventID/edit/add-ticket-release",
  EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES:
    "/events/:eventID/ticket-release/:ticketReleaseID/ticket-types",
  EDIT_EVENT_TICKET_RELEASE_ADDONS:
    "/events/:eventID/ticket-release/:ticketReleaseID/addons",
  EDIT_EVENT_TICKET_RELEASES: "/events/:eventID/edit/ticket-releases",
  EDIT_EVENT_TICKET_TYPES: "/events/:eventID/edit/ticket-types",
  EDIT_EVENT_FORM: "/events/:eventID/edit/form",
  EDIT_EVENT_LANDING_PAGE: "/events/:eventID/edit/landing-page",

  // Event creation routes
  CREATE_EVENT: "/create-event",
  ALLOCATE_TICKETS:
    "/events/:eventID/ticket-release/:ticketReleaseID/allocate-tickets",

  // Organization related routes
  ORGANIZATIONS: "/organizations",
  ORGANIZATION_DETAIL: "/organizations/:organizationID",
  ORGANIZATION_USERS: "/organizations/:organizationID/users",
  CREATE_ORGANIZATION: "/organizations/create",

  // User profile routes
  PROFILE: "/profile",
  PROFILE_ORGANIZATIONS: "/profile/organizations",
  PROFILE_TICKET_REQUESTS: "/profile/ticket-requests",
  PROFILE_TICKETS: "/profile/tickets",
  USER_FOOD_PREFERENCES: "/user-food-preferences",
  RENEW_FOOD_PREFS_CONSENT: "/profile/food-preferences/renew-consent",

  // Password related routes
  FORGOT_PASSWORD: "/forgot-password",
  PASSWORD_RESET: "/reset-password/:token",

  // Other routes
  PRICING: "/pricing",
  TICKET_RELEASE_METHODS: "/ticket-release-methods",
  TICKET_TYPES: "/ticket-types",
  TICKET_RELEASE_CONSTANTS: "/ticket-release/constants",
  HANDLE_LOGIN_CALLBACK: "/handle-login-callback",
  EXTERNAL_VERIFY_EMAIL: "/verify-email/:token",
  VERIFY_PREFERRED_EMAIL: "/verify-preferred-email/:token",
  CONTACT_PAGE: "/contact",
  PRIVACY_POLICY: "/privacy-policy",

  // Guest routes
  GUEST_TICKET_REQUEST: "/events/:refID/guest/:ugkthid",

  // Admin routes
  ADMIN: "/admin/*",

  // Post login routes
  POST_LOGIN: "/post-login",
  BECOME_A_MANAGER: "/become-a-manager",
  CANVAS: "/canvas",
};
