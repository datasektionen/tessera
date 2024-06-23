import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITicketTypeForm, TicketTypeFormInitialValues } from "../../types";

interface TicketTypeCreationState {
  ticketTypes: ITicketTypeForm[];
  selectedTicketType: number; // index of ticketTypes array
  loading: boolean;
  error: string;
}

const initialTicketType = TicketTypeFormInitialValues;

const initialState: TicketTypeCreationState = {
  ticketTypes: [initialTicketType],
  selectedTicketType: 0,
  loading: false,
  error: "",
};

const ticketTypeCreationSlice = createSlice({
  name: "ticketTypeCreation",
  initialState,
  reducers: {
    setTicketTypes: (state, action: PayloadAction<ITicketTypeForm[]>) => {
      state.ticketTypes = action.payload;
    },
    setSelectedTicketType: (state, action: PayloadAction<number>) => {
      state.selectedTicketType = action.payload;
    },
    addTicketType: (state) => {
      state.ticketTypes.push(initialTicketType);
    },
    addTicketTypeWithValues: (
      state,
      action: PayloadAction<ITicketTypeForm>
    ) => {
      state.ticketTypes.push(action.payload);
    },
    updateTicketType: (
      state,
      action: PayloadAction<{
        index: number;
        values: ITicketTypeForm;
      }>
    ) => {
      state.ticketTypes[action.payload.index] = action.payload.values;
    },
    removeTicketType: (state, action: PayloadAction<number>) => {
      state.ticketTypes = state.ticketTypes.filter(
        (ticketType, index) => index !== action.payload
      );
    },
    clearTicketType: (state, action: PayloadAction<number>) => {
      // Reset the ticket type to its initial values
      state.ticketTypes[action.payload] = initialTicketType;
    },
    resetTicketTypes: (state) => {
      state.ticketTypes = [initialTicketType];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTicketTypes,
  setSelectedTicketType,
  setLoading,
  setError,
  addTicketType,
  addTicketTypeWithValues,
  removeTicketType,
  updateTicketType,
  clearTicketType,
  resetTicketTypes,
} = ticketTypeCreationSlice.actions;

export default ticketTypeCreationSlice.reducer;
