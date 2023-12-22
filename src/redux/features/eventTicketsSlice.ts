import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicket } from "../../types";

interface EventTicketsSlice {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
}

const initialState: EventTicketsSlice = {
  tickets: [],
  loading: false,
  error: null,
};

export const eventTicketsSlice = createSlice({
  name: "eventTickets",
  initialState,
  reducers: {
    fetchEventTicketsStart: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventTicketsSuccess: (state, action: PayloadAction<ITicket[]>) => {
      state.tickets = action.payload;
      state.loading = false;
    },
    fetchEventTicketsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEventTicketsStart,
  fetchEventTicketsSuccess,
  fetchEventTicketsFailure,
} = eventTicketsSlice.actions;

export default eventTicketsSlice.reducer;
