// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGuestCustomer, ITicket } from "../../types";
import { act } from "react-dom/test-utils";
import { TicketRequestData } from "../sagas/ticketOrderSaga";

// Define the ShoppingCartState interface
export interface MyTicketState {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
  deleteSucess: boolean;
}

// Define initial state for the shopping cart
const initialState: MyTicketState = {
  tickets: [],
  loading: false,
  error: null,
  deleteSucess: false,
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
    cancelMyTicketStart: (
      state,
      action: PayloadAction<{
        ticket: ITicket;
        isGuestCustomer?: boolean;
        guestCustomer?: IGuestCustomer | null;
      }>
    ) => {
      state.loading = true;
      state.deleteSucess = false;
    },
    cancelMyTicketSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
      state.deleteSucess = true;
    },
    cancelMyTicketFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.deleteSucess = false;
    },
  },
});

// Export the actions
export const {
  getMyTicketsRequest,
  getMyTicketsFailure,
  getMyTicketsSuccess,
  cancelMyTicketStart,
  cancelMyTicketFailure,
  cancelMyTicketSuccess,
} = myTicketsSlice.actions;

// Export the reducer
export default myTicketsSlice.reducer;
