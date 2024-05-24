import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

interface DrawerState {
  isPinned: boolean;
}

const initialState: DrawerState = {
  isPinned: false,
};

const drawerSlice = createSlice({
  name: "drawerPinned",
  initialState,
  reducers: {
    setPinned: (state, action: PayloadAction<boolean>) => {
      state.isPinned = action.payload;
    },
  },
  extraReducers: {
    // Handle the rehydration action
    [REHYDRATE]: (state, action) => {
      if (action.payload) {
        return {
          isPinned: action.payload.drawerPinned.isPinned,
        };
      }
      return state;
    },
  },
});

export const { setPinned } = drawerSlice.actions;

export default drawerSlice.reducer;
