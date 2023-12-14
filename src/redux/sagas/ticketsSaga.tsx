import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  IEvent,
  ITicket,
  ITicketRelease,
  ITicketRequest,
  ITicketType,
  TicketRequestPostReq,
} from "../../types";
import {
  cancelTicketFailure,
  cancelTicketSuccess,
  getMyTicketsFailure,
  getMyTicketsRequest,
  getMyTicketsSuccess,
} from "../features/myTicketsSlice";
import { toast } from "react-toastify";

function* getMyTicketSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/my-tickets`,
      {
        withCredentials: true,
      }
    );

    const tickets: ITicket[] = response.data.tickets.map((ticket: any) => {
      const ticket_request = ticket.ticket_request;
      return {
        id: ticket.ID!,
        is_paid: ticket.is_paid!,
        is_reserve: ticket.is_reserve!,
        refunded: ticket.refunded!,
        user_id: ticket.user_id!,
        created_at: new Date(ticket.CreatedAt!).getTime(),
        ticket_request: {
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
            event: {
              id: ticket_request.ticket_release.event.ID!,
              name: ticket_request.ticket_release.event.name!,
              date: new Date(
                ticket_request.ticket_release.event.date!
              ).getTime(),
            } as IEvent,
            name: ticket_request.ticket_release.name!,
            description: ticket_request.ticket_release.description!,
            open: new Date(ticket_request.ticket_release.open!).getTime(),
            close: new Date(ticket_request.ticket_release.close!).getTime(),
            has_allocated_tickets:
              ticket_request.ticket_release.has_allocated_tickets,
          } as ITicketRelease,
        } as ITicketRequest,
      } as ITicket;
    });

    console.log(tickets);

    if (response.status === 200) {
      yield put(getMyTicketsSuccess(tickets));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(getMyTicketsFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getMyTicketsFailure(errorMessage));
  }
}

function* cancellTicketRequestSaga(
  action: PayloadAction<ITicketRequest>
): Generator<any, void, any> {
  try {
    const ticketRelease = action.payload;

    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/events/${
        ticketRelease.ticket_release!.event!.id
      }/ticket-requests/${ticketRelease.id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      toast.success("Ticket request cancelled!");
      yield put(cancelTicketSuccess(ticketRelease.id));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(cancelTicketFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(cancelTicketFailure(errorMessage));
  }
}

function* watchTicketsSaga() {
  yield takeLatest(getMyTicketsRequest.type, getMyTicketSaga);
}

export default watchTicketsSaga;
