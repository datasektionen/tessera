// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedAddon, ITicketOrder, ITicketType } from "../../types";
import {
  ITicketOrderRequest,
  TicketRequestData,
} from "../sagas/ticketOrderSaga";

// Define the ShoppingCartItem interface
export interface ShoppingCartItem {
  ticket: ITicketType;
  quantity: number;
}

// Define the ShoppingCartState interface
export interface ShoppingCartState {
  items: ShoppingCartItem[];
  ticketOrders: ITicketOrder[];
  loading: boolean;
  error: string | null;
  postSuccess: boolean;
}

// Define initial state for the shopping cart
const initialState: ShoppingCartState = {
  items: [],
  ticketOrders: [],
  loading: false,
  error: null,
  postSuccess: false,
};

// Create the shopping cart slice
export const ticketOrderSlice = createSlice({
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
    postTicketOrderRequest: (
      state,
      action: PayloadAction<{
        promoCodes: string[];
        tickeOrderReq: ITicketOrderRequest;
        addons: ISelectedAddon[];
        eventId: number;
      }>
    ) => {
      state.loading = true;
      state.postSuccess = false;
    },
    postTicketOrderSuccess: (state) => {
      state.loading = false;
      state.items = [];
      state.error = null;
      state.postSuccess = true;
    },
    postTicketOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.postSuccess = false;
    },
    resetPostSuccess: (state) => {
      state.postSuccess = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

// Export the actions
export const {
  addTicket,
  removeTicket,
  postTicketOrderRequest,
  postTicketOrderSuccess,
  postTicketOrderFailure,
  resetPostSuccess,
  resetError,
} = ticketOrderSlice.actions;

// Export the reducer
export default ticketOrderSlice.reducer;
