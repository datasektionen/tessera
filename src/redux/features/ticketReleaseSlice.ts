import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicketReleaseForm } from "../../types";

// Define the shape of your state
interface TicketReleaseState {
  loading: boolean;
  error: string | null;
  data: any; // Replace with your data type
}

// Define the initial state
const initialState: TicketReleaseState = {
  loading: false,
  error: null,
  data: null,
};

// Define the slice
const ticketReleaseSlice = createSlice({
  name: "ticketRelease",
  initialState,
  reducers: {
    updateTicketReleaseStart: (
      state,
      action: PayloadAction<{
        eventId: number;
        ticketReleaseId: number;
        formData: ITicketReleaseForm;
      }>
    ) => {
      state.loading = true;
    },
    updateTicketReleaseSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
    },
    updateTicketReleaseFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateTicketReleaseStart,
  updateTicketReleaseSuccess,
  updateTicketReleaseFailure,
} = ticketReleaseSlice.actions;

export default ticketReleaseSlice.reducer;
