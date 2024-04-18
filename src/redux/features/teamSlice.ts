import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { IEvent, ITeam, ITeamUser, TeamUserRole } from "../../types";
import { stat } from "fs";

export interface ChangeUserRolePayload {
  teamId: number;
  username: string;
  newRole: TeamUserRole;
}

interface TeamState {
  loading: boolean;
  team: any | null;
  teams: ITeam[] | null;
  teamUsers: ITeamUser[] | null;
  teamEvents: IEvent[] | null;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: TeamState = {
  loading: false,
  team: null,
  teamUsers: [],
  teams: [],
  teamEvents: [],
  error: null,
  updateSuccess: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    getMyTeamsRequest: (state) => {
      state.loading = true;
    },
    getMyTeamsSuccess: (state, action: PayloadAction<ITeam[]>) => {
      state.loading = false;
      state.teams = action.payload;
      state.error = null;
    },
    getMyTeamsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTeamRequest: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
      }>
    ) => {
      state.loading = true;
    },
    createTeamSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.team = action.payload;
      state.error = null;
    },
    createTeamFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTeamUsersRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getTeamUsersSuccess: (state, action: PayloadAction<ITeamUser[]>) => {
      state.loading = false;
      state.teamUsers = action.payload;
      state.error = null;
    },
    getTeamUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Events
    getTeamEventsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getTeamEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.loading = false;
      state.teamEvents = action.payload;
      state.error = null;
    },
    getTeamEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTeamRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteTeamSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteTeamFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTeamStart: (
      state,
      action: PayloadAction<{ id: number; name: string; email: string }>
    ) => {
      state.loading = true;
      state.updateSuccess = false;
    },
    updateTeamSuccess: (state, action: PayloadAction<ITeam>) => {
      state.loading = false;
      state.team = action.payload;
      state.error = null;
      state.updateSuccess = true;
    },
    updateTeamFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.updateSuccess = false;
    },
  },
});

export const {
  getMyTeamsRequest,
  getMyTeamsSuccess,
  getMyTeamsFailure,
  createTeamRequest,
  createTeamSuccess,
  createTeamFailure,
  getTeamUsersRequest,
  getTeamUsersSuccess,
  getTeamUsersFailure,
  getTeamEventsRequest,
  getTeamEventsSuccess,
  getTeamEventsFailure,
  deleteTeamRequest,
  deleteTeamSuccess,
  deleteTeamFailure,
  updateTeamStart,
  updateTeamSuccess,
  updateTeamFailure,
} = teamSlice.actions;

export default teamSlice.reducer;
