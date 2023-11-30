import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/authSlice";
import { LoginCredentials } from "../../types";
import { currentUserRequest } from "../features/userSlice";
import Cookies from "js-cookie";

function* userSaga(): Generator<any, void, any> {
  try {
    console.log(Cookies.get("auth_token"));

    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/current-user`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    console.log("response", response);

    const user = response.data;

    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* watchUserSaga() {
  yield takeLatest(currentUserRequest.type, userSaga);
}

export default watchUserSaga;
