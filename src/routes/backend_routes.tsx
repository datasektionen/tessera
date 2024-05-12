// Define the interface for the route parameters
interface GenerateRouteParams {
  eventID?: number | string;
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

  // Method to generate routes with dynamic parameters
  static generateRoute(route: string, params: GenerateRouteParams): string {
    let result = route;
    if (params.eventID) {
      result = result.replace(":eventID", params.eventID.toString());
    }
    return result;
  }
}

export default ApiRoutes;
