// src/redux/foodUserFoodPreferencesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFoodPreference } from "../../types";

interface FoodUserFoodPreferencesState {
  foodPreferences: string[];
  userFoodPreferences: IFoodPreference[];
  additionalNotes: string;
  gdpr_agreed: boolean;
  loading: boolean;
  error: string | null;
  needs_to_renew_gdpr: boolean;
}

interface UpdateUserFoodPreferencesPayload {
  userFoodPreferences: IFoodPreference[];
  additionalNotes: string;
  gdpr_agreed: boolean;
}

const initialState: FoodUserFoodPreferencesState = {
  foodPreferences: [],
  userFoodPreferences: [],
  additionalNotes: "",
  gdpr_agreed: false,
  needs_to_renew_gdpr: false,
  loading: false,
  error: null,
};

export const foodUserFoodPreferencesSlice = createSlice({
  name: "foodUserFoodPreferences",
  initialState,
  reducers: {
    fetchUserFoodPreferencesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserFoodPreferencesSuccess: (
      state,
      action: PayloadAction<
        | UpdateUserFoodPreferencesPayload & {
            needs_to_renew_gdpr: boolean;
          }
      >
    ) => {
      state.userFoodPreferences = action.payload.userFoodPreferences;
      state.additionalNotes = action.payload.additionalNotes;
      state.gdpr_agreed = action.payload.gdpr_agreed;
      state.loading = false;
      state.needs_to_renew_gdpr = action.payload.needs_to_renew_gdpr;
    },
    fetchUserFoodPreferencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserFoodPreferencesStart: (
      state,
      action: PayloadAction<{
        foodPreferences: string[];
        additionalNotes: string;
        gdpr_agreed: boolean;
        needs_to_renew_gdpr: boolean;
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateUserFoodPreferencesSuccess: (
      state,
      action: PayloadAction<
        UpdateUserFoodPreferencesPayload & { needs_to_renew_gdpr: boolean }
      >
    ) => {
      state.userFoodPreferences = action.payload.userFoodPreferences;
      state.additionalNotes = action.payload.additionalNotes;
      state.gdpr_agreed = action.payload.gdpr_agreed;
      state.needs_to_renew_gdpr = action.payload.needs_to_renew_gdpr;
      state.loading = false;
    },
    updateUserFoodPreferencesFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserFoodPreferencesStart,
  fetchUserFoodPreferencesSuccess,
  fetchUserFoodPreferencesFailure,
  updateUserFoodPreferencesStart,
  updateUserFoodPreferencesSuccess,
  updateUserFoodPreferencesFailure,
} = foodUserFoodPreferencesSlice.actions;

export default foodUserFoodPreferencesSlice.reducer;
