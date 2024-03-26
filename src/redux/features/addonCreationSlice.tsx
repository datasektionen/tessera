import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAddon } from "../../types";

// Assuming you have predefined initial values for an addon
export const AddonInitialValues: IAddon = {
  id: 0,
  name: "Default",
  description: "",
  contains_alcohol: false,
  price: 0,
  max_quantity: 1,
  is_enabled: true,
};

interface AddonCreationState {
  addons: IAddon[];
  selectedAddon: number; // index of addons array
  loading: boolean;
  error: string;
}

const initialState: AddonCreationState = {
  addons: [AddonInitialValues],
  selectedAddon: 0,
  loading: false,
  error: "",
};

const addonCreationSlice = createSlice({
  name: "addonCreation",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<IAddon[]>) => {
      state.addons = action.payload;
    },
    setSelectedAddon: (state, action: PayloadAction<number>) => {
      state.selectedAddon = action.payload;
    },
    addAddon: (state) => {
      state.addons.push({ ...AddonInitialValues });
    },
    updateAddon: (
      state,
      action: PayloadAction<{
        index: number;
        values: IAddon;
      }>
    ) => {
      state.addons[action.payload.index] = action.payload.values;
    },
    removeAddon: (state, action: PayloadAction<number>) => {
      state.addons = state.addons.filter(
        (addon, index) => index !== action.payload
      );
    },
    clearAddon: (state, action: PayloadAction<number>) => {
      // Reset the addon to its initial values, preserving ticket_release_id
      const ticketReleaseId = state.addons[action.payload].ticket_release_id;
      state.addons[action.payload] = {
        ...AddonInitialValues,
        ticket_release_id: ticketReleaseId,
      };
    },
    resetAddons: (state) => {
      state.addons = [AddonInitialValues];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteAddonRequest: (
      state,
      action: PayloadAction<{
        addonID: number;
        eventID: number;
        ticketReleaseID: number;
      }>
    ) => {
      state.loading = true;
    },
    deleteAddonSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      console.log("Addon deleted successfully");
      console.log(state.addons);
    },
    deleteAddonFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAddons,
  setSelectedAddon,
  setLoading,
  setError,
  addAddon,
  removeAddon,
  updateAddon,
  clearAddon,
  resetAddons,
  deleteAddonRequest,
  deleteAddonSuccess,
  deleteAddonFailure,
} = addonCreationSlice.actions;

export default addonCreationSlice.reducer;
