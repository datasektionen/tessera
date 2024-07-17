import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PALLETTE from "../../theme/pallette";
import { RootState } from "../../store";
import { isColorDark } from "../../utils/manager/color";

interface ManagerThemeState {
  main_color: string;
  accent_color: string;
  text_color: string;
}

const initialState: ManagerThemeState = {
  main_color: PALLETTE.cerise,
  accent_color: PALLETTE.cerise_dark,
  text_color: PALLETTE.charcoal,
};

const managerThemeSlice = createSlice({
  name: "managerTheme",
  initialState,
  reducers: {
    setMainColor: (state, action: PayloadAction<string>) => {
      state.main_color = action.payload;
      state.text_color = isColorDark(action.payload)
        ? PALLETTE.white
        : PALLETTE.charcoal;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accent_color = action.payload;
    },
    setTextColor: (state, action: PayloadAction<string>) => {
      state.text_color = action.payload;
    },
    setThemeColors: (
      state,
      action: PayloadAction<Partial<ManagerThemeState>>
    ) => {
      if (action.payload.main_color) {
        state.main_color = action.payload.main_color;
        state.text_color = isColorDark(action.payload.main_color)
          ? PALLETTE.white
          : PALLETTE.charcoal;
      }
      if (action.payload.accent_color) {
        state.accent_color = action.payload.accent_color;
      }
      if (action.payload.text_color) {
        state.text_color = action.payload.text_color;
      }
    },
    resetTheme: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setMainColor,
  setAccentColor,
  setTextColor,
  setThemeColors,
  resetTheme,
} = managerThemeSlice.actions;

// Selectors
export const selectManagerTheme = (state: RootState) => state.managerTheme;
export const selectMainColor = (state: RootState) =>
  state.managerTheme.main_color;
export const selectAccentColor = (state: RootState) =>
  state.managerTheme.accent_color;
export const selectTextColor = (state: RootState) =>
  state.managerTheme.text_color;

export default managerThemeSlice.reducer;
