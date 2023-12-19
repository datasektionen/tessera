import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketReleaseForm, ITicketType, ITicketTypeForm } from "../../types";

interface TicketTypeSliceState {
  loading: boolean;
  ticketTypes: ITicketType[];
  success: boolean;
  updateSuccess: boolean;
}

const initialState: TicketTypeSliceState = {
  loading: false,
  ticketTypes: [],
  success: false,
  updateSuccess: false,
};

const ticketTypeSlice = createSlice({
  name: "ticketTypeSlice",
  initialState,
  reducers: {
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
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
    updateTicketTypesRequest: (
      state,
      action: PayloadAction<{
        eventId: number;
        ticketReleaseId: number;
        ticketTypes: ITicketTypeForm[];
      }>
    ) => {
      state.loading = true;
    },
    updateTicketTypesSuccess: (state) => {
      state.loading = false;
      state.updateSuccess = true;
    },
    updateTicketTypesFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  resetUpdateSuccess,
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  fetchTicketTypesFailure,
  updateTicketTypesRequest,
  updateTicketTypesSuccess,
  updateTicketTypesFailure,
} = ticketTypeSlice.actions;

export default ticketTypeSlice.reducer;
