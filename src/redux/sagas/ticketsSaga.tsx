import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
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
import { ApiResponse, fetchApi } from "../../utils/api/fetch_api";

function* getMyTicketSaga(): Generator<any, void, any> {
  try {
    const url = process.env.REACT_APP_BACKEND_URL + "/my-tickets";

    const response: ApiResponse<{ tickets: ITicket[] }> = yield call(
      fetchApi,
      url,
      true,
      true
    );

    if (response.status === "success") {
      yield put(getMyTicketsSuccess(response.data.tickets));
    } else {
      const errorMessage = response.message || "An error occurred";
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
