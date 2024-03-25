import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EventFormInitialTestValues,
  EventFormInitialValues,
  IAddon,
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

const initEventValues = EventFormInitialValues;

const initialState: EventCreationState = {
  loading: false,
  form: {
    event: initEventValues,
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
      state.form.ticketRelease.event_date = action.payload.date;
      state.currentStep += 1;
    },
    clearEventForm: (state) => {
      state.form.event = initEventValues;
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
      window.scrollTo(0, 0);
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    nextStep: (state) => {
      state.currentStep += 1;
      window.scrollTo(0, 0);
    },
    // Reducer to move to the previous step
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        window.scrollTo(0, 0);
      }
    },
    resetCompletely: (state) => {
      state.loading = false;
      state.form = {
        event: initEventValues,
        ticketRelease: TicketReleaseFormInitialValues,
        ticketTypes: [TicketTypeFormInitialValues],
      };
      state.currentStep = 1;
      state.success = false;
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  resetCompletely,
  setLoading,
} = eventCreationSlice.actions;

export default eventCreationSlice.reducer;
