import { all } from "redux-saga/effects";
import watchLoginSaga from "./authSaga";
import watchUserSagas from "./userSaga";
import watchListEventSaga from "./listEventSage";
import watchEventSaga from "./eventSaga";
import watchTicdketRequestSaga from "./ticketRequestSaga";
import { watchFoodPreferences } from "./userFoodPreferencesSaga";
import { watchCreateOrganization } from "./organizationSaga";
import { watchFetchTicketReleaseMethods } from "./ticketReleaseMethodSaga";
import watchCreateEventSaga from "./createEventSaga";

export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchUserSagas(),
    watchListEventSaga(),
    watchEventSaga(),
    watchTicdketRequestSaga(),
    watchFoodPreferences(),
    watchCreateOrganization(),
    watchFetchTicketReleaseMethods(),
    watchCreateEventSaga(),
    // add other sagas here
  ]);
}
