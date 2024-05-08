import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { IEvent, INetwork } from "../../../types";

import {
  getNetworkFailure,
  getNetworkRequest,
  getNetworkSuccess,
} from "../../features/manager/networkSlice";
import { fetchApi } from "../../../utils/api/fetch_api";

function* getNetworkSaga(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<INetwork> = yield call(
      fetchApi,
      "/manager/network"
    );

    console.log(response.data);

    yield put(getNetworkSuccess(response.data));
  } catch (error: any) {
    const errorMessage =
      error.response.data.error || error.message || "An error occurred";
    yield put(getNetworkFailure(errorMessage));
  }
}

function* watchNetworkSaga() {
  yield takeLatest(getNetworkRequest.type, getNetworkSaga);
}

export default watchNetworkSaga;
