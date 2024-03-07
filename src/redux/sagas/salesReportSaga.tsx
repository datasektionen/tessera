import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { toast } from "react-toastify";
import {
  generateSalesReportFailure,
  generateSalesReportRequest,
  generateSalesReportSuccess,
  getEventSalesReportsFailure,
  getEventSalesReportsRequest,
  getEventSalesReportsSuccess,
} from "../features/salesReportSlice";
import { IEventSalesReport } from "../../types";

const listEventSalesReports = function* (
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/events/${action.payload}/sales-report`,
      {
        withCredentials: true,
      }
    );

    const sales_reports = response.data.map((report: any) => {
      return {
        id: report.ID,
        event_id: report.event_id,
        total_sales: report.total_sales,
        tickets_sold: report.tickets_sold,
        status: report.status,
        message: report.message,
        updated_at: new Date(report.UpdatedAt),
        created_at: new Date(report.CreatedAt),
        url: report.url,
      } as IEventSalesReport;
    });

    if (response.status === 200) {
      yield put(getEventSalesReportsSuccess(sales_reports));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      yield put(getEventSalesReportsFailure(errorMessage));
      toast.error("An error occurred");
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getEventSalesReportsFailure(errorMessage));
  }
};

const generateSalesReport = function* (
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/events/${action.payload}/sales-report`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      yield put(generateSalesReportSuccess(response.data));
      toast.success("Sales report is being generated...");
    } else {
      yield put(generateSalesReportFailure(response.data));
      toast.error("An error occurred");
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(generateSalesReportFailure(error));
  }
};

export default function* watchSalesReportSaga() {
  yield takeEvery(generateSalesReportRequest.type, generateSalesReport);
  yield takeEvery(getEventSalesReportsRequest.type, listEventSalesReports);
}
