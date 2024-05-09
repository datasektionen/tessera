import { all, call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  IAddon,
  IEvent,
  IEventFormField,
  IEventFormFieldResponse,
  IGuestCustomer,
  ISelectedAddon,
  ITicketAddon,
  ITicketRelease,
  ITicketRequest,
  ITicketType,
  TicketRequestPostReq,
} from "../../types";

import {
  postTicketRequest,
  postTicketRequestFailure,
  postTicketRequestSuccess,
} from "../features/ticketRequestSlice";

import {
  cancelTicketRequestFailure,
  cancelTicketRequestRequest,
  cancelTicketRequestSuccess,
} from "../features/myTicketRequestsSlice";

import { toast } from "react-toastify";
import {
  getMyTicketRequestsFailure,
  getMyTicketRequestsRequest,
  getMyTicketRequestsSuccess,
} from "../features/myTicketRequestsSlice";
import StyledText from "../../components/text/styled_text";
import { Link } from "@mui/joy";
import { ROUTES } from "../../routes/def";
import PALLETTE from "../../theme/pallette";
import { getPromoCodeAccessRequest } from "../features/promoCodeAccessSlice";

export interface TicketRequestData {
  ticket_type_id: number;
  ticket_amount: number;
}

function* createTicketRequestSaga(
  action: PayloadAction<{
    promoCodes: string[];
    tickets: TicketRequestData[];
    addons: ISelectedAddon[];
    eventId: number;
    ticketReleaseId: number;
  }>
): Generator<any, void, any> {
  try {
    const { tickets, eventId, ticketReleaseId, addons, promoCodes } =
      action.payload;

    const promoCodeRequests = promoCodes.map((promoCode) => {
      return put(
        getPromoCodeAccessRequest({
          eventId: eventId,
          promo_code: promoCode,
          isGuestCustomer: false,
        })
      );
    });

    yield all(promoCodeRequests);

    const ticket_body: TicketRequestPostReq[] = tickets.map((ticket) => {
      return {
        ticket_amount: ticket.ticket_amount,
        ticket_type_id: ticket.ticket_type_id,
        ticket_release_id: ticketReleaseId,
      };
    });

    const body = {
      ticket_requests: ticket_body,
      selected_add_ons: addons,
    };

    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}/ticket-requests`,
      body,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 201) {
      yield put(
        getMyTicketRequestsRequest(
          response.data.map((ticket_request: any) => ticket_request.ID)
        )
      );
      // toast.success(
      //   <StyledText color={PALLETTE.charcoal} level="body-sm" fontWeight={600}>
      //     Ticket request created! View it{" "}
      //     <Link href={ROUTES.PROFILE_TICKET_REQUESTS}>here</Link>
      //   </StyledText>
      // );
      yield put(postTicketRequestSuccess());
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(postTicketRequestFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(postTicketRequestFailure(errorMessage));
  }
}

function* getMyTicketRequestsSaga(
  action: PayloadAction<number[] | null>
): Generator<any, void, any> {
  const ids = action.payload;

  try {
    let response;
    if (ids !== null) {
      response = yield call(
        axios.get,
        `${process.env.REACT_APP_BACKEND_URL}/my-ticket-requests`,
        {
          params: {
            ids: ids.join(","),
          },
          withCredentials: true,
        }
      );
    } else {
      response = yield call(
        axios.get,
        `${process.env.REACT_APP_BACKEND_URL}/my-ticket-requests`,
        {
          withCredentials: true,
        }
      );
    }

    const ticket_requests: ITicketRequest[] = response.data.ticket_requests.map(
      (ticket_request: any) => {
        return {
          id: ticket_request.ID!,
          created_at: new Date(ticket_request.CreatedAt!).getTime(),
          is_handled: ticket_request.is_handled!,
          ticket_amount: ticket_request.ticket_amount!,
          ticket_type_id: ticket_request.ticket_type_id!,
          ticket_type: {
            id: ticket_request.ticket_type.ID!,
            name: ticket_request.ticket_type.name!,
            description: ticket_request.ticket_type.description!,
            price: ticket_request.ticket_type.price!,
            isReserved: ticket_request.ticket_type.is_reserved!,
          } as ITicketType,
          event_form_responses: ticket_request.event_form_responses?.map(
            (form_response: any) => {
              return {
                id: form_response.ID!,
                ticket_request_id: form_response.ticket_request_id!,
                event_form_field_id: form_response.event_form_field_id!,
                value: form_response.value!,
                updated_at: new Date(form_response.UpdatedAt!).getTime(),
              };
            }
          ) as IEventFormFieldResponse[],
          ticket_release_id: ticket_request.ticket_release_id!,
          ticket_release: {
            id: ticket_request.ticket_release.ID!,
            eventId: ticket_request.ticket_release.event_id!,
            event: {
              id: ticket_request.ticket_release.event.ID!,
              name: ticket_request.ticket_release.event.name!,
              date: new Date(
                ticket_request.ticket_release.event.date!
              ).getTime(),
              form_field_description:
                ticket_request.ticket_release.event.form_field_description!,
              form_fields: ticket_request.ticket_release.event.form_fields?.map(
                (form_field: any) => {
                  return {
                    id: form_field.ID!,
                    name: form_field.name!,
                    type: form_field.type!,
                    is_required: form_field.is_required!,
                    description: form_field.description!,
                  } as IEventFormField;
                }
              ),
            } as IEvent,
            name: ticket_request.ticket_release.name!,
            description: ticket_request.ticket_release.description!,
            open: new Date(ticket_request.ticket_release.open!).getTime(),
            close: new Date(ticket_request.ticket_release.close!).getTime(),
            has_allocated_tickets:
              ticket_request.ticket_release.has_allocated_tickets,
            addons: ticket_request.ticket_release.add_ons?.map((addon: any) => {
              return {
                id: addon.ID!,
                name: addon.name!,
                description: addon.description!,
                price: addon.price!,
                max_quantity: addon.max_quantity!,
                contains_alcohol: addon.contains_alcohol!,
                is_enabled: addon.is_enabled!,
              } as IAddon;
            }) as IAddon[],
          } as ITicketRelease,
          deleted_at: ticket_request.DeletedAt,
          ticket_add_ons: ticket_request.ticket_add_ons?.map((addon: any) => {
            return {
              id: addon.ID!,
              ticket_request_id: addon.ticket_request_id!,
              add_on_id: addon.add_on_id!,
              quantity: addon.quantity!,
            };
          }) as ITicketAddon[],
        } as ITicketRequest;
      }
    );

    if (response.status === 200) {
      yield put(getMyTicketRequestsSuccess(ticket_requests));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(getMyTicketRequestsFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(getMyTicketRequestsFailure(errorMessage));
  }
}

function* cancelTicketRequestSaga(
  action: PayloadAction<{
    ticket_request: ITicketRequest;
    isGuestCustomer?: boolean;
    guestCustomer?: IGuestCustomer | null;
  }>
): Generator<any, void, any> {
  try {
    const { ticket_request, isGuestCustomer, guestCustomer } = action.payload;
    // if guest: /guest-customer/:ugkthid/ticket-requests/:ticketRequestID
    // if not guest: /events/:eventID/ticket-requests/:ticketRequestID

    const url =
      process.env.REACT_APP_BACKEND_URL +
      (isGuestCustomer
        ? `/guest-customer/${guestCustomer?.user_id}/ticket-requests/${ticket_request.id}?request_token=${guestCustomer?.request_token}`
        : `/events/${
            ticket_request.ticket_release!.event!.id
          }/ticket-requests/${ticket_request.id}`);

    const response = yield call(axios.delete, url, {
      withCredentials: !isGuestCustomer,
    });

    if (response.status === 200) {
      toast.success("Ticket request cancelled!");
      yield put(cancelTicketRequestSuccess(ticket_request.id));
    } else {
      const errorMessage = response.data.error || "An error occurred";
      toast.error(errorMessage);
      yield put(cancelTicketRequestFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || "An error occurred";
    toast.error(errorMessage);
    yield put(cancelTicketRequestFailure(errorMessage));
  }
}

export function* myTicketRequestSaga() {}

function* watchTicketRequestSaga() {
  yield takeLatest(cancelTicketRequestRequest.type, cancelTicketRequestSaga);
  yield takeLatest(postTicketRequest.type, createTicketRequestSaga);
  yield takeLatest(getMyTicketRequestsRequest.type, getMyTicketRequestsSaga);
}

export default watchTicketRequestSaga;
