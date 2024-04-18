// src/redux/teamsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ITeam } from "../../types";

interface TeamsState {
  teams: ITeam[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

const listTeamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    listTeamsStart: (state) => {
      state.loading = true;
    },
    listTeamsSuccess: (state, action: PayloadAction<ITeam[]>) => {
      state.loading = false;
      state.teams = action.payload;
    },
    listTeamsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { listTeamsStart, listTeamsSuccess, listTeamsFailure } =
  listTeamsSlice.actions;

export default listTeamsSlice.reducer;
