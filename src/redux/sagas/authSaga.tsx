import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutRequest,
} from "../features/authSlice";
import { LoginCredentials } from "../../types";
import { toast } from "react-toastify";

function* loginSaga(): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/login?auto_redirect=true`;
    console.log("url", url);
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/login?auto_redirect=true`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (process.env.NODE_ENV === "development") {
      const redirectUrl = response.data.login_url;

      console.log(redirectUrl);
      // Redirect to the login page
      window.location.href = redirectUrl;
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/logout`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status !== 200) {
      toast.error("Something went wrong!");
      yield put(logoutFailure("Something went wrong!"));
    } else {
      toast.info("Logged out!");
      yield put(loginSuccess({ token: "" }));
      window.location.href = "/";
    }

    // Redirect to the login page
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(logoutFailure(error.message));
  }
}

function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}

export default watchLoginSaga;
