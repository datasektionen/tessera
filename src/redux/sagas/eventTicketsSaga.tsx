import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchEventTicketsStart,
  fetchEventTicketsSuccess,
  fetchEventTicketsFailure,
} from "../features/eventTicketsSlice";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddon,
  IEvent,
  IEventFormField,
  IEventFormFieldResponse,
  ITicket,
  ITicketAddon,
  ITicketRelease,
  ITicketReleaseMethodDetail,
  ITicketReleasePaymentDeadline,
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

    const tickets: ITicket[] = response.data.tickets.map((ticket: any) => {
      const ticket_request = ticket.ticket_request;
      return {
        id: ticket.ID!,
        is_paid: ticket.is_paid!,
        is_reserve: ticket.is_reserve!,
        refunded: ticket.refunded!,
        user_id: ticket.user_id!,
        created_at: new Date(ticket.CreatedAt!).getTime(),
        qr_code: ticket.qr_code!,
        checked_in: ticket.checked_in!,
        user: {
          ug_kth_id: ticket.user.ug_kth_id!,
          id: ticket.user.ID!,
          email: ticket.user.email!,
          username: ticket.user.username!,
          first_name: ticket.user.first_name!,
          last_name: ticket.user.last_name!,
          is_external: ticket.user.is_external || false,
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
            prefer_meat: ticket.user.food_preferences.prefer_meat!,
          } as IUserFoodPreference,
        } as IUser,
        transaction:
          !!ticket.transaction &&
          ({
            id: ticket.transaction.ID!,
            ticket_id: ticket.transaction.ticket_id!,
            amount: ticket.transaction.amount!,
            currency: ticket.transaction.currency!,
            payed_at: new Date(ticket.transaction.payed_at! * 1000).getTime(),
            refunded: ticket.transaction.refunded!,
            refunded_at: ticket.transaction.refunded_at || null,
          } as ITransaction),
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
          event_form_responses: ticket_request.event_form_responses.map(
            (response: any) => {
              return {
                id: response.ID!,
                ticket_request_id: response.ticket_request_id!,
                event_form_field_id: response.event_form_field_id!,
                event_form_field: {
                  id: response.event_form_field.ID!,
                  name: response.event_form_field.name!,
                  description: response.event_form_field.description!,
                  is_required: response.event_form_field.is_required!,
                  type: response.event_form_field.type!,
                } as IEventFormField,
                value: response.value!,
                updated_at: new Date(response.UpdatedAt!).getTime(),
              } as IEventFormFieldResponse;
            }
          ),
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
            payment_deadline: {
              id: ticket_request.ticket_release.payment_deadline.ID!,
              ticket_release_id:
                ticket_request.ticket_release.payment_deadline
                  .ticket_release_id!,
              original_deadline: new Date(
                ticket_request.ticket_release.payment_deadline.original_deadline!
              ),
              reserve_payment_duration:
                ticket_request.ticket_release.payment_deadline
                  .reserve_payment_duration!,
            } as ITicketReleasePaymentDeadline,
            open: new Date(
              ticket_request.ticket_release.open! * 1000
            ).getTime(),
            close: new Date(
              ticket_request.ticket_release.close! * 1000
            ).getTime(),
            allow_external: ticket_request.ticket_release.allow_external!,
            has_allocated_tickets:
              ticket_request.ticket_release.has_allocated_tickets,
            ticketReleaseMethodDetail: {
              id: ticket_request.ticket_release.ticket_release_method_detail
                .ID!,
              openWindowDuration:
                ticket_request.ticket_release.ticket_release_method_detail
                  .open_window_duration! / 60,
              method_description:
                ticket_request.ticket_release.method_description!,
            } as ITicketReleaseMethodDetail,
          } as ITicketRelease,
          ticket_add_ons: ticket_request.ticket_add_ons?.map((addon: any) => {
            return {
              id: addon.ID!,
              ticket_request_id: addon.ticket_request_id!,
              add_on_id: addon.add_on_id!,
              quantity: addon.quantity!,
              add_on: {
                id: addon.add_on.ID!,
                name: addon.add_on.name!,
                description: addon.add_on.description!,
                price: addon.add_on.price!,
                max_quantity: addon.add_on.max_quantity!,
                contains_alcohol: addon.add_on.contains_alcohol!,
                is_enabled: addon.add_on.is_enabled!,
              } as IAddon,
            };
          }) as ITicketAddon[],
        } as ITicketRequest,
        deleted_at: new Date(ticket.DeletedAt!).getTime(),
        updated_at: new Date(ticket.UpdatedAt!).getTime(),
        purchasable_at:
          ticket.purchasable_at !== null
            ? new Date(ticket.purchasable_at!).getTime()
            : null,
      } as ITicket;
    });

    const ticketRequests: ITicket[] = response.data.ticket_requests.map(
      (ticketRequest: any) => {
        return {
          id: ticketRequest.ID!,
          is_paid: false,
          is_reserve: false,
          refunded: false,
          user_id: ticketRequest.user_id!,
          created_at: new Date().getTime(),
          user: {
            ug_kth_id: ticketRequest.user.ug_kth_id!,
            id: ticketRequest.user.ID!,
            email: ticketRequest.user.email!,
            username: ticketRequest.user.username!,
            first_name: ticketRequest.user.first_name!,
            last_name: ticketRequest.user.last_name!,
            is_external: ticketRequest.user.is_external || false,
            food_preferences: {
              gluten_intolerant:
                ticketRequest.user.food_preferences.gluten_intolerant!,
              lactose_intolerant:
                ticketRequest.user.food_preferences.lactose_intolerant!,
              vegetarian: ticketRequest.user.food_preferences.vegetarian!,
              vegan: ticketRequest.user.food_preferences.vegan!,
              nut_allergy: ticketRequest.user.food_preferences.nut_allergy!,
              shellfish_allergy:
                ticketRequest.user.food_preferences.shellfish_allergy!,
              kosher: ticketRequest.user.food_preferences.kosher!,
              halal: ticketRequest.user.food_preferences.halal!,
              prefer_meat: ticketRequest.user.food_preferences.prefer_meat!,
              additional: ticketRequest.user.food_preferences.additional_info!,
            } as IUserFoodPreference,
          } as IUser,
          ticket_request: {
            id: ticketRequest.ID!,
            created_at: new Date(ticketRequest.CreatedAt!).getTime(),
            is_handled: ticketRequest.is_handled!,
            ticket_amount: ticketRequest.ticket_amount!,
            ticket_type_id: ticketRequest.ticket_type_id!,
            event_form_responses: ticketRequest.event_form_responses.map(
              (response: any) => {
                return {
                  id: response.ID!,
                  ticket_request_id: response.ticket_request_id!,
                  event_form_field_id: response.event_form_field_id!,
                  event_form_field: {
                    id: response.event_form_field.ID!,
                    name: response.event_form_field.name!,
                    description: response.event_form_field.description!,
                    is_required: response.event_form_field.is_required!,
                    type: response.event_form_field.type!,
                  } as IEventFormField,
                  value: response.value!,
                  updated_at: new Date(response.UpdatedAt!).getTime(),
                } as IEventFormFieldResponse;
              }
            ),
            ticket_type: {
              id: ticketRequest.ticket_type.ID!,
              name: ticketRequest.ticket_type.name!,
              description: ticketRequest.ticket_type.description!,
              price: ticketRequest.ticket_type.price!,
              isReserved: ticketRequest.ticket_type.is_reserved!,
            } as ITicketType,
            ticket_release_id: ticketRequest.ticket_release_id!,
            ticket_release: {
              id: ticketRequest.ticket_release.ID!,
              eventId: ticketRequest.ticket_release.event_id!,
              event: {
                id: ticketRequest.ticket_release.event.ID!,
                name: ticketRequest.ticket_release.event.name!,
                date: new Date(
                  ticketRequest.ticket_release.event.date!
                ).getTime(),
              } as IEvent,
              name: ticketRequest.ticket_release.name!,
              description: ticketRequest.ticket_release.description!,
              open: new Date(
                ticketRequest.ticket_release.open! * 1000
              ).getTime(),
              close: new Date(
                ticketRequest.ticket_release.close! * 1000
              ).getTime(),
              has_allocated_tickets:
                ticketRequest.ticket_release.has_allocated_tickets,
              ticketReleaseMethodDetail: {
                id: ticketRequest.ticket_release.ticket_release_method_detail
                  .ID!,
                openWindowDuration:
                  ticketRequest.ticket_release.ticket_release_method_detail
                    .open_window_duration! / 60,
              } as ITicketReleaseMethodDetail,
            } as ITicketRelease,
            deleted_at: new Date(ticketRequest.DeletedAt!).getTime(),
            updated_at: new Date(ticketRequest.UpdatedAt!).getTime(),
            ticket_add_ons: ticketRequest.ticket_add_ons?.map((addon: any) => {
              return {
                id: addon.ID!,
                ticket_request_id: addon.ticket_request_id!,
                add_on_id: addon.add_on_id!,
                quantity: addon.quantity!,
                add_on: {
                  id: addon.add_on.ID!,
                  name: addon.add_on.name!,
                  description: addon.add_on.description!,
                  price: addon.add_on.price!,
                  max_quantity: addon.add_on.max_quantity!,
                  contains_alcohol: addon.add_on.contains_alcohol!,
                  is_enabled: addon.add_on.is_enabled!,
                } as IAddon,
              };
            }) as ITicketAddon[],
          } as ITicketRequest,
        } as ITicket;
      }
    );

    tickets.push(...ticketRequests);

    yield put(fetchEventTicketsSuccess(tickets));
  } catch (error: any) {
    console.error("Error fetching event tickets:", error);
    yield put(fetchEventTicketsFailure(error.message));
  }
}

function* watchAllocateTicketsSaga() {
  yield takeLatest(fetchEventTicketsStart.type, fetchEventTickets);
}

export default watchAllocateTicketsSaga;
