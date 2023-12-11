import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

const promoCodeAccessSaga = function* (
  action: PayloadAction<{
    eventId: number;
    promoCode: string;
  }>
): Generator<any, void, any> {
  try {
    const { eventId } = action.payload;
    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_API_URL}/unlock-ticket-release${eventId}?promo_code=${promoCode}`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      yield put({
        type: "GET_PROMO_CODE_ACCESS_SUCCESS",
      });
    }

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
