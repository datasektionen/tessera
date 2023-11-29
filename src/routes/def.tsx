export const ROUTES = {
  WELCOME: "/",
  LOGIN: "/login",
  LOGIN_COMPLETE: "/login-complete/:token",
  LOGOUT: "/logout",
  EVENTS: "/events",
  EVENT_DETAIL: "/events/:eventID",
  EVENT_TICKET_RELEASE: "/events/:eventID/ticket-release",
  EVENT_TICKET_RELEASE_DETAIL:
    "/events/:eventID/ticket-release/:ticketReleaseID",
  ALLOCATE_TICKETS:
    "/events/:eventID/ticket-release/:ticketReleaseID/allocate-tickets",
  TICKET_REQUESTS: "/events/:eventID/ticket-requests",
  TICKETS: "/events/:eventID/tickets",
  TICKET_DETAIL: "/events/:eventID/tickets/:ticketID",
  ORGANIZATIONS: "/organizations",
  ORGANIZATION_DETAIL: "/organizations/:organizationID",
  ORGANIZATION_USERS: "/organizations/:organizationID/users",
  TICKET_RELEASE_METHODS: "/ticket-release-methods",
  TICKET_TYPES: "/ticket-types",
  USER_FOOD_PREFERENCES: "/user-food-preferences",
  TICKET_RELEASE_CONSTANTS: "/ticket-release/constants",
};
