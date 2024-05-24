import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventState, IEvent } from "../../types";

const initialState: EventState = {
  event: null,
  loading: false,
  error: null,
  errorStatusCode: null,
};

const eventSlice = createSlice({
  name: "customViewEvent",
  initialState,
  reducers: {
    getCustomerEventRequest: (
      state,
      action: PayloadAction<{
        refID: string;
        secretToken: string;
        countSiteVisit?: boolean;
        promoCodes?: string[];
      }>
    ) => {
      state.loading = true;
    },
    getCustomerEventSuccess: (state, action: PayloadAction<IEvent>) => {
      state.loading = false;
      state.event = action.payload;
    },
    getCustomerEventFailure: (
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

export const {
  getCustomerEventRequest,
  getCustomerEventSuccess,
  getCustomerEventFailure,
} = eventSlice.actions;

export default eventSlice.reducer;
