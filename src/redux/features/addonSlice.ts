import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddon } from "../../types";

interface AddonSliceState {
  addons: IAddon[] | [];
  loading: boolean;
  error: string | null;
  errorStatusCode: number | null;
}

const initialState: AddonSliceState = {
  addons: [],
  loading: false,
  error: null,
  errorStatusCode: null,
};
const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    getAddonsRequest: (
      state,
      action: PayloadAction<{ eventID: number; ticketReleaseID: number }>
    ) => {
      console.log("getAddonsRequest");
      state.loading = true;
    },
    getAddonsSuccess: (state, action: PayloadAction<IAddon[]>) => {
      state.loading = false;
      state.addons = action.payload;
    },
    getAddonsFailure: (
      state,
      action: PayloadAction<{
        error: string;
        errorStatusCode: number;
      }>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
      state.errorStatusCode = action.payload.errorStatusCode;
    },
  },
});

export const { getAddonsRequest, getAddonsSuccess, getAddonsFailure } =
  addonSlice.actions;

export default addonSlice.reducer;
