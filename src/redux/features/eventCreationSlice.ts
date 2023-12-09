import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EventFormInitialValues,
  IEvent,
  IEventForm,
  ITicketReleaseForm,
  ITicketTypeForm,
  TicketReleaseFormInitialValues,
  TicketTypeFormInitialValues,
} from "../../types";

interface FullEventCreationPayload {
  event: IEventForm;
  ticketRelease: ITicketReleaseForm;
  ticketTypes: ITicketTypeForm[];
}

interface EventCreationState {
  loading: boolean;
  form: {
    event: IEventForm;
    ticketRelease: ITicketReleaseForm;
    ticketTypes: ITicketTypeForm[];
  };
  currentStep: number;
  success: boolean;
}

const initialState: EventCreationState = {
  loading: false,
  form: {
    event: EventFormInitialValues,
    ticketRelease: TicketReleaseFormInitialValues,
    ticketTypes: [],
  },
  currentStep: 1,
  success: false,
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
    setTicketTypes: (state, action: PayloadAction<ITicketTypeForm[]>) => {
      state.form.ticketTypes = action.payload;
      state.currentStep += 1;
    },
    clearTicketTypes: (state) => {
      state.form.ticketTypes = [];
    },
    resetCurrentStep: (state) => {
      state.currentStep = 1;
      state.loading = false;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    // Reducer to move to the previous step
    previousStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    createEventFullWorkflowRequest: (
      state,
      action: PayloadAction<FullEventCreationPayload>
    ) => {
      state.loading = true;
    },
    createEventFullWorkflowSuccess: (state) => {
      state.loading = false;
      state.form = {
        event: EventFormInitialValues,
        ticketRelease: TicketReleaseFormInitialValues,
        ticketTypes: [TicketTypeFormInitialValues],
      };
      state.currentStep = 1;
      state.success = true;
    },
    createEventFullWorkflowFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
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
  setTicketTypes,
  clearTicketTypes,
  resetSuccess,
  createEventFullWorkflowRequest,
  createEventFullWorkflowSuccess,
  createEventFullWorkflowFailure,
} = eventCreationSlice.actions;

export default eventCreationSlice.reducer;
