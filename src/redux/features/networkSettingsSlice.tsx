import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { INetworkSettings, INetworkSettingsInput } from "../../types";

interface NetworkSettingsState {
  settings: INetworkSettings | null;
  loading: boolean;
  error: string | null;
  fileUploadProgress: number;
}

const initialState: NetworkSettingsState = {
  settings: null,
  loading: false,
  error: null,
  fileUploadProgress: 0,
};

export const updateUploadProgress = createAction<number>(
  "networkSettings/updateUploadProgress"
);

const networkSettingsSlice = createSlice({
  name: "networkSettings",
  initialState,
  reducers: {
    updateNetworkSettingsRequest: (
      state,
      action: PayloadAction<Omit<INetworkSettingsInput, "logo">>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateNetworkSettingsSuccess: (
      state,
      action: PayloadAction<INetworkSettings>
    ) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateNetworkSettingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadLogoRequest: (state, action: PayloadAction<File>) => {
      state.loading = true;
      state.error = null;
      state.fileUploadProgress = 0;
    },
    uploadLogoSuccess: (state, action: PayloadAction<string>) => {
      if (state.settings) {
        state.settings.logo = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.fileUploadProgress = 100;
    },
    uploadLogoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.fileUploadProgress = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUploadProgress, (state, action) => {
      state.fileUploadProgress = action.payload;
    });
  },
});

export const {
  updateNetworkSettingsRequest,
  updateNetworkSettingsSuccess,
  updateNetworkSettingsFailure,
  uploadLogoRequest,
  uploadLogoSuccess,
  uploadLogoFailure,
} = networkSettingsSlice.actions;

export default networkSettingsSlice.reducer;
