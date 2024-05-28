import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  IAddon,
  IEvent,
  IGuestCustomer,
  ITicket,
  ITicketAddon,
  ITicketRelease,
  ITicketReleaseMethodDetail,
  ITicketReleasePaymentDeadline,
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
        deleted_reason: ticket.deleted_reason!,
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
            addons: ticket_request.ticket_release.add_ons?.map((addon: any) => {
              return {
                id: addon.ID!,
                name: addon.name!,
                description: addon.description!,
                price: addon.price!,
                max_quantity: addon.max_quantity!,
                contains_alcohol: addon.contains_alcohol!,
                is_enabled: addon.is_enabled!,
              } as IAddon;
            }) as IAddon[],
            payment_deadline:
              ticket_request.ticket_release.payment_deadline &&
              ({
                id: ticket_request.ticket_release.payment_deadline.ID!,
                ticket_release_id:
                  ticket_request.ticket_release.payment_deadline
                    .ticket_release_id!,
                original_deadline: new Date(
                  ticket_request.ticket_release.payment_deadline.original_deadline!
                ),
                reserve_payment_duration:
                  ticket_request.ticket_release.payment_deadline
                    .reserve_payment_duration!, // Nanoseconds, in go: time.Duration
              } as ITicketReleasePaymentDeadline),
          } as ITicketRelease,
          ticket_add_ons: ticket.ticket_add_ons?.map((addon: any) => {
            return {
              id: addon.ID!,
              ticket_request_id: addon.ticket_request_id!,
              add_on_id: addon.add_on_id!,
              quantity: addon.quantity!,
            };
          }) as ITicketAddon[],
        } as ITicketRequest,
        payment_deadline: ticket.payment_deadline
          ? new Date(ticket.payment_deadline!)
          : null,
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
    console.log(error);
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getMyTicketsFailure(errorMessage));
  }
}

function* cancelMyTicketSaga(
  action: PayloadAction<{
    ticket: ITicket;
    isGuestCustomer?: boolean;
    guestCustomer?: IGuestCustomer;
  }>
): Generator<any, void, any> {
  try {
    const { ticket, isGuestCustomer, guestCustomer } = action.payload;
    // if guest: /guest-customer/:ugkthid/my-tickets/:ticketID
    // if not guest: /my-tickets/:ticketID

    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.user_id}/my-tickets/${ticket.id}?request_token=${guestCustomer?.request_token}`
        : `/my-tickets/${ticket.id}`);

    const response = yield call(axios.delete, url, {
      withCredentials: !isGuestCustomer,
    });

    if (response.status === 200) {
      yield put(cancelMyTicketSuccess(ticket.id));
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
