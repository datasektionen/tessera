import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGuestCustomer, ISelectedAddon } from "../../types";
import { TicketRequestData } from "../sagas/ticketRequestSaga";

interface GuestCustomerState {
  guestCustomer: IGuestCustomer | null;
  create_ticket_request_sucess: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: GuestCustomerState = {
  guestCustomer: null,
  create_ticket_request_sucess: false,
  loading: false,
  error: null,
};

const guestCustomerSlice = createSlice({
  name: "guestCustomer",
  initialState,
  reducers: {
    setGuestCustomer: (state, action: PayloadAction<IGuestCustomer>) => {
      state.guestCustomer = action.payload;
    },
    resetGuestCustomer: (state) => {
      state.guestCustomer = null;
    },
    createGuestTicketRequest: (
      state,
      action: PayloadAction<{
        promoCodes: string[];
        tickets: TicketRequestData[];
        addons: ISelectedAddon[];
        eventId: number;
        ticketReleaseId: number;
        guestCustomer: IGuestCustomer;
      }>
    ) => {
      state.loading = true;
    },
    createGuestTicketRequestSuccess: (state) => {
      state.loading = false;
      state.create_ticket_request_sucess = true;
    },
    createGuestTicketRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGuestCustomerRequest: (
      state,
      action: PayloadAction<{
        ugkthid: string;
        request_token: string;
      }>
    ) => {
      state.loading = true;
    },
    getGuestCustomerSuccess: (state, action: PayloadAction<IGuestCustomer>) => {
      state.loading = false;
      state.guestCustomer = action.payload;
    },
    getGuestCustomerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetRequestSuccess: (state) => {
      state.create_ticket_request_sucess = false;
    },
    resetGustCustomer: (state) => {
      state.guestCustomer = null;
      state.create_ticket_request_sucess = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setGuestCustomer,
  resetGuestCustomer,
  createGuestTicketRequest,
  createGuestTicketRequestSuccess,
  createGuestTicketRequestFailure,
  getGuestCustomerRequest,
  getGuestCustomerSuccess,
  getGuestCustomerFailure,
  resetRequestSuccess,
  resetGustCustomer,
} = guestCustomerSlice.actions;

export default guestCustomerSlice.reducer;