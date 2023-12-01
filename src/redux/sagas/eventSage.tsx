import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";
import { IEvent, LoginCredentials } from "../../types";
import {
  getEventsFailure,
  getEventsRequest,
  getEventsSuccess,
} from "../features/eventsSlice";

function* eventSaga(): Generator<any, void, any> {
  try {
    console.log("eventSaga");
    const response = yield call(axios.get, "http://localhost:8080/events", {
      withCredentials: true, // This ensures cookies are sent with the request
    });

    const events: IEvent[] = response.data.map((event: any) => {
      return {
        createdAt: event.CreatedAt!,
        name: event.name!,
        description: event.description!,
        location: event.location!,
        date: event.date!,
        organizationId: event.organization_id!,
      };
    });

    yield put(getEventsSuccess(events));
  } catch (error: any) {
    yield put(getEventsFailure(error.message));
  }
}

function* watchEventSaga() {
  yield takeLatest(getEventsRequest.type, eventSaga);
}

export default watchEventSaga;
