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
import { toast } from "react-toastify";
import { mapUserFoodPreferences } from "../../utils/food_preferences_conversions";

function* fetchUserFoodPreferences(): Generator<any, void, any> {
  try {
    console.log("fetchUserFoodPreferences");
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/user-food-preferences`,
      { withCredentials: true }
    );

    const data = response.data.user_food_preference;

    const userFoodPreferences: IFoodPreference[] = mapUserFoodPreferences(
      FoodPreferences,
      data
    );

    yield put(
      fetchUserFoodPreferencesSuccess({
        userFoodPreferences,
        additionalNotes: data.additional_info,
      })
    );
  } catch (error: any) {
    yield put(fetchUserFoodPreferencesFailure(error.message));
  }
}

function* updateUserFoodPreferences(
  action: PayloadAction<{ foodPreferences: string[]; additionalNotes: string }>
): Generator<any, void, any> {
  try {
    const { foodPreferences, additionalNotes } = action.payload;
    // Each of the values in the array should be true in  the new object
    let userFoodPreferences: { [key: string]: boolean | string } =
      FoodPreferences.reduce(
        (acc: { [key: string]: boolean }, foodPreference) => {
          acc[foodPreference.id] = foodPreferences.includes(foodPreference.id);

          return acc;
        },
        {}
      );

    userFoodPreferences.additional_info = additionalNotes;

    console.log(userFoodPreferences);

    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/user-food-preferences`,
      userFoodPreferences,
      { withCredentials: true }
    );

    if (response.status === 200) {
      const newUserFoodPreferences: IFoodPreference[] = mapUserFoodPreferences(
        FoodPreferences,
        userFoodPreferences
      );

      console.log(newUserFoodPreferences);
      yield put(
        updateUserFoodPreferencesSuccess({
          userFoodPreferences: newUserFoodPreferences,
          additionalNotes: userFoodPreferences.additional_info,
        })
      );
      toast.success("Food preferences updated successfully");
    } else {
      yield put(updateUserFoodPreferencesFailure(response.data.error));
    }
  } catch (error: any) {
    const errorMessage: string = error.response.data.error || error.message;
    toast.error(errorMessage);
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
