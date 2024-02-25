// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicketRequest, ITicketType } from "../../types";
import { act } from "react-dom/test-utils";
import { TicketRequestData } from "../sagas/ticketRequestSaga";

// Define the ShoppingCartItem interface
export interface ShoppingCartItem {
  ticket: ITicketType;
  quantity: number;
}

// Define the ShoppingCartState interface
export interface ShoppingCartState {
  items: ShoppingCartItem[];
  ticketRequests: ITicketRequest[];
  loading: boolean;
  error: string | null;
  postSuccess: boolean;
}

// Define initial state for the shopping cart
const initialState: ShoppingCartState = {
  items: [],
  ticketRequests: [],
  loading: false,
  error: null,
  postSuccess: false,
};

// Create the shopping cart slice
export const ticketRequestSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<ITicketType>) => {
      // Check if the item is already in the cart
      const existingItem = state.items.find(
        (item: ShoppingCartItem) => item.ticket.id === action.payload.id
      );

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If not, add the new item to the cart
        state.items.push({ ticket: action.payload, quantity: 1 });
      }
    },
    removeTicket: (state, action: PayloadAction<ITicketType>) => {
      // Check if the item is already in the cart
      const existingItem = state.items.find(
        (item: ShoppingCartItem) => item.ticket.id === action.payload.id
      );

      if (existingItem) {
        // If the quantity is 1, remove the item
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item: ShoppingCartItem) => item.ticket.id !== action.payload.id
          );
        } else {
          // If the quantity is more than 1, decrease the quantity
          existingItem.quantity -= 1;
        }
      }
    },
    postTicketRequest: (
      state,
      action: PayloadAction<{
        tickets: TicketRequestData[];
        eventId: number;
        ticketReleaseId: number;
      }>
    ) => {
      state.loading = true;
      state.postSuccess = false;
    },
    postTicketRequestSuccess: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
      state.postSuccess = true;
    },
    postTicketRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.postSuccess = false;
    },
    resetPostSuccess: (state) => {
      state.postSuccess = false;
    },
  },
});

// Export the actions
export const {
  addTicket,
  removeTicket,
  postTicketRequest,
  postTicketRequestFailure,
  postTicketRequestSuccess,
  resetPostSuccess,
} = ticketRequestSlice.actions;

// Export the reducer
export default ticketRequestSlice.reducer;
