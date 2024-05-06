import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, INetwork, ListEventState } from "../../../types";

interface NetworkState {
  network: INetwork | null;
  loading: boolean;
  error: string | null;
}

const initialState: NetworkState = {
  network: null,
  loading: false,
  error: null,
};

const networkSlice = createSlice({
  name: "managerNetwork",
  initialState,
  reducers: {
    getNetworkRequest: (state) => {
      if (state.loading) return;
      state.loading = true;
    },
    getNetworkSuccess: (state, action: PayloadAction<INetwork>) => {
      state.loading = false;
      state.network = action.payload;
    },
    getNetworkFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getNetworkRequest, getNetworkSuccess, getNetworkFailure } =
  networkSlice.actions;

export default networkSlice.reducer;
