import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUserFoodPreferencesFailure,
  fetchUserFoodPreferencesStart,
  fetchUserFoodPreferencesSuccess,
  updateUserFoodPreferencesFailure,
  updateUserFoodPreferencesStart,
  updateUserFoodPreferencesSuccess,
} from "../features/userFoodPreferences";
import { PayloadAction } from "@reduxjs/toolkit";
import { FoodPreferences, IFoodPreference } from "../../types";

function* fetchUserFoodPreferences(): Generator<any, void, any> {
  try {
    console.log("fetchUserFoodPreferences");
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/user-food-preferences`,
      { withCredentials: true }
    );

    const data = response.data.user_food_preference;

    const userFoodPreferences: IFoodPreference[] = FoodPreferences.map(
      (foodPreference) => {
        return {
          ...foodPreference,
          checked: data[foodPreference.id],
        };
      }
    );

    yield put(fetchUserFoodPreferencesSuccess(userFoodPreferences));
  } catch (error: any) {
    console.log(error.message);
    yield put(fetchUserFoodPreferencesFailure(error.message));
  }
}

function* updateUserFoodPreferences(
  action: PayloadAction<string[]>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/user-food-preferences`,
      action.payload,
      { withCredentials: true }
    );
    yield put(updateUserFoodPreferencesSuccess(response.data));
  } catch (error: any) {
    yield put(updateUserFoodPreferencesFailure(error.message));
  }
}

export function* watchFoodPreferences() {
  yield takeEvery(fetchUserFoodPreferencesStart.type, fetchUserFoodPreferences);
  yield takeEvery(
    updateUserFoodPreferencesStart.type,
    updateUserFoodPreferences
  );
}
