// src/redux/organizationsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IOrganization } from "../../types";

interface OrganizationsState {
  organizations: IOrganization[];
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationsState = {
  organizations: [],
  loading: false,
  error: null,
};

const listOrganizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    listOrganizationsStart: (state) => {
      state.loading = true;
    },
    listOrganizationsSuccess: (
      state,
      action: PayloadAction<IOrganization[]>
    ) => {
      state.loading = false;
      state.organizations = action.payload;
    },
    listOrganizationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  listOrganizationsStart,
  listOrganizationsSuccess,
  listOrganizationsFailure,
} = listOrganizationsSlice.actions;

export default listOrganizationsSlice.reducer;
