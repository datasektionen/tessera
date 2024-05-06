import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { IEvent, INetwork } from "../../../types";
import {
  getNetworkEventsFailure,
  getNetworkEventsRequest,
} from "../../features/manager/listNetworkEventsSlice";
import { getNetworkSuccess } from "../../features/manager/networkSlice";

function fetchNetworkApi(): Promise<AxiosResponse<INetwork>> {
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/manager/network`, {
    withCredentials: true,
  });
}

function* getNetworkSaga(): Generator<any, void, any> {
  try {
    const response: AxiosResponse<INetwork> = yield call(fetchNetworkApi);

    yield put(getNetworkSuccess(response.data));
  } catch (error: any) {
    const errorMessage =
      error.responpse.data.error || error.message || "An error occurred";
    yield put(getNetworkEventsFailure(errorMessage));
  }
}

function* watchNetworkSaga() {
  yield takeLatest(getNetworkEventsRequest.type, getNetworkSaga);
}

export default watchNetworkSaga;
