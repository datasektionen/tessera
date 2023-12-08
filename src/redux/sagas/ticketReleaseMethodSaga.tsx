import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { ITicketReleaseMethod } from "../../types";
import axios from "axios";
import {
  getTicketReleaseMethodsFailure,
  getTicketReleaseMethodsRequest,
  getTicketReleaseMethodsSuccess,
} from "../features/ticketReleaseMethodsSlice";

function* fetchTicketReleaseMethods(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/ticket-release-methods`,
      {
        withCredentials: true,
      }
    );

    const ticketReleaseMethods: ITicketReleaseMethod[] = response.data.map(
      (ticketReleaseMethod: any) => {
        return {
          id: ticketReleaseMethod.ID!,
          name: ticketReleaseMethod.method_name!,
          description: ticketReleaseMethod.description!,
        };
      }
    );

    if (response.status === 200) {
      yield put(getTicketReleaseMethodsSuccess(ticketReleaseMethods));
    } else {
      yield put(getTicketReleaseMethodsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    yield put(getTicketReleaseMethodsFailure(error.message));
  }
}

export function* watchFetchTicketReleaseMethods() {
  yield takeLatest(
    getTicketReleaseMethodsRequest.type,
    fetchTicketReleaseMethods
  );
}
