import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, UserState } from "../../types";
import { REHYDRATE } from "redux-persist";

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
      // Only set loading to true if user information is not already loaded
      if (!state.user) {
        state.loading = true;
      }
    },
    currentUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null; // Reset any errors on success
    },
    currentUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {
    [REHYDRATE]: (state, action) => {
      // Handle rehydration separately if needed
      // You can customize the rehydrated state as needed
      return {
        ...state,
        ...(action.payload ? action.payload.auth : {}),
        loading: false, // Ensure loading is false after rehydration
      };
    },
  },
});

export const { currentUserRequest, currentUserSuccess, currentUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
