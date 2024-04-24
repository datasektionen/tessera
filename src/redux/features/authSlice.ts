import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  IUser,
  ISignupFormValues,
  ILoginFormValues,
  ICustomerSignupValues,
  ICustomerLoginValues,
  IGuestCustomer,
} from "../../types";
import { REHYDRATE } from "redux-persist";

const initialState: AuthState = {
  token: null,
  loading: false,
  user: null,
  error: null,
  isLoggedIn: false,
  fetchUser: false,
  onLoginRedirect: null,
  customerSignupSuccess: false,
  customerLoginSuccess: false,
  guestCustomer: null,
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
    setLoginRedirect: (state, action: PayloadAction<string>) => {
      // Check if its logout
      if (decodeURIComponent(action.payload).includes("logout")) {
        state.onLoginRedirect = null;
        return;
      }
      state.onLoginRedirect = action.payload;
    },
    clearLoginRedirect: (state) => {
      state.onLoginRedirect = null;
    },
    customerSignupRequest: (
      state,
      action: PayloadAction<ICustomerSignupValues>
    ) => {
      state.loading = true;
    },
    customerSignupSuccess: (
      state,
      action: PayloadAction<IGuestCustomer | undefined>
    ) => {
      state.loading = false;
      state.customerSignupSuccess = true;
      state.guestCustomer = action.payload || null;
    },
    customerSignupFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    customerLoginRequest: (
      state,
      action: PayloadAction<ICustomerLoginValues>
    ) => {
      state.loading = true;
    },
    customerLoginSuccess: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.fetchUser = true;
      state.customerLoginSuccess = true;
    },
    customerLoginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetFetchUser: (state) => {
      state.fetchUser = false;
    },
    resetSignupSuccess: (state) => {
      state.customerSignupSuccess = false;
    },
    resetLoginSuccess: (state) => {
      state.customerLoginSuccess = false;
    },
    resetGuestCustomer: (state) => {
      state.guestCustomer = null;
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
        guestCustomer: null,
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
  setLoginRedirect,
  clearLoginRedirect,
  customerSignupRequest,
  customerSignupSuccess,
  customerSignupFailure,
  customerLoginRequest,
  customerLoginSuccess,
  customerLoginFailure,
  resetFetchUser,
  resetSignupSuccess,
  resetLoginSuccess,
  resetGuestCustomer,
} = authSlice.actions;
export default authSlice.reducer;
