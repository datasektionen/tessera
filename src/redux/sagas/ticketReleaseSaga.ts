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
import { toast } from "react-toastify";
import {
  createTicketReleaseFailure,
  createTicketReleaseRequest,
  createTicketReleaseSuccess,
} from "../features/createTicketReleaseSlice";
import {
  updateTicketReleaseFailure,
  updateTicketReleaseStart,
  updateTicketReleaseSuccess,
} from "../features/ticketReleaseSlice";
import ApiRoutes from "../../routes/backend_routes";

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
      method_description: ticketRelease.method_description,
      max_tickets_per_user: ticketRelease.max_tickets_per_user,
      notification_method: ticketRelease.notification_method.toUpperCase(),
      cancellation_policy: ticketRelease.cancellation_policy.toUpperCase(),
      ticket_release_method_id: ticketRelease.ticket_release_method_id,
      is_reserved: ticketRelease.is_reserved,
      promo_code: ticketRelease.is_reserved ? ticketRelease.promo_code : "",
      tickets_available: ticketRelease.tickets_available,
    };

    const response = yield call(
      axios.post,
      ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_TICKET_RELEASE, {
        eventID: eventId,
      }),
      data,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 201) {
      yield put(createTicketReleaseSuccess(response.data));
      setTimeout(() => {
        toast.success("Ticket release created successfully");
      }, 1000);
      window.location.href = `/events/${eventId}/edit`;
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

function* updateTicketReleaseSaga(
  action: PayloadAction<{
    eventId: number;
    ticketReleaseId: number;
    formData: ITicketReleaseForm;
  }>
): Generator<any, void, any> {
  try {
    const { formData, eventId, ticketReleaseId } = action.payload;

    const data: ITicketReleasePostReq = {
      name: formData.name,
      description: formData.description,
      open: new Date(formData.open).getTime() / 1000,
      close: new Date(formData.close).getTime() / 1000,
      open_window_duration: formData.open_window_duration! * 60,
      method_description: formData.method_description,
      max_tickets_per_user: formData.max_tickets_per_user,
      notification_method: formData.notification_method.toUpperCase(),
      cancellation_policy: formData.cancellation_policy.toUpperCase(),
      ticket_release_method_id: formData.ticket_release_method_id,
      is_reserved: formData.is_reserved,
      promo_code: formData.is_reserved ? formData.promo_code : "",
      tickets_available: formData.tickets_available,
    };

    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-release/${ticketReleaseId}`,
      data,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      toast.success("Ticket release updated successfully");
      yield put(updateTicketReleaseSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(updateTicketReleaseFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(updateTicketReleaseFailure(errorMessage));
  }
}

function* watchTicketReleaseSaga() {
  yield takeLatest(createTicketReleaseRequest.type, createTicketReleaseSaga);
  yield takeLatest(updateTicketReleaseStart.type, updateTicketReleaseSaga);
}

export default watchTicketReleaseSaga;
