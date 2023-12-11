import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  ITicketRelease,
  ITicketRequest,
  ITicketType,
  TicketRequestPostReq,
} from "../../types";

import {
  postTicketRequest,
  postTicketRequestFailure,
  postTicketRequestSuccess,
} from "../features/ticketRequestSlice";

import { toast } from "react-toastify";
import {
  getMyTicketRequestsFailure,
  getMyTicketRequestsRequest,
  getMyTicketRequestsSuccess,
} from "../features/myTicketRequestsSlice";

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
      toast.success("Ticket request created!");
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

function* getMyTicketRequestsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/my-ticket-requests`,
      {
        withCredentials: true,
      }
    );

    const ticket_requests: ITicketRequest[] = response.data.ticket_requests.map(
      (ticket_request: any) => {
        return {
          id: ticket_request.ID!,
          created_at: new Date(ticket_request.CreatedAt!).getTime(),
          is_handled: ticket_request.is_handled!,
          ticket_amount: ticket_request.ticket_amount!,
          ticket_type_id: ticket_request.ticket_type_id!,
          ticket_type: {
            id: ticket_request.ticket_type.ID!,
            name: ticket_request.ticket_type.name!,
            description: ticket_request.ticket_type.description!,
            price: ticket_request.ticket_type.price!,
            isReserved: ticket_request.ticket_type.is_reserved!,
          } as ITicketType,
          ticket_release_id: ticket_request.ticket_release_id!,
          ticket_release: {
            id: ticket_request.ticket_release.ID!,
            eventId: ticket_request.ticket_release.event_id!,
            name: ticket_request.ticket_release.name!,
            description: ticket_request.ticket_release.description!,
            open: new Date(ticket_request.ticket_release.open!).getTime(),
            close: new Date(ticket_request.ticket_release.close!).getTime(),
            has_allocated_tickets:
              ticket_request.ticket_release.has_allocated_tickets,
          } as ITicketRelease,
        } as ITicketRequest;
      }
    );

    if (response.status === 200) {
      yield put(getMyTicketRequestsSuccess(ticket_requests));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(getMyTicketRequestsFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getMyTicketRequestsFailure(errorMessage));
  }
}

function* watchTicdketRequestSaga() {
  yield takeLatest(postTicketRequest.type, createTicketRequestSaga);
  yield takeLatest(getMyTicketRequestsRequest.type, getMyTicketRequestsSaga);
}

export default watchTicdketRequestSaga;
