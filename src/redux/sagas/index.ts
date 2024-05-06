import { all } from "redux-saga/effects";
import watchLoginSaga from "./authSaga";
import watchUserSagas from "./userSaga";
import watchListEventSaga from "./listEventSaga";
import watchEventSaga from "./eventSaga";
import watchTicketRequestSaga from "./ticketRequestSaga";
import { watchFoodPreferences } from "./userFoodPreferencesSaga";
import { watchCreateOrganization } from "./organizationSaga";
import { watchFetchTicketReleaseMethods } from "./ticketReleaseMethodSaga";
import watchCreateEventSaga from "./createEventSaga";
import watchPromoCodeAccessSaga from "./promoCodeAccessSaga";
import watchTicketsSaga from "./ticketsSaga";
import watchTicketReleaseSaga from "./ticketReleaseSaga";
import watchFetchTicketTypes from "./ticketTypeSaga";
import watchEventTicketsSaga from "./eventTicketsSaga";
import watchCustomerAuthSagas from "./customerAuthSaga";
import { listOrganizationsSaga } from "./listOrganizationsSlice";
import watchSalesReportSaga from "./salesReportSaga";
import watchGetAddonSaga from "./addonSaga";
import bankingDetailsSaga from "./bankingDetailsSaga";
import watchViewCustomerEventSaga from "./customerViewEventSaga";
import { watchGuestCustomerCreateTicketRequestSaga } from "./ticketRequestGuestSaga";
import { watchGuestSaga } from "./guestSaga";
import { watchCreatePlanEnrollmentSaga } from "./createPlanEnrollmentSaga";
import watchListNetworkEventSaga from "./manager/listNetworkEventsSaga";
import watchNetworkSaga from "./manager/networkSaga";

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchUserSagas(),
    watchListEventSaga(),
    watchListNetworkEventSaga(),
    watchEventSaga(),
    watchTicketRequestSaga(),
    watchTicketsSaga(),
    watchTicketReleaseSaga(),
    watchFoodPreferences(),
    watchCreateOrganization(),
    watchSalesReportSaga(),
    watchFetchTicketReleaseMethods(),
    watchCreateEventSaga(),
    watchPromoCodeAccessSaga(),
    watchFetchTicketTypes(),
    watchEventTicketsSaga(),
    watchCustomerAuthSagas(),
    listOrganizationsSaga(),
    watchGetAddonSaga(),
    bankingDetailsSaga(),
    watchViewCustomerEventSaga(),
    watchCreatePlanEnrollmentSaga(),
    watchGuestCustomerCreateTicketRequestSaga(),
    watchGuestSaga(),
    watchNetworkSaga(),
    // add other sagas here
  ]);
}
