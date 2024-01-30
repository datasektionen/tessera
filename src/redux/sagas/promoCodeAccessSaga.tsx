import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPromoCodeAccessFailure,
  getPromoCodeAccessRequest,
  getPromoCodeAccessSuccess,
} from "../features/promoCodeAccessSlice";
import { toast } from "react-toastify";

const promoCodeAccessSaga = function* (
  action: PayloadAction<{
    eventId: number;
    promo_code: string;
  }>
): Generator<any, void, any> {
  try {
    const { eventId, promo_code } = action.payload;
    const url: string = `${process.env.REACT_APP_BACKEND_URL}/activate-promo-code/${eventId}?promo_code=${promo_code}`;
    const response = yield call(axios.get, url, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Promo code applied successfully");
      }, 300);
      yield put(getPromoCodeAccessSuccess(response.data));
    } else {
      toast.error(response.data.message);
      yield put(getPromoCodeAccessFailure(response.data));
    }
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getPromoCodeAccessFailure(error));
  }
};

export default function* watchPromoCodeAccessSaga() {
  yield takeEvery(getPromoCodeAccessRequest.type, promoCodeAccessSaga);
}
