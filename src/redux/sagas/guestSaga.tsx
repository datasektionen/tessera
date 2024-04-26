import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getGuestCustomerFailure,
  getGuestCustomerRequest,
  getGuestCustomerSuccess,
} from "../features/guestCustomerSlice";

import { toast } from "react-toastify";
import {
  IAddon,
  IEvent,
  IEventFormField,
  IEventFormFieldResponse,
  IGuestCustomer,
  ITicket,
  ITicketAddon,
  ITicketRelease,
  ITicketRequest,
  ITicketType,
} from "../../types";

function* getGuestSaga(
  action: PayloadAction<{
    ugkthid: string;
    request_token: string;
  }>
): Generator<any, void, any> {
  try {
    const { ugkthid, request_token } = action.payload;

    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/guest-customer/${ugkthid}?request_token=${request_token}`
    );

    const user = response.data.user;

    if (user.ticket_requests.length > 1) {
      toast.error("An unexpected error occurred, contact support");
      yield put(
        getGuestCustomerFailure("An unexpected error occurred, contact support")
      );
      return;
    }

    const ticket_request = user.ticket_requests[0];
    const ticket = ticket_request.is_handled ? ticket_request.tickets[0] : null;

    const ticketRequestData = {
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
      event_form_responses: ticket_request.event_form_responses?.map(
        (form_response: any) => {
          return {
            id: form_response.ID!,
            ticket_request_id: form_response.ticket_request_id!,
            event_form_field_id: form_response.event_form_field_id!,
            value: form_response.value!,
            updated_at: new Date(form_response.UpdatedAt!).getTime(),
          };
        }
      ) as IEventFormFieldResponse[],
      ticket_release_id: ticket_request.ticket_release_id!,
      ticket_release: {
        id: ticket_request.ticket_release.ID!,
        eventId: ticket_request.ticket_release.event_id!,
        event: {
          id: ticket_request.ticket_release.event.ID!,
          name: ticket_request.ticket_release.event.name!,
          date: new Date(ticket_request.ticket_release.event.date!).getTime(),
          form_field_description:
            ticket_request.ticket_release.event.form_field_description!,
          form_fields: ticket_request.ticket_release.event.form_fields?.map(
            (form_field: any) => {
              return {
                id: form_field.ID!,
                name: form_field.name!,
                type: form_field.type!,
                is_required: form_field.is_required!,
                description: form_field.description!,
              } as IEventFormField;
            }
          ),
        } as IEvent,
        name: ticket_request.ticket_release.name!,
        description: ticket_request.ticket_release.description!,
        open: new Date(ticket_request.ticket_release.open!).getTime(),
        close: new Date(ticket_request.ticket_release.close!).getTime(),
        has_allocated_tickets:
          ticket_request.ticket_release.has_allocated_tickets,
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
      } as ITicketRelease,
      deleted_at: ticket_request.DeletedAt,
      ticket_add_ons: ticket_request.ticket_add_ons?.map((addon: any) => {
        return {
          id: addon.ID!,
          ticket_request_id: addon.ticket_request_id!,
          add_on_id: addon.add_on_id!,
          quantity: addon.quantity!,
        };
      }) as ITicketAddon[],
    } as ITicketRequest;

    const guest: IGuestCustomer = {
      ug_kth_id: user.ug_kth_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      request_token: request_token,
      role: {
        id: user.role.ID,
        name: user.role.name,
      },
      ticket: ticket
        ? ({
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
            ticket_request: ticketRequestData,
          } as ITicket)
        : undefined,
      ticket_request: ticketRequestData,
    };

    yield put(getGuestCustomerSuccess(guest));
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getGuestCustomerFailure(error));
  }
}

export function* watchGuestSaga() {
  yield takeLatest(getGuestCustomerRequest.type, getGuestSaga);
}
