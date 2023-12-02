import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, IUser } from "../../types";

const initialState: AuthState = {
  token: null,
  loading: true,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
  