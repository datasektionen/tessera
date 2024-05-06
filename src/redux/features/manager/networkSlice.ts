import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, INetwork, ListEventState } from "../../../types";

interface NetworkState {
  network: INetwork | null;
  loading: boolean;
  error: string | null;
}

const initialState: NetworkState = {
  network: null,
  loading: true,
  error: null,
};

const networkSlice = createSlice({
  name: "managerNetwork",
  initialState,
  reducers: {
    getNetworkRequest: (state) => {
      state.loading = true;
      state.network = null;
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