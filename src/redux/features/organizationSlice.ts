import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

interface OrganizationState {
  loading: boolean;
  organization: any | null;
  error: string | null;
}

const initialState: OrganizationState = {
  loading: false,
  organization: null,
  error: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
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
  },
});

export const {
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
} = organizationSlice.actions;

export default organizationSlice.reducer;
