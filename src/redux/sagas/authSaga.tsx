import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";
import { LoginCredentials } from "../../types";

function* loginSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/login?auto_redirect=false`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const redirectUrl = response.data.login_url;

    // Redirect to the login page
    window.location.href = redirectUrl;
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}

export default watchLoginSaga;
