import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { IEvent, LoginCredentials } from "../../types";
import {
  getEventFailure,
  getEventRequest,
  getEventSuccess,
} from "../features/eventSlice";

function* eventSaga(action: PayloadAction<number>): Generator<any, void, any> {
  try {
    console.log("eventSaga");
    const response = yield call(
      axios.get,
      "http://localhost:8080/events/" + action.payload,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const eventData = response.data.event;
    console.log(response.data);

    const event: IEvent = {
      createdAt: new Date(eventData.CreatedAt!),
      name: eventData.name!,
      description: eventData.description!,
      location: eventData.location!,
      date: new Date(eventData.date!),
      organizationId: eventData.organization_id!,
    };

    console.log(event);

    yield put(getEventSuccess(event));
  } catch (error: any) {
    yield put(getEventFailure(error.message));
  }
}

function* watchEventSaga() {
  yield takeLatest(getEventRequest.type, eventSaga);
}

export default watchEventSaga;
