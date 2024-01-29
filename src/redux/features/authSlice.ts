import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, IUser } from "../../types";

const initialState: AuthState = {
  token: null,
  loading: false,
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
      state.isLoggedIn = false;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      if (!action.payload.token) {
        state.isLoggedIn = false;
        state.loading = false;
        return;
      }
      state.loading = false;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
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
} = authSlice.actions;
export default authSlice.reducer;
