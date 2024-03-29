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
        gdpr_agreed: data.gdpr_agreed,
        needs_to_renew_gdpr: data.needs_to_renew_gdpr,
      })
    );
  } catch (error: any) {
    yield put(fetchUserFoodPreferencesFailure(error.message));
  }
}

function* updateUserFoodPreferences(
  action: PayloadAction<{
    foodPreferences: string[];
    additionalNotes: string;
    gdpr_agreed: boolean;
    needs_to_renew_gdpr: boolean;
  }>
): Generator<any, void, any> {
  try {
    const {
      foodPreferences,
      additionalNotes,
      gdpr_agreed,
      needs_to_renew_gdpr,
    } = action.payload;
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
    userFoodPreferences.gdpr_agreed = gdpr_agreed;
    userFoodPreferences.needs_to_renew_gdpr = needs_to_renew_gdpr;

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

      let new_gdpr_agreed: boolean;
      let new_needs_to_renew_gdpr: boolean;
      if (needs_to_renew_gdpr && gdpr_agreed) {
        new_gdpr_agreed = true;
        new_needs_to_renew_gdpr = false;
      } else if (!needs_to_renew_gdpr && gdpr_agreed) {
        new_gdpr_agreed = true;
        new_needs_to_renew_gdpr = false;
      } else {
        new_gdpr_agreed = gdpr_agreed;
        new_needs_to_renew_gdpr = needs_to_renew_gdpr;
      }

      yield put(
        updateUserFoodPreferencesSuccess({
          userFoodPreferences: newUserFoodPreferences,
          additionalNotes: userFoodPreferences.additional_info,
          gdpr_agreed: new_gdpr_agreed,
          needs_to_renew_gdpr: new_needs_to_renew_gdpr,
        })
      );
      toast.success("Food preferences updated successfully");
    } else {
      toast.error(response.data.error);
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
