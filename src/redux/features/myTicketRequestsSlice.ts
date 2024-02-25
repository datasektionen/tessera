 // Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicketRequest, ITicketType } from "../../types";
import { act } from "react-dom/test-utils";
import { TicketRequestData } from "../sagas/ticketRequestSaga";

// Define the ShoppingCartState interface
export interface ShoppingCartState {
  ticketRequests: ITicketRequest[];
  loading: boolean;
  error: string | null;
}

// Define initial state for the shopping cart
const initialState: ShoppingCartState = {
  ticketRequests: [],
  loading: false,
  error: null,
};

// Create the shopping cart slice
export const myTicketRequestSlice = createSlice({
  name: "myTicketRequests",
  initialState,
  reducers: {
    getMyTicketRequestsRequest: (state) => {
      state.loading = true;
    },
    getMyTicketRequestsSuccess: (
      state,
      action: PayloadAction<ITicketRequest[]>
    ) => {
      state.loading = false;
      state.ticketRequests = action.payload;
    },
    getMyTicketRequestsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    cancelTicketRequestRequest: (
      state,
      action: PayloadAction<ITicketRequest>
    ) => {
      state.loading = true;
    },
    cancelTicketRequestSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.error = null;
      state.ticketRequests = state.ticketRequests.filter(
        (ticketRequest) => ticketRequest.id !== action.payload
      );
    },
    cancelTicketRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const {
  getMyTicketRequestsRequest,
  getMyTicketRequestsFailure,
  getMyTicketRequestsSuccess,
  cancelTicketRequestRequest,
  cancelTicketRequestFailure,
  cancelTicketRequestSuccess,
} = myTicketRequestSlice.actions;

// Export the reducer
export default myTicketRequestSlice.reducer;
