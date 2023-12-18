import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketReleaseForm } from "../../types";

interface AddTicketReleaseState {
  loading: boolean;
  success: boolean;
}

const initialState: AddTicketReleaseState = {
  loading: false,
  success: false,
};

const createTicketReleaseSlice = createSlice({
  name: "addTicketRelease",
  initialState,
  reducers: {
    createTicketReleaseRequest: (
      state,
      action: PayloadAction<{
        eventId: number;
        ticketRelease: ITicketReleaseForm;
      }>
    ) => {
      state.loading = true;
    },
    createTicketReleaseSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createTicketReleaseFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  createTicketReleaseRequest,
  createTicketReleaseSuccess,
  createTicketReleaseFailure,
} = createTicketReleaseSlice.actions;

export default createTicketReleaseSlice.reducer;
