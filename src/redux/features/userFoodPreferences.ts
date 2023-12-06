// src/redux/foodUserFoodPreferencesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFoodPreference } from "../../types";

interface FoodUserFoodPreferencesState {
  foodPreferences: string[];
  userFoodPreferences: IFoodPreference[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodUserFoodPreferencesState = {
  foodPreferences: [],
  userFoodPreferences: [],
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
      action: PayloadAction<IFoodPreference[]>
    ) => {
      state.userFoodPreferences = action.payload;
      state.loading = false;
    },
    fetchUserFoodPreferencesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserFoodPreferencesStart: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateUserFoodPreferencesSuccess: (
      state,
      action: PayloadAction<IFoodPreference[]>
    ) => {
      state.userFoodPreferences = action.payload;
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
