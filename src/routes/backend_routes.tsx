// Define the interface for the route parameters
interface GenerateRouteParams {
  eventID?: number | string;
}

// Define the API routes class
class ApiRoutes {
  // Base URL from environment variable
  private static baseUrl: string = process.env.REACT_APP_BACKEND_URL || "";

  // Static properties for API endpoints
  static MANAGER_EVENTS = `${ApiRoutes.baseUrl}/manager/events`;
  static MANAGER_EVENT = `${ApiRoutes.baseUrl}/manager/events/:eventID`;
  static MANAGER_COMPLETE_EVENT_WORKFLOW = `${ApiRoutes.baseUrl}/manager/complete-event-workflow`;
  static MANAGER_EVENT_TICKET_RELEASE = `${ApiRoutes.baseUrl}/manager/events/:eventID/ticket-release`;
  static MANAGER_NETWORK = `${ApiRoutes.baseUrl}/manager/network`;

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
