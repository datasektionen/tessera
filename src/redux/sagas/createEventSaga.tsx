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
import { getDurationUnits, toGoDuration } from "../../utils/date_conversions";

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

    const { hours, minutes, seconds, days } =
      ticketRelease.reserve_payment_duration
        ? getDurationUnits(ticketRelease.reserve_payment_duration)
        : { hours: 0, minutes: 0, seconds: 0, days: 0 };

    const data: CompleteEventWorkflowPostReq = {
      event: {
        name: event.name,
        description: event.description,
        location: event.location!.label,
        date: new Date(event.date).toISOString(),
        end_date: event.end_date ? event.end_date : undefined,
        is_private: event.is_private,
        organization_id: event.organization_id,
        collect_food_preferences: event.collect_food_preferences,
      },
      ticket_release: {
        name: ticketRelease.name,
        description: ticketRelease.description,
        open: new Date(ticketRelease.open).toISOString(),
        close: new Date(ticketRelease.close).toISOString(),
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
        payment_deadline: ticketRelease.payment_deadline
          ? ticketRelease.payment_deadline
          : undefined,
        reserve_payment_duration: ticketRelease.reserve_payment_duration
          ? toGoDuration(days, hours, minutes, seconds)
          : undefined,
        allocation_cut_off: ticketRelease.allocation_cut_off
          ? ticketRelease.allocation_cut_off
          : undefined,
      },
      ticket_types: ticketTypes.map((ticketType: ITicketTypeForm) => {
        return {
          name: ticketType.name,
          description: ticketType.description,
          price: ticketType.price,
          save_template: ticketType.save_template,
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
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
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
