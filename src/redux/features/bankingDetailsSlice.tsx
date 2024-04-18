import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IBankingDetails,
  IBankingDetailsReq,
  ITicketReleaseForm,
} from "../../types";

interface BankingDetailsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  bankingDetails: IBankingDetails;
}

const initialState: BankingDetailsState = {
  bankingDetails: {
    id: 0,
    organization_id: 0,
    clearing_number: "",
    account_number: "",
    bank_name: "",
    account_holder: "",
    created_at: new Date(),
  },
  loading: false,
  success: false,
  error: null,
};

const bankingDetailsSlice = createSlice({
  name: "bankingDetails",
  initialState,
  reducers: {
    getBankingDetailsRequest: (
      state,
      action: PayloadAction<{
        organizationID: number;
      }>
    ) => {
      state.loading = true;
    },
    getBankingDetailsSuccess: (
      state,
      action: PayloadAction<IBankingDetails>
    ) => {
      state.loading = false;
      state.success = true;
      state.bankingDetails = action.payload;
      state.error = null;
    },
    getBankingDetailsFailure: (
      state,
      action: PayloadAction<{
        error: string;
      }>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    submitBankingDetailsRequest: (
      state,
      action: PayloadAction<{
        organizationID: number;
        bankingDetails: IBankingDetailsReq;
      }>
    ) => {
      state.loading = true;
    },
    submitBankingDetailsSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    submitBankingDetailsFailure: (
      state,
      action: PayloadAction<{
        error: string;
      }>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteBankingDetailsRequest: (
      state,
      action: PayloadAction<{
        organizationID: number;
      }>
    ) => {
      state.loading = true;
    },
    deleteBankingDetailsSuccess: (
      state,
      action: PayloadAction<IBankingDetails>
    ) => {
      state.loading = false;
      state.success = true;
      state.bankingDetails = action.payload;
      state.error = null;
    },
    deleteBankingDetailsFailure: (
      state,
      action: PayloadAction<{
        error: string;
      }>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getBankingDetailsRequest,
  getBankingDetailsSuccess,
  getBankingDetailsFailure,
  submitBankingDetailsRequest,
  submitBankingDetailsSuccess,
  submitBankingDetailsFailure,
  deleteBankingDetailsRequest,
  deleteBankingDetailsSuccess,
  deleteBankingDetailsFailure,
} = bankingDetailsSlice.actions;

export default bankingDetailsSlice.reducer;
