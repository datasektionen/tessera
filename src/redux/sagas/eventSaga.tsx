import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  IEventForm,
  IEventPostReq,
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
import { toast } from "react-toastify";
import {
  deleteEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  editEventFailure,
  editEventRequest,
  editEventSuccess,
} from "../features/editEventSlice";

function* eventSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      process.env.REACT_APP_BACKEND_URL + "/events/" + action.payload,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const eventData = response.data.event;

    const event: IEvent = {
      // Convert from ISO 8601 to Unix timestamp
      id: eventData.ID!,
      is_private: eventData.is_private!,
      createdAt: new Date(eventData.CreatedAt!).getTime(),
      name: eventData.name!,
      description: eventData.description!,
      location: eventData.location!,
      date: new Date(eventData.date!).getTime(),
      organizationId: eventData.organization_id!,
      createdById: eventData.created_by!,
      ticketReleases: eventData.ticket_releases!.map((ticketRelease: any) => {
        return {
          id: ticketRelease.ID!,
          eventId: ticketRelease.event_id!,
          name: ticketRelease.name!,
          description: ticketRelease.description!,
          // Open and close are timestamps, convert to Date by multiplying by 1000
          open: new Date(ticketRelease.open! * 1000).getTime(),
          close: new Date(ticketRelease.close! * 1000).getTime(),
          is_reserved: ticketRelease.is_reserved!,
          promo_code: ticketRelease.promo_code!,
          tickets_available: ticketRelease.tickets_available!,
          has_allocated_tickets: ticketRelease.has_allocated_tickets!,
          ticketReleaseMethodDetailId:
            ticketRelease.ticket_release_method_detail_id!,
          pay_within: ticketRelease.pay_within!,
          ticketTypes: ticketRelease.ticket_types!.map((ticketType: any) => {
            return {
              id: ticketType.ID!,
              ticketReleaseId: ticketType.ticket_release_id!,
              name: ticketType.name!,
              description: ticketType.description!,
              price: ticketType.price!,
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
            openWindowDuration:
              ticketRelease.ticket_release_method_detail.open_window_duration! /
              60, // Since backend stores in seconds, convert to minutes
            notificationMethod:
              ticketRelease.ticket_release_method_detail.notification_method!,
            ticketReleaseMethod: {
              id: ticketRelease.ticket_release_method_detail
                .ticket_release_method!.ID!,
              name: ticketRelease.ticket_release_method_detail!
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

function* editEventSaga(
  action: PayloadAction<{
    id: number;
    event: IEventForm;
  }>
): Generator<any, void, any> {
  try {
    const { event, id } = action.payload;

    const data: IEventPostReq = {
      name: event.name,
      description: event.description,
      location: event.location!.label,
      date: new Date(event.date).getTime() / 1000,
      is_private: event.is_private,
      organization_id: event.organization_id,
    };

    const response = yield call(
      axios.put,
      process.env.REACT_APP_BACKEND_URL + "/events/" + id,
      data,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      toast.success("Event updated successfully!");
      yield put(editEventSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(editEventFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(editEventFailure(errorMessage));
  }
}

function* deleteEventSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      process.env.REACT_APP_BACKEND_URL + "/events/" + action.payload,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      toast.success("Event deleted successfully!");
      yield put(deleteEventSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(deleteEventFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(deleteEventFailure(errorMessage));
  }
}

function* watchEventSaga() {
  yield takeLatest(deleteEventStart.type, deleteEventSaga);
  yield takeLatest(editEventRequest.type, editEventSaga);
  yield takeLatest(getEventRequest.type, eventSaga);
}

export default watchEventSaga;
