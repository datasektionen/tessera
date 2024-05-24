import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventState, IEvent } from "../../types";

const initialState: EventState = {
  event: null,
  loading: false,
  error: null,
  errorStatusCode: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getEventRequest: (
      state,
      action: PayloadAction<{
        id: number;
        secretToken: string;
        countSiteVisit?: boolean;
        promoCodes?: string[];
      }>
    ) => {
      state.loading = true;
    },
    getEventSuccess: (state, action: PayloadAction<IEvent>) => {
      state.loading = false;
      state.event = action.payload;
    },
    getEventFailure: (
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

export const { getEventRequest, getEventSuccess, getEventFailure } =
  eventSlice.actions;

export default eventSlice.reducer;
