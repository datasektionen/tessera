import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  IEventForm,
  IEventPostReq,
  ITicketRelease,
  ITicketReleaseForm,
  ITicketReleaseMethod,
  ITicketReleaseMethodDetail,
  ITicketReleasePostReq,
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
  editEventFailure,
  editEventRequest,
  editEventSuccess,
} from "../features/editEventSlice";
import {
  createTicketReleaseFailure,
  createTicketReleaseRequest,
  createTicketReleaseSuccess,
} from "../features/createTicketReleaseSlice";

function* createTicketReleaseSaga(
  action: PayloadAction<{
    eventId: number;
    ticketRelease: ITicketReleaseForm;
  }>
): Generator<any, void, any> {
  try {
    const { ticketRelease, eventId } = action.payload;

    const data: ITicketReleasePostReq = {
      event_id: eventId,
      name: ticketRelease.name,
      description: ticketRelease.description,
      open: new Date(ticketRelease.open).getTime() / 1000,
      close: new Date(ticketRelease.close).getTime() / 1000,
      open_window_duration: ticketRelease.open_window_duration! * 60,
      max_tickets_per_user: ticketRelease.max_tickets_per_user,
      notification_method: ticketRelease.notification_method.toUpperCase(),
      cancellation_policy: ticketRelease.cancellation_policy.toUpperCase(),
      ticket_release_method_id: ticketRelease.ticket_release_method_id,
      is_reserved: ticketRelease.is_reserved,
      promo_code: ticketRelease.is_reserved ? ticketRelease.promo_code : "",
      available_tickets: ticketRelease.available_tickets,
    };

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-release`,
      data,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 201) {
      toast.success("Ticket release created successfully");
      yield put(createTicketReleaseSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(createTicketReleaseFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(createTicketReleaseFailure(errorMessage));
  }
}

function* watchTicketReleaseSaga() {
  yield takeLatest(createTicketReleaseRequest.type, createTicketReleaseSaga);
}

export default watchTicketReleaseSaga;
