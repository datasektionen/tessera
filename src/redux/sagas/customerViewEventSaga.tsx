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

import { toast } from "react-toastify";

import { setTimestamp } from "../features/serverTimestampSlice";
import {
  getCustomerEventFailure,
  getCustomerEventRequest,
  getCustomerEventSuccess,
} from "../features/customerViewEvent";
import { ApiResponse, fetchApi } from "../../utils/api/api";

function* eventSaga(
  action: PayloadAction<{
    refID: string;
    secretToken: string;
    countSiteVisit?: boolean;
    promoCodes?: string[];
  }>
): Generator<any, void, any> {
  try {
    const { refID, secretToken } = action.payload;
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
      process.env.REACT_APP_BACKEND_URL + "/view/events/" + refID + queryString;

    const response: ApiResponse<{
      event: IEvent;
      timestamp: number;
    }> = yield call(fetchApi, url, true, true);

    if (response.status === "success") {
      yield put(getCustomerEventSuccess(response.data.event));

      yield put(
        setTimestamp(new Date(response.data.timestamp * 1000).getTime())
      );
    } else {
      yield put(
        getCustomerEventFailure({
          error: response.message || "An error occurred",
          errorStatusCode: 404,
        })
      );
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    yield put(
      getCustomerEventFailure({
        error: errorMessage,
        errorStatusCode: error.response.status,
      })
    );
  }
}

function* watchViewCustomerEventSaga() {
  yield takeLatest(getCustomerEventRequest.type, eventSaga);
}

export default watchViewCustomerEventSaga;
