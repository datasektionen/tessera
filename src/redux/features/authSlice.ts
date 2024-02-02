import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  IUser,
  ISignupFormValues,
  ILoginFormValues,
} from "../../types";

const initialState: AuthState = {
  token: null,
  loading: false,
  user: null,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ user: Object }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    externalSignupRequest: (
      state,
      action: PayloadAction<ISignupFormValues>
    ) => {
      state.loading = true;
    },
    externalSignupSuccess: (state) => {
      state.loading = false;
    },
    externalSignupFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    externalLoginRequest: (state, action: PayloadAction<ILoginFormValues>) => {
      state.loading = true;
    },
    externalLoginSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    externalLoginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  externalSignupRequest,
  externalSignupSuccess,
  externalSignupFailure,
  externalLoginRequest,
  externalLoginSuccess,
  externalLoginFailure,
} = authSlice.actions;
export default authSlice.reducer;
