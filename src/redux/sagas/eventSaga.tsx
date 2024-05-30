import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddon,
  IEvent,
  IEventForm,
  IEventFormField,
  IEventPostReq,
  IOrganization,
  ITicketRelease,
  ITicketReleaseMethod,
  ITicketReleaseMethodDetail,
  ITicketReleasePaymentDeadline,
  ITicketType,
  LoginCredentials,
} from "../../types";
import {
  getEventFailure,
  getEventRequest,
  getEventSuccess,
} from "../features/eventSlice";
import { toast } from "react-toastify";
import {
  deleteEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  editEventFailure,
  editEventRequest,
  editEventSuccess,
} from "../features/editEventSlice";
import { setTimestamp } from "../features/serverTimestampSlice";
import ApiRoutes from "../../routes/backend_routes";
import { ApiResponse, fetchApi } from "../../utils/api/fetch_api";
import { parseISO } from "date-fns";

function* eventSaga(
  action: PayloadAction<{
    id: number;
    secretToken: string;
    countSiteVisit?: boolean;
    promoCodes?: string[];
  }>
): Generator<any, void, any> {
  try {
    const { id, secretToken } = action.payload;
    const queryParams = [];

    if (secretToken !== "") {
      queryParams.push("secret_token=" + secretToken);
    }

    if (!action.payload.countSiteVisit) {
      queryParams.push("dont_count_site_visit=true");
    }

    if (action.payload.promoCodes) {
      action.payload.promoCodes.forEach((promoCode: string) => {
        queryParams.push("promo_codes=" + promoCode);
      });
    }

    const queryString =
      queryParams.length > 0 ? "?" + queryParams.join("&") : "";

    const url =
      process.env.REACT_APP_BACKEND_URL + "/events/" + id + queryString;

    const response: ApiResponse<{
      event: IEvent;
    }> = yield call(fetchApi, url, true, true);

    const time_response: ApiResponse<{
      timestamp: number;
    }> = yield call(
      fetchApi,
      process.env.REACT_APP_BACKEND_URL + "/timestamp",
      true,
      true
    );

    yield put(getEventSuccess(response.data.event));
    yield put(
      setTimestamp(new Date(time_response.data.timestamp * 1000).getTime())
    );
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    yield put(
      getEventFailure({
        error: errorMessage,
        errorStatusCode: error.response.status,
      })
    );
  }
}

function* editEventSaga(
  action: PayloadAction<{
    id: number;
    event: IEventForm;
  }>
): Generator<any, void, any> {
  try {
    const { event, id } = action.payload;

    const data: IEventPostReq = {
      name: event.name,
      description: event.description,
      location: event.location!.label,
      date: event.date,
      end_date: event.end_date ? event.end_date : undefined,
      is_private: event.is_private,
      organization_id: event.organization_id,
      collect_food_preferences: event.collect_food_preferences,
    };

    const response = yield call(
      axios.put,
      process.env.REACT_APP_BACKEND_URL + "/events/" + id,
      data,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      toast.success("Event updated successfully!");
      yield put(editEventSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(editEventFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(editEventFailure(errorMessage));
  }
}

function* deleteEventSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT, {
        eventID: action.payload,
      }),
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      toast.success("Event deleted successfully!");
      yield put(deleteEventSuccess(response.data));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(deleteEventFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(deleteEventFailure(errorMessage));
  }
}

function* watchEventSaga() {
  yield takeLatest(deleteEventStart.type, deleteEventSaga);
  yield takeLatest(editEventRequest.type, editEventSaga);
  yield takeLatest(getEventRequest.type, eventSaga);
}

export default watchEventSaga;
