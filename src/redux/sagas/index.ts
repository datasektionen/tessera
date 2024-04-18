import { all } from "redux-saga/effects";
import watchLoginSaga from "./authSaga";
import watchUserSagas from "./userSaga";
import watchListEventSaga from "./listEventSaga";
import watchEventSaga from "./eventSaga";
import watchTicketRequestSaga from "./ticketRequestSaga";
import { watchFoodPreferences } from "./userFoodPreferencesSaga";
import { watchCreateTeam } from "./teamSaga";
import { watchFetchTicketReleaseMethods } from "./ticketReleaseMethodSaga";
import watchCreateEventSaga from "./createEventSaga";
import watchPromoCodeAccessSaga from "./promoCodeAccessSaga";
import watchTicketsSaga from "./ticketsSaga";
import watchTicketReleaseSaga from "./ticketReleaseSaga";
import watchFetchTicketTypes from "./ticketTypeSaga";
import watchEventTicketsSaga from "./eventTicketsSaga";
import watchExternalAuthSagas from "./externalAuthSaga";
import { listTeamsSaga } from "./listTeamsSlice";
import watchSalesReportSaga from "./salesReportSaga";
import watchGetAddonSaga from "./addonSaga";
import bankingDetailsSaga from "./bankingDetailsSaga";

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
    watchCreateTeam(),
    watchSalesReportSaga(),
    watchFetchTicketReleaseMethods(),
    watchCreateEventSaga(),
    watchPromoCodeAccessSaga(),
    watchFetchTicketTypes(),
    watchEventTicketsSaga(),
    watchExternalAuthSagas(),
    listTeamsSaga(),
    watchGetAddonSaga(),
    bankingDetailsSaga(),
    // add other sagas here
  ]);
}
