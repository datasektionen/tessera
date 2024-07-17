import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketRelease, ITicketReleaseForm } from "../../types";

interface AddTicketReleaseState {
  loading: boolean;
  success: boolean;
  createdTicketReleaseId: number | null;
}

const initialState: AddTicketReleaseState = {
  loading: false,
  success: false,
  createdTicketReleaseId: null,
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
      state.success = false;
      state.createdTicketReleaseId = null;
    },
    createTicketReleaseSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.success = true;
      state.createdTicketReleaseId = action.payload;
    },
    createTicketReleaseFailure: (state) => {
      state.loading = false;
      state.success = false;
      state.createdTicketReleaseId = null;
    },
  },
});

export const {
  createTicketReleaseRequest,
  createTicketReleaseSuccess,
  createTicketReleaseFailure,
} = createTicketReleaseSlice.actions;

export default createTicketReleaseSlice.reducer;
