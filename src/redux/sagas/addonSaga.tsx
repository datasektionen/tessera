import { call, put, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { IAddon } from "../../types";
import {
  getAddonsFailure,
  getAddonsRequest,
  getAddonsSuccess,
} from "../features/addonSlice";
import { ActionPattern } from "redux-saga";

function* handleGetAddons(action: {
  eventID: number;
  ticketReleaseID: number;
}): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/events/${action.eventID}/ticket-releases/${action.ticketReleaseID}/addons`
    );

    const addons: IAddon[] = response.data.add_ons.map((addon: any) => {
      return {
        id: addon.id,
        name: addon.name,
        description: addon.description,
        min_quantity: addon.min_quantity,
        max_quantity: addon.max_quantity,
        price: addon.price,
        is_enabled: addon.is_enabled,
        ticket_release_id: addon.ticket_release_id,
      } as IAddon;
    });

    yield put(getAddonsSuccess(addons));
  } catch (error: any) {
    const errorStatusCode = error.response.status;
    const errorMessage = error.response.data.error || error.message;
    yield put(
      getAddonsFailure({
        error: errorMessage,
        errorStatusCode,
      })
    );
  }
}
// ... existing code ...

function* watchGetAddonsSaga() {
  yield takeLatest<ActionPattern>(getAddonsRequest.type, handleGetAddons);
}

export default watchGetAddonsSaga;
