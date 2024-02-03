import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, ListEventState } from "../../types";

const initialState: ListEventState = {
  events: [],
  loading: false,
  error: null,
};

const listEventSlice = createSlice({
  name: "listEvents",
  initialState,
  reducers: {
    getEventsRequest: (state) => {
      if (state.loading) return;
      state.loading = true;
    },
    getEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    getEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEventsRequest, getEventsSuccess, getEventsFailure } =
  listEventSlice.actions;

export default listEventSlice.reducer;
