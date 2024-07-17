import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { IEvent } from "../../../types";
import {
  getNetworkEventsFailure,
  getNetworkEventsRequest,
  getNetworkEventsSuccess,
} from "../../features/manager/listNetworkEventsSlice";
import { compareDesc } from "date-fns";

function* listNetworkEventSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      process.env.REACT_APP_BACKEND_URL + "/manager/events",
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.data === null) {
      yield put(getNetworkEventsSuccess([]));
      return;
    }

    const events: IEvent[] = response.data
      .map((event: any) => {
        return {
          id: event.ID!,
          reference_id: event.reference_id!,
          createdAt: event.CreatedAt!,
          name: event.name!,
          description: event.description!,
          location: event.location!,
          date: event.date!,
          end_date: event.end_date || null,
          organization_id: event.organization_id!,
          created_by: event.created_by!,
          is_private: event.is_private!,
        } as IEvent;
      })
      .sort((a: IEvent, b: IEvent) => {
        return compareDesc(new Date(b.date), new Date(a.date));
      });

    yield put(getNetworkEventsSuccess(events));
  } catch (error: any) {
    const errorMessage =
      error.responpse.data.error || error.message || "An error occurred";
    yield put(getNetworkEventsFailure(errorMessage));
  }
}

function* watchListNetworkEventSaga() {
  yield takeLatest(getNetworkEventsRequest.type, listNetworkEventSaga);
}

export default watchListNetworkEventSaga;
