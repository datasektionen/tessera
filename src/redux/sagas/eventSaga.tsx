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
          eventId: ticketRelease.event_id!,
          name: ticketRelease.name!,
          description: ticketRelease.description!,
          open: new Date(ticketRelease.open!),
          close: new Date(ticketRelease.close!),
          ticketReleaseMethodDetailId:
            ticketRelease.ticket_release_method_detail_id!,
          ticketTypes: ticketRelease.ticket_types!.map((ticketType: any) => {
            return {
              ticketTypeId: ticketType.ticket_type_id!,
              name: ticketType.name!,
              description: ticketType.description!,
              price: ticketType.price!,
              quantityTotal: ticketType.quantity_total!,
              isReserved: ticketType.is_reserved!,
            } as ITicketType;
          }),
          ticketReleaseMethodDetail: {
            id: eventData.ticket_release_method_detail_id!,
            name: eventData.ticket_release_method_detail_name!,
            maxTicketsPerUser:
              eventData.ticket_release_method_detail_max_tickets_per_user!,
            cancellationPolicy:
              eventData.ticket_release_method_detail_cancellation_policy!,
            openWindowDays:
              eventData.ticket_release_method_detail_open_window_days!,
            ticketReleaseMethod: {
              id: eventData.ticket_release_method_id!,
              methodName: eventData.ticket_release_method_name!,
              description: eventData.ticket_release_method_description!,
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
