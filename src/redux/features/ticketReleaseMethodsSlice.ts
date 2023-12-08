import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketReleaseMethod } from "../../types";

interface TicketReleaseMethodState {
  loading: boolean;
  ticketReleaseMethods: ITicketReleaseMethod[] | null;
  error: string | null;
}

const initialState: TicketReleaseMethodState = {
  loading: false,
  ticketReleaseMethods: [],
  error: null,
};

const ticketReleaseMethodsSlice = createSlice({
  name: "ticketReleaseMethods",
  initialState,
  reducers: {
    getTicketReleaseMethodsRequest: (state) => {
      state.loading = true;
    },
    getTicketReleaseMethodsSuccess: (
      state,
      action: PayloadAction<ITicketReleaseMethod[]>
    ) => {
      state.loading = false;
      state.ticketReleaseMethods = action.payload;
      state.error = null;
    },
    getTicketReleaseMethodsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTicketReleaseMethodsRequest,
  getTicketReleaseMethodsSuccess,
  getTicketReleaseMethodsFailure,
} = ticketReleaseMethodsSlice.actions;

export default ticketReleaseMethodsSlice.reducer;
