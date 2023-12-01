import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserState } from "../../types";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUserRequest: (state) => {
      state.loading = true;
    },
    currentUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.loading = false;
      state.user = action.payload;
    },
    currentUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { currentUserRequest, currentUserSuccess, currentUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
