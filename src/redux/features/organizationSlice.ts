import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {
  IEvent,
  IOrganization,
  IOrganizationUser,
  OrganizationUserRole,
} from "../../types";
import { stat } from "fs";

export interface ChangeUserRolePayload {
  organizationId: number;
  username: string;
  newRole: OrganizationUserRole;
}

interface OrganizationState {
  loading: boolean;
  organization: any | null;
  organizations: IOrganization[] | null;
  organizationUsers: IOrganizationUser[] | null;
  organizationEvents: IEvent[] | null;
  error: string | null;
}

const initialState: OrganizationState = {
  loading: false,
  organization: null,
  organizationUsers: [],
  organizations: [],
  organizationEvents: [],
  error: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    getMyOrganizationsRequest: (state) => {
      state.loading = true;
    },
    getMyOrganizationsSuccess: (
      state,
      action: PayloadAction<IOrganization[]>
    ) => {
      state.loading = false;
      state.organizations = action.payload;
      state.error = null;
    },
    getMyOrganizationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrganizationRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    createOrganizationSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.organization = action.payload;
      state.error = null;
    },
    createOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getOrganizationUsersRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getOrganizationUsersSuccess: (
      state,
      action: PayloadAction<IOrganizationUser[]>
    ) => {
      state.loading = false;
      state.organizationUsers = action.payload;
      state.error = null;
    },
    getOrganizationUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Events
    getOrganizationEventsRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getOrganizationEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.loading = false;
      state.organizationEvents = action.payload;
      state.error = null;
    },
    getOrganizationEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrganizationRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteOrganizationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMyOrganizationsRequest,
  getMyOrganizationsSuccess,
  getMyOrganizationsFailure,
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
  getOrganizationUsersRequest,
  getOrganizationUsersSuccess,
  getOrganizationUsersFailure,
  getOrganizationEventsRequest,
  getOrganizationEventsSuccess,
  getOrganizationEventsFailure,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFailure,
} = organizationSlice.actions;

export default organizationSlice.reducer;
