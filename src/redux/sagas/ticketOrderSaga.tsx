import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import { IGuestCustomer, ISelectedAddon, ITicketOrder } from "../../types";

import { toast } from "react-toastify";

import { getPromoCodeAccessRequest } from "../features/promoCodeAccessSlice";
import {
  cancelTicketOrderFailure,
  cancelTicketOrderRequest,
  cancelTicketOrderSuccess,
  getMyTicketOrdersFailure,
  getMyTicketOrdersRequest,
  getMyTicketOrdersSuccess,
} from "../features/myTicketOrderSlice";
import { ApiResponse, fetchApi, postApi } from "../../utils/api/api";
import {
  postTicketOrderFailure,
  postTicketOrderRequest,
  postTicketOrderSuccess,
} from "../features/ticketOrderSlice";

export interface TicketRequestData {
  ticket_type_id: number;
  ticket_amount: number;
}

export interface ITicketOrderRequest {
  ticket_release_id: number;
  tickets: {
    ticket_type_id: number;
  }[];
}

function* createTicketRequestSaga(
  action: PayloadAction<{
    promoCodes: string[];
    tickeOrderReq: ITicketOrderRequest;
    addons: ISelectedAddon[];
    eventId: number;
  }>
): Generator<any, void, any> {
  try {
    const { tickeOrderReq, eventId, addons, promoCodes } = action.payload;

    const promoCodeRequests = promoCodes.map((promoCode) => {
      return put(
        getPromoCodeAccessRequest({
          eventId: eventId,
          promo_code: promoCode,
          isGuestCustomer: false,
        })
      );
    });

    yield all(promoCodeRequests);

    const body = {
      ticket_order: tickeOrderReq,
      selected_add_ons: addons,
    };

    const url = `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-orders`;

    const response: ApiResponse<{
      ticket_order: ITicketOrder;
    }> = yield call(postApi, url, body, true, true);

    if (response.status === "success") {
      yield put(getMyTicketOrdersRequest(null));

      yield put(postTicketOrderSuccess());
    } else {
      // check if status is 429

      const errorMessage = response.message || "An error occurred";
      toast.error(errorMessage);
      yield put(postTicketOrderFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    if (error.response.status !== 401) {
      toast.error(errorMessage);
    }
    yield put(postTicketOrderFailure(errorMessage));
  }
}

function* getMyTicketOrdersSaga(
  action: PayloadAction<number[] | null>
): Generator<any, void, any> {
  const ids = action.payload;

  const url = `${process.env.REACT_APP_BACKEND_URL}/my-ticket-orders`;

  const response: ApiResponse<{
    ticket_orders: ITicketOrder[];
  }> = yield call(fetchApi, url, true, true);

  const ticket_orders = response.data.ticket_orders;

  if (response.status === "success") {
    yield put(getMyTicketOrdersSuccess(ticket_orders));
  } else {
    const errorMessage = response.message;
    toast.error(errorMessage);
    yield put(getMyTicketOrdersFailure(errorMessage));
  }
}

function* cancelTicketOrderSaga(
  action: PayloadAction<{
    ticket_order: ITicketOrder;
    isGuestCustomer?: boolean;
    guestCustomer?: IGuestCustomer | null;
  }>
): Generator<any, void, any> {
  try {
    const { ticket_order, isGuestCustomer, guestCustomer } = action.payload;
    // if guest: /guest-customer/:ugkthid/ticket-requests/:ticketRequestID
    // if not guest: /events/:eventID/ticket-requests/:ticketRequestID

    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.user_id}/ticket-orders/${ticket_order.id}?request_token=${guestCustomer?.request_token}`
        : `/events/${ticket_order.ticket_release!.event!.id}/ticket-orders/${
            ticket_order.id
          }`);

    const response = yield call(axios.delete, url, {
      withCredentials: !isGuestCustomer,
    });

    if (response.status === 200) {
      toast.success("Ticket request cancelled!");
      yield put(cancelTicketOrderSuccess(ticket_order.id));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(cancelTicketOrderFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(cancelTicketOrderFailure(errorMessage));
  }
}

export function* myTicketOrderSaga() {}

function* watchTicketOrderSaga() {
  yield takeLatest(cancelTicketOrderRequest.type, cancelTicketOrderSaga);
  yield takeLatest(postTicketOrderRequest.type, createTicketRequestSaga);
  yield takeLatest(getMyTicketOrdersRequest.type, getMyTicketOrdersSaga);
}

export default watchTicketOrderSaga;
