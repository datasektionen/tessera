import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  IEvent,
  ITicket,
  ITicketRelease,
  ITicketReleaseMethodDetail,
  ITicketRequest,
  ITicketType,
  TicketRequestPostReq,
} from "../../types";
import {
  cancelMyTicketFailure,
  cancelMyTicketStart,
  cancelMyTicketSuccess,
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
        updated_at: new Date(ticket.UpdatedAt!).getTime(),
        reserve_number: ticket.reserve_number!,
        qr_code: ticket.qr_code!,
        checked_in: ticket.checked_in!,
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
            pay_within: ticket_request.ticket_release.pay_within!,
            description: ticket_request.ticket_release.description!,
            open:
              new Date(ticket_request.ticket_release.open!).getTime() * 1000,
            close:
              new Date(ticket_request.ticket_release.close!).getTime() * 1000,
            has_allocated_tickets:
              ticket_request.ticket_release.has_allocated_tickets,
            ticketReleaseMethodDetail: {
              id: ticket_request.ticket_release.ticket_release_method_detail
                .ID!,
              openWindowDuration:
                ticket_request.ticket_release.ticket_release_method_detail
                  .open_window_duration!,
              method_description:
                ticket_request.ticket_release.ticket_release_method_detail
                  .method_description!,
            } as ITicketReleaseMethodDetail,
          } as ITicketRelease,
        } as ITicketRequest,
      } as ITicket;
    });

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

function* cancelMyTicketSaga(
  action: PayloadAction<ITicket>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/my-tickets/${action.payload.id}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      yield put(cancelMyTicketSuccess(action.payload.id));
      yield put(getMyTicketsRequest());
      setTimeout(() => {
        toast.success("Ticket cancelled successfully");
      }, 500);

      // If the ticket release has allocated tickets, we need to update the
      // ticket release to reflect the fact that a ticket has been cancelled
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(cancelMyTicketFailure(errorMessage));
    }
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(cancelMyTicketFailure(errorMessage));
  }
}

function* watchTicketsSaga() {
  yield takeEvery(cancelMyTicketStart.type, cancelMyTicketSaga);
  yield takeLatest(getMyTicketsRequest.type, getMyTicketSaga);
}

export default watchTicketsSaga;
