import { all } from "redux-saga/effects";
import watchLoginSaga from "./authSaga";
import watchUserSagas from "./userSaga";
import watchListEventSaga from "./listEventSage";
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

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchUserSagas(),
    watchListEventSaga(),
    watchEventSaga(),
    watchTicketRequestSaga(),
    watchTicketsSaga(),
    watchTicketReleaseSaga(),
    watchFoodPreferences(),
    watchCreateOrganization(),
    watchFetchTicketReleaseMethods(),
    watchCreateEventSaga(),
    watchPromoCodeAccessSaga(),
    watchFetchTicketTypes(),
    // add other sagas here
  ]);
}
