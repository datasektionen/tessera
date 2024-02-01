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
  success: boolean;
}

const initialState: EditEventState = {
  loading: false,
  error: null,
  success: false,
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
    deleteEventStart: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteEventSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    deleteEventFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  editEventRequest,
  editEventSuccess,
  editEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
} = editEventSlice.actions;

export default editEventSlice.reducer;
