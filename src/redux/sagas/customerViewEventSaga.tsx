import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddon,
  IEvent,
  IEventForm,
  IEventFormField,
  IEventPostReq,
  IOrganization,
  ITicketRelease,
  ITicketReleaseMethod,
  ITicketReleaseMethodDetail,
  ITicketReleasePaymentDeadline,
  ITicketType,
  LoginCredentials,
} from "../../types";

import { toast } from "react-toastify";

import { setTimestamp } from "../features/serverTimestampSlice";
import {
  getCustomerEventFailure,
  getCustomerEventRequest,
  getCustomerEventSuccess,
} from "../features/customerViewEvent";

function* eventSaga(
  action: PayloadAction<{
    refID: string;
    secretToken: string;
    countSiteVisit?: boolean;
    promoCodes?: string[];
  }>
): Generator<any, void, any> {
  try {
    const { refID, secretToken } = action.payload;
    const queryParams = [];

    if (secretToken !== "") {
      queryParams.push("secret_token=" + secretToken);
    }

    if (!action.payload.countSiteVisit) {
      queryParams.push("dont_count_site_visit=true");
    }

    if (action.payload.promoCodes) {
      action.payload.promoCodes.forEach((promoCode: string) => {
        queryParams.push("promo_codes=" + promoCode);
      });
    }

    const queryString =
      queryParams.length > 0 ? "?" + queryParams.join("&") : "";

    const url =
      process.env.REACT_APP_BACKEND_URL + "/view/events/" + refID + queryString;
    console.log(url);

    const response = yield call(axios.get, url);

    const eventData = response.data.event;

    const event: IEvent = {
      // Convert from ISO 8601 to Unix timestamp
      id: eventData.ID!,
      is_private: eventData.is_private!,
      createdAt: new Date(eventData.CreatedAt!).getTime(),
      name: eventData.name!,
      description: eventData.description!,
      location: eventData.location!,
      date: new Date(eventData.date!).getTime(),
      end_date: eventData.end_date
        ? new Date(eventData.end_date).getTime()
        : undefined,
      organizationId: eventData.organization_id!,
      createdById: eventData.created_by!,
      organization: {
        id: eventData.organization.ID!,
        name: eventData.organization.name!,

        email: eventData.organization.email!,
        updatedAt: new Date(eventData.organization.UpdatedAt!).getTime(),
      } as IOrganization,
      form_field_description: eventData.form_field_description!,
      form_fields: eventData.form_fields?.map((formField: any) => {
        return {
          id: formField.ID!,
          event_id: formField.event_id!,
          name: formField.name!,
          description: formField.description!,
          is_required: formField.is_required!,
          type: formField.type!,
        };
      }) as IEventFormField[],
      ticketReleases: eventData.ticket_releases!.map((ticketRelease: any) => {
        return {
          id: ticketRelease.ID!,
          eventId: ticketRelease.event_id!,
          name: ticketRelease.name!,
          description: ticketRelease.description!,
          created_at: new Date(ticketRelease.CreatedAt!).getTime(),
          updated_at: new Date(ticketRelease.UpdatedAt!).getTime(),
          // Open and close are timestamps, convert to Date by multiplying by 1000
          open: new Date(ticketRelease.open! * 1000).getTime(),
          close: new Date(ticketRelease.close! * 1000).getTime(),
          is_reserved: ticketRelease.is_reserved!,
          promo_code: ticketRelease.promo_code!,
          allow_external: ticketRelease.allow_external!,
          tickets_available: ticketRelease.tickets_available!,
          has_allocated_tickets: ticketRelease.has_allocated_tickets!,
          ticketReleaseMethodDetailId:
            ticketRelease.ticket_release_method_detail_id!,
          payment_deadline:
            ticketRelease.payment_deadline &&
            ({
              id: ticketRelease.payment_deadline.ID!,
              ticket_release_id:
                ticketRelease.payment_deadline.ticket_release_id!,
              original_deadline: new Date(
                ticketRelease.payment_deadline.original_deadline!
              ),
              reserve_payment_duration:
                ticketRelease.payment_deadline.reserve_payment_duration!,
            } as ITicketReleasePaymentDeadline),
          addons: ticketRelease.add_ons?.map((addon: any) => {
            return {
              id: addon.ID!,
              ticket_release_id: addon.ticket_release_id!,
              name: addon.name!,
              description: addon.description!,
              contains_alcohol: addon.contains_alcohol!,
              price: addon.price!,
              max_quantity: addon.max_quantity!,
              is_enabled: addon.is_enabled!,
            } as IAddon;
          }) as IAddon[],
          ticketTypes: ticketRelease.ticket_types?.map((ticketType: any) => {
            return {
              id: ticketType.ID!,
              ticketReleaseId: ticketType.ticket_release_id!,
              name: ticketType.name!,
              description: ticketType.description!,
              price: ticketType.price!,
              isReserved: ticketType.is_reserved!,
            } as ITicketType;
          }),
          ticketReleaseMethodDetail: {
            id: ticketRelease.ticket_release_method_detail_id!,
            name: ticketRelease.ticket_release_method_detail.name!,
            maxTicketsPerUser:
              ticketRelease.ticket_release_method_detail.max_tickets_per_user!,
            cancellationPolicy:
              ticketRelease.ticket_release_method_detail.cancellation_policy!,
            openWindowDuration:
              ticketRelease.ticket_release_method_detail.open_window_duration! /
              60, // Since backend stores in seconds, convert to minutes
            method_description:
              ticketRelease.ticket_release_method_detail.method_description!,
            notificationMethod:
              ticketRelease.ticket_release_method_detail.notification_method!,
            ticketReleaseMethod: {
              id: ticketRelease.ticket_release_method_detail
                .ticket_release_method!.ID!,
              name: ticketRelease.ticket_release_method_detail!
                .ticket_release_method!.method_name!,
              description:
                ticketRelease.ticket_release_method_detail!
                  .ticket_release_method!.description!,
            } as ITicketReleaseMethod,
          } as ITicketReleaseMethodDetail,
        } as ITicketRelease;
      }),
    };

    yield put(getCustomerEventSuccess(event));
    yield put(setTimestamp(new Date(response.data.timestamp * 1000).getTime()));
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response.data.error || "An error occurred";
    yield put(
      getCustomerEventFailure({
        error: errorMessage,
        errorStatusCode: error.response.status,
      })
    );
  }
}

function* watchViewCustomerEventSaga() {
  yield takeLatest(getCustomerEventRequest.type, eventSaga);
}

export default watchViewCustomerEventSaga;
