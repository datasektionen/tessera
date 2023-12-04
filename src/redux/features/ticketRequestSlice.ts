// Import createSlice from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicketType } from "../../types";

// Define the ShoppingCartItem interface
export interface ShoppingCartItem {
  ticketType: ITicketType;
  quantity: number;
}

// Define the ShoppingCartState interface
export interface ShoppingCartState {
  items: ShoppingCartItem[];
  loading: boolean;
  error: string | null;
}

// Define initial state for the shopping cart
const initialState: ShoppingCartState = {
  items: [],
  loading: false,
  error: null,
};

// Create the shopping cart slice
export const ticketRequestSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<ITicketType>) => {
      // Check if the item is already in the cart
      const existingItem = state.items.find(
        (item) => item.ticketType.id === action.payload.id
      );

      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If not, add the new item to the cart
        state.items.push({ ticketType: action.payload, quantity: 1 });
      }
    },
  },
});

// Export the actions
export const { addTicket } = ticketRequestSlice.actions;

// Export the reducer
export default ticketRequestSlice.reducer;
