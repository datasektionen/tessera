import {
  LoginCredentials,
  LoginFailureAction,
  LoginRequestAction,
  LoginSuccessAction,
} from "../../types";

export const loginRequest = (
  credentials: LoginCredentials
): LoginRequestAction => ({
  type: "LOGIN_REQUEST",
  payload: credentials,
});

export const loginSuccess = (
  token: string,
  userRole: string
): LoginSuccessAction => ({
  type: "LOGIN_SUCCESS",
  payload: { token, userRole },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
