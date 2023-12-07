import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import {
  IOrganization,
  IOrganizationUser,
  OrganizationUserRole,
} from "../../types";

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
  error: string | null;
}

const initialState: OrganizationState = {
  loading: false,
  organization: null,
  organizationUsers: [],
  organizations: [],
  error: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    getOrganizationsRequest: (state) => {
      state.loading = true;
    },
    getOrganizationsSuccess: (
      state,
      action: PayloadAction<IOrganization[]>
    ) => {
      state.loading = false;
      state.organizations = action.payload;
      state.error = null;
    },
    getOrganizationsFailure: (state, action: PayloadAction<string>) => {
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
  },
});

export const {
  getOrganizationsRequest,
  getOrganizationsSuccess,
  getOrganizationsFailure,
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
  getOrganizationUsersRequest,
  getOrganizationUsersSuccess,
  getOrganizationUsersFailure,
} = organizationSlice.actions;

export default organizationSlice.reducer;
