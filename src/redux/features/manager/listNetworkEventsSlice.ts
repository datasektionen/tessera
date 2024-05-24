import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, ListEventState } from "../../../types";

const initialState: ListEventState = {
  events: [],
  loading: false,
  error: null,
};

const listNetworkEventsSlice = createSlice({
  name: "listNetworkEvents",
  initialState,
  reducers: {
    getNetworkEventsRequest: (state) => {
      if (state.loading) return;
      state.loading = true;
    },
    getNetworkEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    getNetworkEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getNetworkEventsRequest,
  getNetworkEventsSuccess,
  getNetworkEventsFailure,
} = listNetworkEventsSlice.actions;

export default listNetworkEventsSlice.reducer;
