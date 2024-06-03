import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEventTicketsStart,
  fetchEventTicketsSuccess,
  fetchEventTicketsFailure,
} from "../features/eventTicketsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ITicket,
  ITicketRequest,
  IUser,
  IUserFoodPreference,
} from "../../types";
import { ApiResponse, fetchApi } from "../../utils/api/api";

function* fetchEventTickets(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/events/${action.payload}/tickets`;

    const response: ApiResponse<{
      tickets: ITicket[];
      ticket_requests: ITicketRequest[];
    }> = yield call(fetchApi, url, true, true);

    const ticket_requests2: ITicket[] = response.data.ticket_requests.map(
      (ticketRequest: any) => {
        return {
          id: ticketRequest.ID!,
          is_paid: false,
          is_reserve: false,
          refunded: false,
          user_id: ticketRequest.user_id!,
          created_at: new Date().getTime(),
          updated_at: 0, // Add the missing property 'updated_at'
          checked_in: false, // Add the missing property 'checked_in'
          qr_code: "", // Add the missing property 'qr_code'
          deleted_at: null, // Add the missing property 'deleted_at'
          user: {
            ug_kth_id: ticketRequest.user.ug_kth_id!,
            id: ticketRequest.user.ID!,
            email: ticketRequest.user.email!,
            username: ticketRequest.user.username!,
            first_name: ticketRequest.user.first_name!,
            last_name: ticketRequest.user.last_name!,
            is_external: ticketRequest.user.is_external || false,
            food_preferences: {
              gluten_intolerant:
                ticketRequest.user.food_preferences.gluten_intolerant!,
              lactose_intolerant:
                ticketRequest.user.food_preferences.lactose_intolerant!,
              vegetarian: ticketRequest.user.food_preferences.vegetarian!,
              vegan: ticketRequest.user.food_preferences.vegan!,
              nut_allergy: ticketRequest.user.food_preferences.nut_allergy!,
              shellfish_allergy:
                ticketRequest.user.food_preferences.shellfish_allergy!,
              kosher: ticketRequest.user.food_preferences.kosher!,
              halal: ticketRequest.user.food_preferences.halal!,
              prefer_meat: ticketRequest.user.food_preferences.prefer_meat!,
              additional: ticketRequest.user.food_preferences.additional_info!,
            } as IUserFoodPreference,
          } as IUser,
          ticket_request: {
            ...(ticketRequest as ITicketRequest),
          },
        };
      }
    );

    const tickets: ITicket[] = [...response.data.tickets, ...ticket_requests2];

    if (response.status === "success") {
      yield put(fetchEventTicketsSuccess(tickets));
    } else {
      yield put(fetchEventTicketsFailure(response.message));
    }
  } catch (error: any) {
    console.error("Error fetching event tickets:", error);
    yield put(fetchEventTicketsFailure(error.message));
  }
}

function* watchAllocateTicketsSaga() {
  yield takeLatest(fetchEventTicketsStart.type, fetchEventTickets);
}

export default watchAllocateTicketsSaga;
