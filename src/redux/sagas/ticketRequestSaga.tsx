import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  IEvent,
  ITicketType,
  LoginCredentials,
  TicketRequestPostReq,
} from "../../types";

import {
  postTicketRequest,
  postTicketRequestFailure,
  postTicketRequestSuccess,
} from "../features/ticketRequestSlice";
import { toast } from "react-toastify";

export interface TicketRequestData {
  ticket_type_id: number;
  ticket_amount: number;
}

function* createTicketRequestSaga(
  action: PayloadAction<{
    tickets: TicketRequestData[];
    eventId: number;
    ticketReleaseId: number;
  }>
): Generator<any, void, any> {
  try {
    const { tickets, eventId, ticketReleaseId } = action.payload;
    const body: TicketRequestPostReq[] = tickets.map((ticket) => {
      return {
        ticket_amount: ticket.ticket_amount,
        ticket_type_id: ticket.ticket_type_id,
        ticket_release_id: ticketReleaseId,
      };
    });

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-requests`,
      body,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 201) {
      yield put(postTicketRequestSuccess());
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(postTicketRequestFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";

    console.log(errorMessage);

    toast.error(errorMessage);
    yield put(postTicketRequestFailure(errorMessage));
  }
}

function* watchTicdketRequestSaga() {
  yield takeLatest(postTicketRequest.type, createTicketRequestSaga);
}

export default watchTicdketRequestSaga;
