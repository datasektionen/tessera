// src/redux/foodUserFoodPreferencesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFoodPreference } from "../../types";

interface FoodUserFoodPreferencesState {
  foodPreferences: string[];
  userFoodPreferences: IFoodPreference[];
  additionalNotes: string;
  loading: boolean;
  error: string | null;
}

interface UpdateUserFoodPreferencesPayload {
  userFoodPreferences: IFoodPreference[];
  additionalNotes: string;
}

const initialState: FoodUserFoodPreferencesState = {
  foodPreferences: [],
  userFoodPreferences: [],
  additionalNotes: "",
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
      action: PayloadAction<UpdateUserFoodPreferencesPayload>
    ) => {
      state.userFoodPreferences = action.payload.userFoodPreferences;
      state.additionalNotes = action.payload.additionalNotes;
      state.loading = false;
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
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateUserFoodPreferencesSuccess: (
      state,
      action: PayloadAction<UpdateUserFoodPreferencesPayload>
    ) => {
      state.userFoodPreferences = action.payload.userFoodPreferences;
      state.additionalNotes = action.payload.additionalNotes;
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
