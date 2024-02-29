import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEventSalesReport } from "../../types";

interface SalesReportState {
  loading: boolean;
  error: string | null;
  success: boolean;
  eventSalesReports: IEventSalesReport[];
}

const SalesReportSlice = createSlice({
  name: "promoCodeAccess",
  initialState: {
    loading: false,
    error: null,
    success: false,
    eventSalesReports: [],
  } as SalesReportState,
  reducers: {
    getEventSalesReportsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getEventSalesReportsSuccess: (
      state,
      action: PayloadAction<IEventSalesReport[]>
    ) => {
      state.loading = false;
      state.error = null;
      state.eventSalesReports = action.payload;
    },
    getEventSalesReportsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    generateSalesReportRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    generateSalesReportSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    generateSalesReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  generateSalesReportRequest,
  generateSalesReportSuccess,
  generateSalesReportFailure,
  getEventSalesReportsRequest,
  getEventSalesReportsSuccess,
  getEventSalesReportsFailure,
  resetSuccess,
} = SalesReportSlice.actions;

export default SalesReportSlice.reducer;
