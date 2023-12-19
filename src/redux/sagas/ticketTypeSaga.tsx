import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  fetchTicketTypesFailure,
  updateTicketTypesRequest,
  updateTicketTypesSuccess,
  updateTicketTypesFailure,
} from "../features/ticketTypeSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITicketType, ITicketTypeForm, ITicketTypePostReq } from "../../types";
import { toast } from "react-toastify";

function* fetchTicketTypes(
  action: PayloadAction<{
    eventId: number;
    ticketReleaseId: number;
  }>
): Generator<any, void, any> {
  try {
    const { eventId, ticketReleaseId } = action.payload;

    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-release/${ticketReleaseId}/ticket-types`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    const ticketTypes: ITicketType[] = response.data.map((ticketType: any) => {
      return {
        id: ticketType.ID!,
        name: ticketType.name!,
        description: ticketType.description!,
        price: ticketType.price!,
        quantity_total: ticketType.quantity_total!,
        quantity_remaining: ticketType.quantity_remaining!,
        is_reserved: ticketType.is_reserved!,
      };
    });

    if (response.status === 200) {
      yield put(fetchTicketTypesSuccess(ticketTypes));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(fetchTicketTypesFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(fetchTicketTypesFailure(errorMessage));
  }
}

function* updateTicketTypes(
  action: PayloadAction<{
    eventId: number;
    ticketReleaseId: number;
    ticketTypes: ITicketTypeForm[];
  }>
): Generator<any, void, any> {
  try {
    const { eventId, ticketReleaseId, ticketTypes } = action.payload;

    const postData: ITicketTypePostReq[] = ticketTypes.map((ticketType) => {
      return {
        id: ticketType.id ? ticketType.id : 0,
        event_id: eventId,
        ticket_release_id: ticketReleaseId,
        name: ticketType.name,
        description: ticketType.description,
        price: ticketType.price,
        quantity_total: ticketType.quantity_total,
      };
    });

    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-release/${ticketReleaseId}/ticket-types`,
      postData,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      yield put(updateTicketTypesSuccess());
      toast.success("Ticket types updated successfully.");
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(updateTicketTypesFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(updateTicketTypesFailure(errorMessage));
  }
}

function* watchFetchTicketTypes() {
  yield takeEvery(fetchTicketTypesRequest.type, fetchTicketTypes);
  yield takeEvery(updateTicketTypesRequest.type, updateTicketTypes);
}

export default watchFetchTicketTypes;
