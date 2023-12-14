import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EventFormInitialTestValues,
  EventFormInitialValues,
  IEvent,
  IEventForm,
  ITicketReleaseForm,
  ITicketTypeForm,
  TicketReleaseFormInitialValues,
  TicketTypeFormInitialValues,
} from "../../types";

interface EditEventState {
  loading: boolean;
  error: string | null;
}

const initialState: EditEventState = {
  loading: false,
  error: null,
};

const editEventSlice = createSlice({
  name: "eventCreation",
  initialState,
  reducers: {
    editEventRequest: (
      state,
      action: PayloadAction<{
        id: number;
        event: IEventForm;
      }>
    ) => {
      state.loading = true;
    },
    editEventSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editEventFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { editEventRequest, editEventSuccess, editEventFailure } =
  editEventSlice.actions;

export default editEventSlice.reducer;
