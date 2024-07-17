import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEventTicketsStart,
  fetchEventTicketsSuccess,
  fetchEventTicketsFailure,
} from "../features/eventTicketsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITicket, ITicketOrder, IUser, IUserFoodPreference } from "../../types";
import { ApiResponse, fetchApi } from "../../utils/api/api";

function* fetchEventTickets(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/events/${action.payload}/tickets`;

    const response: ApiResponse<{
      tickets: ITicket[];
    }> = yield call(fetchApi, url, true, true);

    if (response.status === "success") {
      yield put(fetchEventTicketsSuccess(response.data.tickets));
    } else {
      yield put(fetchEventTicketsFailure(response.message));
    }
  } catch (error: any) {
    console.error("Error fetching event tickets:", error);
    yield put(fetchEventTicketsFailure(error.message));
  }
}

function* watchAllocateTicketsSaga() {
  yield takeLatest(fetchEventTicketsStart.type, fetchEventTickets);
}

export default watchAllocateTicketsSaga;
