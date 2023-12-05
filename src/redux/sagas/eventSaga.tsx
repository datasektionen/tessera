import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  ITicketRelease,
  ITicketReleaseMethod,
  ITicketReleaseMethodDetail,
  ITicketType,
  LoginCredentials,
} from "../../types";
import {
  getEventFailure,
  getEventRequest,
  getEventSuccess,
} from "../features/eventSlice";

function* eventSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    console.log("eventSaga");
    const response = yield call(
      axios.get,
      "http://localhost:8080/events/" + action.payload,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const eventData = response.data.event;
    console.log(response.data);

    const event: IEvent = {
      createdAt: new Date(eventData.CreatedAt!),
      name: eventData.name!,
      description: eventData.description!,
      location: eventData.location!,
      date: new Date(eventData.date!),
      organizationId: eventData.organization_id!,
      ticketReleases: eventData.ticket_releases!.map((ticketRelease: any) => {
        return {
          id: ticketRelease.id!,
          eventId: ticketRelease.event_id!,
          name: ticketRelease.name!,
          description: ticketRelease.description!,
          // Open and close are timestamps, convert to Date by multiplying by 1000
          open: new Date(ticketRelease.open! * 1000),
          close: new Date(ticketRelease.close! * 1000),
          ticketReleaseMethodDetailId:
            ticketRelease.ticket_release_method_detail_id!,
          ticketTypes: ticketRelease.ticket_types!.map((ticketType: any) => {
            return {
              id: ticketType.ID!,
              ticketReleaseId: ticketType.ticket_release_id!,
              name: ticketType.name!,
              description: ticketType.description!,
              price: ticketType.price!,
              quantityTotal: ticketType.quantity_total!,
              isReserved: ticketType.is_reserved!,
            } as ITicketType;
          }),
          ticketReleaseMethodDetail: {
            id: ticketRelease.ticket_release_method_detail_id!,
            name: ticketRelease.ticket_release_method_detail.name!,
            maxTicketsPerUser:
              ticketRelease.ticket_release_method_detail.max_tickets_per_user!,
            cancellationPolicy:
              ticketRelease.ticket_release_method_detail.cancellation_policy!,
            openWindowDays:
              ticketRelease.ticket_release_method_detail.open_window_days!,
            ticketReleaseMethod: {
              id: ticketRelease.ticket_release_method_id!,
              methodName:
                ticketRelease.ticket_release_method_detail!
                  .ticket_release_method!.method_name!,
              description:
                ticketRelease.ticket_release_method_detail!
                  .ticket_release_method!.description!,
            } as ITicketReleaseMethod,
          } as ITicketReleaseMethodDetail,
        } as ITicketRelease;
      }),
    };

    console.log(event);

    yield put(getEventSuccess(event));
  } catch (error: any) {
    yield put(getEventFailure(error.message));
  }
}

function* watchEventSaga() {
  yield takeLatest(getEventRequest.type, eventSaga);
}

export default watchEventSaga;
