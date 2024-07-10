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

    const guest: IGuestCustomer = {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      request_token: request_token,
      roles: user.roles,
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
