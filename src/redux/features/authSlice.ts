import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  IUser,
  ISignupFormValues,
  ILoginFormValues,
} from "../../types";
import { REHYDRATE } from "redux-persist";

const initialState: AuthState = {
  token: null,
  loading: false,
  user: null,
  error: null,
  isLoggedIn: false,
  fetchUser: false,
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
      state.fetchUser = true;
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
      state.fetchUser = true;
    },
    externalLoginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetFetchUser: (state) => {
      state.fetchUser = false;
    },
  },
  extraReducers: {
    // Handle the rehydration action
    [REHYDRATE]: (state, action) => {
      // Customize the rehydrated state as needed
      return {
        ...state,
        ...(action.payload ? action.payload.auth : {}),
        // Set loading to false to prevent unwanted UI states
        loading: false,
        // Reset error to ensure error states are cleared on app re-start
        error: null,
      };
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
  resetFetchUser,
} = authSlice.actions;
export default authSlice.reducer;
