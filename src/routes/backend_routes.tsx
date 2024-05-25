// Define the interface for the route parameters
interface GenerateRouteParams {
  eventID?: number | string;
  organizationID?: number | string;
  ticketRequestID?: number | string;
  ticketID?: number | string;
  ticketReleaseID?: number | string;
}

// Define the API routes class
class ApiRoutes {
  // Base URL from environment variable
  private static baseUrl: string = process.env.REACT_APP_BACKEND_URL || "";

  // Static properties for API endpoints
  static VIEW_EVENT_LANDING_PAGE = `${ApiRoutes.baseUrl}/view/events/:refID/landing-page`;
  static MANAGER_EVENTS = `${ApiRoutes.baseUrl}/manager/events`;
  static MANAGER_EVENT = `${ApiRoutes.baseUrl}/manager/events/:eventID`;
  static MANAGER_COMPLETE_EVENT_WORKFLOW = `${ApiRoutes.baseUrl}/manager/complete-event-workflow`;
  static MANAGER_EVENT_TICKET_RELEASE = `${ApiRoutes.baseUrl}/manager/events/:eventID/ticket-release`;
  static MANAGER_NETWORK = `${ApiRoutes.baseUrl}/manager/network`;
  static MANAGER_EVENT_TICKET_CHECK_IN = `${ApiRoutes.baseUrl}/manager/events/:eventID/tickets/qr-check-in`;
  static MANAGER_EVENT_SALES_REPORT = `${ApiRoutes.baseUrl}/manager/events/:eventID/sales-report`;
  static MANAGER_EVENT_SEND_OUT = `${ApiRoutes.baseUrl}/manager/events/:eventID/send-outs`;
  static MANAGER_ORGANIZATIONS = `${ApiRoutes.baseUrl}/manager/organizations`;
  static MANAGER_EVENT_LANDING_PAGE = `${ApiRoutes.baseUrl}/manager/events/:eventID/landing-page`;
  static MANAGER_EVENT_LANDING_PAGE_EDITOR = `${ApiRoutes.baseUrl}/manager/events/:eventID/landing-page/editor`;
  static MANAGER_EVENT_LANDING_PAGE_SET_ENABLED = `${ApiRoutes.baseUrl}/manager/events/:eventID/landing-page/set-enabled`;
  static MANAGER_NETWORK_MERCHANT = `${ApiRoutes.baseUrl}/manager/network/merchant`;

  // Manager ticket requests
  static MANAGER_EVENT_TICKET_REQEUST_ACTION = `${ApiRoutes.baseUrl}/manager/events/:eventID/ticket-requests/action`;

  // Manager ticket
  static MANAGER_EVENT_TICKET_ACTION = `${ApiRoutes.baseUrl}/manager/events/:eventID/tickets/action`;

  static TEMPLATE_TICKET_RELEASE_UNSAVE = `${ApiRoutes.baseUrl}/templates/ticket-releases/:ticketReleaseID/unsave`;
  static TEMPLATE_TICKET_RELEASES = `${ApiRoutes.baseUrl}/templates/ticket-releases`;

  static ORGANIZATION = `${ApiRoutes.baseUrl}/organizations/:organizationID`;

  // Method to generate routes with dynamic parameters
  static generateRoute(route: string, params: GenerateRouteParams): string {
    let result = route;
    if (params.eventID) {
      result = result.replace(":eventID", params.eventID.toString());
    }
    if (params.organizationID) {
      result = result.replace(
        ":organizationID",
        params.organizationID.toString()
      );
    }
    if (params.ticketRequestID) {
      result = result.replace(
        ":ticketRequestID",
        params.ticketRequestID.toString()
      );
    }
    if (params.ticketID) {
      result = result.replace(":ticketID", params.ticketID.toString());
    }
    if (params.ticketReleaseID) {
      result = result.replace(
        ":ticketReleaseID",
        params.ticketReleaseID.toString()
      );
    }
    return result;
  }
}

export default ApiRoutes;
