import {
  IEvent,
  ITicketRelease,
  ITicketReleaseMethod,
  ITicketReleaseMethodDetail,
  ITicketType,
  LoginCredentials,
} from "../../../types";

export function convertResponseToEvent(responseData: any): IEvent {
  return {
    id: responseData.ID!,
    is_private: responseData.is_private!,
    createdAt: new Date(responseData.CreatedAt!).getTime(),
    name: responseData.name!,
    description: responseData.description!,
    location: responseData.location!,
    date: new Date(responseData.date!).getTime(),
    organizationId: responseData.organization_id!,
  };
}

export function convertResponseToTicketRelease(
  responseData: any
): ITicketRelease {
  return {
    id: responseData.ID!,
    eventId: responseData.event_id!,
    name: responseData.name!,
    description: responseData.description!,
    // Open and close are timestamps, convert to Date by multiplying by 1000
    open: new Date(responseData.open! * 1000).getTime(),
    close: new Date(responseData.close! * 1000).getTime(),
    ticketReleaseMethodDetailId: responseData.ticket_release_method_detail_id!,
    tickets_available: responseData.tickets_available!,
    ticketReleaseMethodDetail: {
      id: responseData.ticket_release_method_detail_id!,
      name: responseData.ticket_release_method_detail.name!,
      maxTicketsPerUser:
        responseData.ticket_release_method_detail.max_tickets_per_user!,
      cancellationPolicy:
        responseData.ticket_release_method_detail.cancellation_policy!,
      notificationMethod:
        responseData.ticket_release_method_detail.notification_method!,
      openWindowDuration:
        responseData.ticket_release_method_detail.open_window_days!,
    },
  };
}
