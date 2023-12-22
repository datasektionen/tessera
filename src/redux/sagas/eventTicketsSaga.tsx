import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchEventTicketsStart,
  fetchEventTicketsSuccess,
  fetchEventTicketsFailure,
} from "../features/eventTicketsSlice";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IEvent,
  ITicket,
  ITicketRelease,
  ITicketRequest,
  ITicketType,
  ITransaction,
  IUser,
  IUserFoodPreference,
} from "../../types";
import { format } from "date-fns";

function* fetchEventTickets(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/events/${action.payload}/tickets`,
      {
        withCredentials: true,
      }
    );

    console.log(response.data.tickets);

    const tickets: ITicket[] = response.data.tickets.map((ticket: any) => {
      const ticket_request = ticket.ticket_request;
      return {
        id: ticket.ID!,
        is_paid: ticket.is_paid!,
        is_reserve: ticket.is_reserve!,
        refunded: ticket.refunded!,
        user_id: ticket.user_id!,
        created_at: new Date(ticket.CreatedAt!).getTime(),
        user: {
          ug_kth_id: ticket.user.ug_kth_id!,
          id: ticket.user.ID!,
          email: ticket.user.email!,
          username: ticket.user.username!,
          first_name: ticket.user.first_name!,
          last_name: ticket.user.last_name!,
          food_preferences: {
            gluten_intolerant: ticket.user.food_preferences.gluten_intolerant!,
            lactose_intolerant:
              ticket.user.food_preferences.lactose_intolerant!,
            vegetarian: ticket.user.food_preferences.vegetarian!,
            vegan: ticket.user.food_preferences.vegan!,
            nut_allergy: ticket.user.food_preferences.nut_allergy!,
            shellfish_allergy: ticket.user.food_preferences.shellfish_allergy!,
            kosher: ticket.user.food_preferences.kosher!,
            halal: ticket.user.food_preferences.halal!,
            additional: ticket.user.food_preferences.additional_info!,
          } as IUserFoodPreference,
        } as IUser,
        transaction: {
          id: ticket.transaction.ID!,
          ticket_id: ticket.transaction.ticket_id!,
          amount: ticket.transaction.amount!,
          currency: ticket.transaction.currency!,
          payed_at: new Date(ticket.transaction.payed_at! * 1000).getTime(),
          refunded: ticket.transaction.refunded!,
          refunded_at: ticket.transaction.refunded_at || null,
        } as ITransaction,
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

    yield put(fetchEventTicketsSuccess(tickets));
  } catch (error: any) {
    yield put(fetchEventTicketsFailure(error.message));
  }
}

function* watchAllocateTicketsSaga() {
  yield takeLatest(fetchEventTicketsStart.type, fetchEventTickets);
}

export default watchAllocateTicketsSaga;
