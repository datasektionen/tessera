import { call, put, take, takeLatest } from "redux-saga/effects";

import axios from "axios";
import { IAddon } from "../../types";
import {
  getAddonsFailure,
  getAddonsRequest,
  getAddonsSuccess,
} from "../features/addonSlice";
import {
  deleteAddonFailure,
  deleteAddonRequest,
  deleteAddonSuccess,
  removeAddon,
} from "../features/addonCreationSlice";
import { toast } from "react-toastify";
import { remove } from "lodash";

function* handleGetAddons(action: any): Generator<any, void, any> {
  try {
    const { eventID, ticketReleaseID } = action.payload;

    // "/events/:eventID/ticket-release/:ticketReleaseID/add-ons",
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/ticket-release/${ticketReleaseID}/add-ons`,
      {
        withCredentials: true,
      }
    );

    const addons: IAddon[] = response.data.add_ons.map((addon: any) => {
      return {
        id: addon.ID,
        name: addon.name,
        description: addon.description,
        contains_alcohol: addon.contains_alcohol,
        max_quantity: addon.max_quantity,
        price: addon.price,
        is_enabled: addon.is_enabled,
        ticket_release_id: addon.ticket_release_id,
      } as IAddon;
    });

    console.log(addons);

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

function* deleteAndRefreshAddonsSaga(action: any): Generator<any, void, any> {
  try {
    const { eventID, ticketReleaseID, addonID } = action.payload;

    // "/events/:eventID/ticket-release/:ticketReleaseID/add-ons/:addonID",
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/ticket-release/${ticketReleaseID}/add-ons/${addonID}`,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to delete addon");
    }

    setTimeout(() => {
      toast.success("Addon deleted successfully");
    }, 250);

    yield put(removeAddon(addonID));
    yield put(deleteAddonSuccess(addonID));

    // If deleteAddonSuccess action is dispatched, dispatch getAddonsRequest action
    // yield put(
    //   getAddonsRequest({
    //     eventID: action.eventID,
    //     ticketReleaseID: action.ticketReleaseID,
    //   })
    // );
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    setTimeout(() => {
      toast.success("Failed to delete addon");
    }, 250);
    yield put(deleteAddonFailure(errorMessage));
  }
}

function* watchGetAddonSaga() {
  yield takeLatest(getAddonsRequest.type, handleGetAddons);
  yield takeLatest(deleteAddonRequest.type, deleteAndRefreshAddonsSaga);
}

export default watchGetAddonSaga;
