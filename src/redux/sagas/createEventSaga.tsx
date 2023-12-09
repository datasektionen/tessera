import { PayloadAction } from "@reduxjs/toolkit";
import {
  CompleteEventWorkflowPostReq,
  IEvent,
  IEventForm,
  IEventPostReq,
  ITicketRelease,
  ITicketReleaseForm,
  ITicketReleasePostReq,
  ITicketTypeForm,
} from "../../types";
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createEventFullWorkflowFailure,
  createEventFullWorkflowRequest,
  createEventFullWorkflowSuccess,
} from "../features/eventCreationSlice";
import { postCreateEvent } from "./helpers/createEvent";

function* createEventFullWorkflowSaga(
  action: PayloadAction<{
    event: IEventForm;
    ticketRelease: ITicketReleaseForm;
    ticketTypes: ITicketTypeForm[];
  }>
): Generator<any, void, any> {
  try {
    // Start by creating the event.
    const { event, ticketRelease, ticketTypes } = action.payload;
    const data: CompleteEventWorkflowPostReq = {
      event: {
        name: event.name,
        description: event.description,
        location: event.location,
        date: new Date(event.date).getTime() / 1000,
        is_private: event.is_private,
        organization_id: event.organization_id,
      },
      ticket_release: {
        name: ticketRelease.name,
        description: ticketRelease.description,
        open: new Date(ticketRelease.open).getTime() / 1000,
        close: new Date(ticketRelease.close).getTime() / 1000,
        open_window_duration: ticketRelease.open_window_duration! * 60,
        max_tickets_per_user: ticketRelease.max_tickets_per_user,
        notification_method: ticketRelease.notification_method.toUpperCase(),
        cancellation_policy: ticketRelease.cancellation_policy.toUpperCase(),
        ticket_release_method_id: ticketRelease.ticket_release_method_id,
      },
      ticket_types: ticketTypes.map((ticketType: ITicketTypeForm) => {
        return {
          name: ticketType.name,
          description: ticketType.description,
          price: ticketType.price,
          quantity_total: ticketType.quantity_total,
          is_reserved: ticketType.is_reserved,
        };
      }),
    };

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/complete-event-workflow`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 201) {
      yield put(createEventFullWorkflowSuccess());
      setTimeout(() => {
        toast.success("Event created!");
      }, 500);
    }
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.error);
    yield put(createEventFullWorkflowFailure(error.message));
  }
}

function* watchCreateEventSaga() {
  yield takeLatest(
    createEventFullWorkflowRequest.type,
    createEventFullWorkflowSaga
  );
}

export default watchCreateEventSaga;
