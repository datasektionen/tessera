import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventState, IEvent } from "../../types";

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getEventsRequest: (state) => {
      state.loading = true;
    },
    getEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      console.log(action.payload);
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
  eventSlice.actions;

export default eventSlice.reducer;
