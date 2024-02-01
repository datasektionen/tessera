// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicket } from "../../types";
import { act } from "react-dom/test-utils";
import { TicketRequestData } from "../sagas/ticketRequestSaga";

// Define the ShoppingCartState interface
export interface MyTicketState {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
}

// Define initial state for the shopping cart
const initialState: MyTicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Create the shopping cart slice
export const myTicketsSlice = createSlice({
  name: "myTickets",
  initialState,
  reducers: {
    getMyTicketsRequest: (state) => {
      state.loading = true;
    },
    getMyTicketsSuccess: (state, action: PayloadAction<ITicket[]>) => {
      state.loading = false;
      state.tickets = action.payload;
    },
    getMyTicketsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelTicketStart: (state, action: PayloadAction<ITicket>) => {
      state.loading = true;
    },
    cancelTicketSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
    },
    cancelTicketFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const {
  getMyTicketsRequest,
  getMyTicketsFailure,
  getMyTicketsSuccess,
  cancelTicketStart,
  cancelTicketFailure,
  cancelTicketSuccess,
} = myTicketsSlice.actions;

// Export the reducer
export default myTicketsSlice.reducer;
