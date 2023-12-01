import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";
import { LoginCredentials } from "../../types";
import {
  currentUserFailure,
  currentUserRequest,
  currentUserSuccess,
} from "../features/userSlice";
import Cookies from "js-cookie";

function* userSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/current-user`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const user = response.data.user;

    // Yield both currentUserSuccess and loginSuccess
    yield put(currentUserSuccess(user));
    yield put(loginSuccess({ token: Cookies.get("auth_token") as string }));
  } catch (error: any) {
    yield put(currentUserFailure(error.message));
  }
}

function* watchUserSaga() {
  yield takeLatest(currentUserRequest.type, userSaga);
}

export default watchUserSaga;
