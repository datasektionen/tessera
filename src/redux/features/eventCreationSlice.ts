import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EventFormInitialValues,
  IEvent,
  IEventForm,
  ITicketReleaseForm,
  TicketReleaseFormInitialValues,
} from "../../types";

interface EventCreationState {
  loading: boolean;
  form: {
    event: IEventForm;
    ticketRelease: ITicketReleaseForm;
  };
  currentStep: number;
}

const initialState: EventCreationState = {
  loading: false,
  form: {
    event: EventFormInitialValues,
    ticketRelease: TicketReleaseFormInitialValues,
  },
  currentStep: 1,
};

const eventCreationSlice = createSlice({
  name: "eventCreation",
  initialState,
  reducers: {
    setEventForm: (state, action: PayloadAction<IEventForm>) => {
      state.form.event = action.payload;
      state.currentStep += 1;
    },
    clearEventForm: (state) => {
      state.form.event = EventFormInitialValues;
    },
    setTicketReleaseForm: (
      state,
      action: PayloadAction<ITicketReleaseForm>
    ) => {
      state.form.ticketRelease = action.payload;
      state.currentStep += 1;
    },
    clearTicketReleaseForm: (state) => {
      state.form.ticketRelease = TicketReleaseFormInitialValues;
    },
    resetCurrentStep: (state) => {
      state.currentStep = 2;
    },
    nextStep: (state) => {
      console.log(state.currentStep);
      state.currentStep += 1;
    },
    // Reducer to move to the previous step
    previousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
  },
});

export const {
  setEventForm,
  nextStep,
  previousStep,
  clearEventForm,
  resetCurrentStep,
  setTicketReleaseForm,
  clearTicketReleaseForm,
} = eventCreationSlice.actions;

export default eventCreationSlice.reducer;
