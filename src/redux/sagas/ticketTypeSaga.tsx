import { all, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  fetchTicketTypesFailure,
} from "../features/ticketTypeSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ITicketType } from "../../types";
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
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-releases/${ticketReleaseId}/ticket-types`
    );

    const ticketTypes: ITicketType[] = response.data.ticket_types.map(
      (ticketType: any) => {
        return {
          id: ticketType.ID!,
          name: ticketType.name!,
          description: ticketType.description!,
          price: ticketType.price!,
          quantity_total: ticketType.quantity_total!,
          quantity_remaining: ticketType.quantity_remaining!,
          is_reserved: ticketType.is_reserved!,
        };
      }
    );

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

function* watchFetchTicketTypes() {
  yield takeEvery(fetchTicketTypesRequest.type, fetchTicketTypes);
}

export default watchFetchTicketTypes;
