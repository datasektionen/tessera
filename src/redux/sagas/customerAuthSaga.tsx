// signupSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  IGuestCustomer,
  ILoginFormValues,
  IRole,
  ISignupFormValues,
} from "../../types";
import {
  customerLoginFailure,
  customerLoginRequest,
  customerLoginSuccess,
  customerSignupFailure,
  customerSignupRequest,
  customerSignupSuccess,
  setSignupSuccess,
} from "../features/authSlice";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ROUTES } from "../../routes/def";
import ResendVerificationLinkToast from "../../components/toasts/ResendSignupVerificationEmail";
import { currentUserRequest } from "../features/userSlice";
import { getPromoCodeAccessRequest } from "../features/promoCodeAccessSlice";
import { ApiResponse, fetchApi, postApi } from "../../utils/api/api";

interface Response {
  request_token: string;
  user: IGuestCustomer;
}

function* customerSignupSaga(
  action: PayloadAction<ICustomerSignupValues>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/customer/signup`;
    // const response = yield call(axios.post, url, action.payload, {
    //   withCredentials: true,
    // });

    const response: ApiResponse<Response> = yield call(
      postApi,
      "/signup",
      action.payload,
      false
    );

    if (response.status === "success") {
      if (action.payload.is_saved) {
        yield put(customerSignupSuccess());
        yield put(setSignupSuccess());
      } else {
        const user: any = response.data.user;
        const guestCustomer: IGuestCustomer = {
          user_id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          roles: user.roles,
          request_token: response.data.request_token || "",
        };

        yield put(customerSignupSuccess(guestCustomer));
        yield put(setSignupSuccess());
      }

      if (action.payload.is_saved) {
        setTimeout(() => {
          toast.success(
            "Signup successful, please verify your email before logging in!"
          );
        }, 500);
      } else {
        setTimeout(() => {
          toast.info("Continuing as guest...");
        }, 500);
      }
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "Something went wrong!";
    toast.error(errorMessage);
    yield put(customerLoginFailure(error.message));
  }
}

function* customerLoginSaga(
  action: PayloadAction<ICustomerLoginValues>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/login`;
    const response = yield call(axios.post, url, action.payload, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Login successful!");
      }, 750);
      yield put(customerLoginSuccess(response.data));
      yield put(currentUserRequest());
    } else {
      const errorMessage = response.data.error || "Something went wrong!";
      toast.error(errorMessage);
      yield put(customerLoginFailure(response.data.error));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "Something went wrong!";
    if (errorMessage === "Email not verified") {
      toast.error(<ResendVerificationLinkToast email={action.payload.email} />);
    } else {
      toast.error(errorMessage);
    }

    yield put(customerLoginFailure(error.message));
  }
}

export default function* watchCustomerAuthSagas() {
  yield takeLatest(customerSignupRequest.type, customerSignupSaga);
  yield takeLatest(customerLoginRequest.type, customerLoginSaga);
}
