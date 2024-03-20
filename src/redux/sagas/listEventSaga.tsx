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
} from "../features/listEventsSlice";

function* listEventSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      process.env.REACT_APP_BACKEND_URL + "/events",
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.data === null) {
      yield put(getEventsSuccess([]));
      return;
    }

    const events: IEvent[] = response.data
      .map((event: any) => {
        return {
          id: event.ID!,
          createdAt: event.CreatedAt!,
          name: event.name!,
          description: event.description!,
          location: event.location!,
          date: event.date!,
          end_date: event.end_date || null,
          organizationId: event.organization_id!,
          createdById: event.created_by!,
          is_private: event.is_private!,
        } as IEvent;
      })
      .sort((a: IEvent, b: IEvent) => {
        return b.date - a.date;
      });

    yield put(getEventsSuccess(events));
  } catch (error: any) {
    yield put(getEventsFailure(error.message));
  }
}

function* watchListEventSaga() {
  yield takeLatest(getEventsRequest.type, listEventSaga);
}

export default watchListEventSaga;
