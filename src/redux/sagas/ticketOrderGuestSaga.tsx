import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TicketRequestData } from "./ticketOrderSaga";
import {
  IGuestCustomer,
  ISelectedAddon,
  TicketRequestPostReq,
} from "../../types";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { toast } from "react-toastify";
import { customerSignupSuccess } from "../features/authSlice";
import {
  createGuestTicketOrderFailure,
  createGuestTicketOrderRequest,
  createGuestTicketOrderSuccess,
  setGuestCustomer,
} from "../features/guestCustomerSlice";
import { getPromoCodeAccessRequest } from "../features/promoCodeAccessSlice";

function* createTicketRequestSaga(
  action: PayloadAction<{
    promoCodes: string[];
    tickets: TicketRequestData[];
    addons: ISelectedAddon[];
    eventId: number;
    ticketReleaseId: number;
    guestCustomer: IGuestCustomer;
  }>
): Generator<any, void, any> {
  try {
    const {
      tickets,
      eventId,
      ticketReleaseId,
      addons,
      guestCustomer,
      promoCodes,
    } = action.payload;

    const promoCodeRequests = promoCodes.map((promoCode) => {
      return put(
        getPromoCodeAccessRequest({
          eventId: eventId,
          promo_code: promoCode,
          isGuestCustomer: true,
          guestCustomer: guestCustomer,
        })
      );
    });

    yield all(promoCodeRequests);

    const ticket_body: TicketRequestPostReq[] = tickets.map((ticket) => {
      return {
        ticket_amount: ticket.ticket_amount,
        ticket_type_id: ticket.ticket_type_id,
        ticket_release_id: ticketReleaseId,
      };
    });

    if (!guestCustomer.request_token) {
      toast.error("Session expired, please refresh the page and try again");
      return;
    }

    const body = {
      ticket_requests: ticket_body,
      selected_add_ons: addons,
      request_token: guestCustomer.request_token!,
    };

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/guest-customer/${guestCustomer.user_id}/events/${eventId}/guest-customer/ticket-requests`,
      body,
      {
        withCredentials: false, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 201) {
      toast.success("Ticket request successful!");
      yield put(createGuestTicketOrderSuccess());
      yield put(
        setGuestCustomer({
          ...guestCustomer,
        })
      );
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(createGuestTicketOrderFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(createGuestTicketOrderFailure(errorMessage));
  }
}

export function* watchGuestCustomerCreateTicketRequestSaga() {
  yield takeLatest(createGuestTicketOrderRequest.type, createTicketRequestSaga);
}
