import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPromoCodeAccessFailure,
  getPromoCodeAccessRequest,
  getPromoCodeAccessSuccess,
} from "../features/promoCodeAccessSlice";
import { toast } from "react-toastify";
import { IGuestCustomer } from "../../types";

const promoCodeAccessSaga = function* (
  action: PayloadAction<{
    eventId: number;
    promo_code: string;
    isGuestCustomer?: boolean;
    guestCustomer?: IGuestCustomer;
  }>
): Generator<any, void, any> {
  try {
    // if guest: /guest-customer/:ugkthid/activate-promo-code/:eventID
    // if not guest: /activate-promo-code/:eventID

    const { eventId, promo_code, isGuestCustomer, guestCustomer } =
      action.payload;

    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.user_id}/activate-promo-code/${eventId}?promo_code=${promo_code}&request_token=${guestCustomer?.request_token}`
        : `/activate-promo-code/${eventId}?promo_code=${promo_code}`);

    const response = yield call(axios.get, url, {
      withCredentials: !isGuestCustomer,
    });

    if (response.status === 200) {
      yield put(getPromoCodeAccessSuccess(response.data));
    } else {
      console.warn(response.data);
      yield put(getPromoCodeAccessFailure(response.data));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    yield put(getPromoCodeAccessFailure(errorMessage));
  }
};

export default function* watchPromoCodeAccessSaga() {
  yield takeEvery(getPromoCodeAccessRequest.type, promoCodeAccessSaga);
}
