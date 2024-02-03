// signupSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILoginFormValues, ISignupFormValues } from "../../types";
import {
  externalLoginFailure,
  externalLoginRequest,
  externalSignupFailure,
  externalSignupRequest,
  externalSignupSuccess,
} from "../features/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { ROUTES } from "../../routes/def";

function* externalSignupSaga(
  action: PayloadAction<ISignupFormValues>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/external/signup`;
    const response = yield call(axios.post, url, action.payload, {
      withCredentials: true,
    });

    if (response.status === 201) {
      yield put(externalSignupSuccess());
      setTimeout(() => {
        toast.success("Signup successful!");
      }, 500);
    } else {
      const errorMessage = response.data.error || "Something went wrong!";
      toast.error(errorMessage);

      yield put(externalSignupFailure(response.data.error));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "Something went wrong!";
    toast.error(errorMessage);
    yield put(externalLoginFailure(error.message));
  }
}

function* externalLoginSaga(
  action: PayloadAction<ILoginFormValues>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/external/login`;
    const response = yield call(axios.post, url, action.payload, {
      withCredentials: true,
    });

    if (response.status === 200) {
      yield put(externalSignupSuccess());
      window.location.href = ROUTES.HANDLE_LOGIN_CALLBACK;
    } else {
      const errorMessage = response.data.error || "Something went wrong!";
      toast.error(errorMessage);
      yield put(externalSignupFailure(response.data.error));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "Something went wrong!";
    toast.error(errorMessage);
    yield put(externalLoginFailure(error.message));
  }
}

export default function* watchExternalAuthSagas() {
  yield takeLatest(externalSignupRequest.type, externalSignupSaga);
  yield takeLatest(externalLoginRequest.type, externalLoginSaga);
}
