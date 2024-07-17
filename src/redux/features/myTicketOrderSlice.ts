// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGuestCustomer, ITicketOrder, ITicketType } from "../../types";
import { act } from "react-dom/test-utils";
import { TicketRequestData } from "../sagas/ticketOrderSaga";

// Define the ShoppingCartState interface
export interface ShoppingCartState {
  ticketOrders: ITicketOrder[];
  loading: boolean;
  error: string | null;
  deleteSucess: boolean;
}

// Define initial state for the shopping cart
const initialState: ShoppingCartState = {
  ticketOrders: [],
  loading: false,
  error: null,
  deleteSucess: false,
};

// Create the shopping cart slice
export const myTicketOrderSlice = createSlice({
  name: "myTicketOrders",
  initialState,
  reducers: {
    getMyTicketOrdersRequest: (
      state,
      action: PayloadAction<number[] | null>
    ) => {
      state.loading = true;
    },
    getMyTicketOrdersSuccess: (
      state,
      action: PayloadAction<ITicketOrder[]>
    ) => {
      state.loading = false;
      state.ticketOrders = action.payload;
    },
    getMyTicketOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelTicketOrderRequest: (
      state,
      action: PayloadAction<{
        ticket_order: ITicketOrder;
        isGuestCustomer?: boolean;
        guestCustomer?: IGuestCustomer | null;
      }>
    ) => {
      state.loading = true;
      state.deleteSucess = false;
    },
    cancelTicketOrderSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
      state.ticketOrders = state.ticketOrders.filter(
        (ticketOrders) => ticketOrders.id !== action.payload
      );
      state.deleteSucess = true;
    },
    cancelTicketOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.deleteSucess = false;
    },
  },
});

// Export the actions
export const {
  getMyTicketOrdersRequest,
  getMyTicketOrdersSuccess,
  getMyTicketOrdersFailure,
  cancelTicketOrderRequest,
  cancelTicketOrderSuccess,
  cancelTicketOrderFailure,
} = myTicketOrderSlice.actions;

// Export the reducer
export default myTicketOrderSlice.reducer;
