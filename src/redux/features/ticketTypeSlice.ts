import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketReleaseForm, ITicketType } from "../../types";

interface TicketTypeSliceState {
  loading: boolean;
  ticketTypes: ITicketType[];
  success: boolean;
}

const initialState: TicketTypeSliceState = {
  loading: false,
  ticketTypes: [],
  success: false,
};

const ticketTypeSlice = createSlice({
  name: "ticketTypeSlice",
  initialState,
  reducers: {
    fetchTicketTypesRequest: (
      state,
      action: PayloadAction<{
        eventId: number;
        ticketReleaseId: number;
      }>
    ) => {
      state.loading = true;
    },
    fetchTicketTypesSuccess: (state, action: PayloadAction<ITicketType[]>) => {
      state.ticketTypes = action.payload;
      state.loading = false;
      state.success = true;
    },
    fetchTicketTypesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  fetchTicketTypesFailure,
} = ticketTypeSlice.actions;

export default ticketTypeSlice.reducer;
