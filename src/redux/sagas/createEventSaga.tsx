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
  resetCurrentStep,
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

    if (new Date(event.date) < new Date(ticketRelease.close)) {
      setTimeout(() => {
        toast.error(
          "Event date must take place after the ticket release closes."
        );
      }, 500);
      yield put(resetCurrentStep());
      return;
    }

    const data: CompleteEventWorkflowPostReq = {
      event: {
        name: event.name,
        description: event.description,
        location: event.location!.label,
        date: new Date(event.date).getTime() / 1000,
        end_date: event.end_date
          ? new Date(event.end_date).getTime() / 1000
          : undefined,
        is_private: event.is_private,
        organization_id: event.organization_id,
        collect_food_preferences: event.collect_food_preferences,
      },
      ticket_release: {
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
        save_template: ticketRelease.save_template,
      },
      ticket_types: ticketTypes.map((ticketType: ITicketTypeForm) => {
        return {
          name: ticketType.name,
          description: ticketType.description,
          price: ticketType.price,
        };
      }),
    };

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/manager/complete-event-workflow`,
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
