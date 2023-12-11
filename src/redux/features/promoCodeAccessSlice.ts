import { createSlice } from "@reduxjs/toolkit";

interface PromoCodeAccessState {
  loading: boolean;
  error: string | null;
}

const promoCodeAccessSlice = createSlice({
  name: "promoCodeAccess",
  initialState: {
    loading: false,
    error: null,
  } as PromoCodeAccessState,
  reducers: {
    getPromoCodeAccessRequest: (state) => {
      state.loading = true;
    },
    getPromoCodeAccessSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    getPromoCodeAccessFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPromoCodeAccessRequest,
  getPromoCodeAccessSuccess,
  getPromoCodeAccessFailure,
} = promoCodeAccessSlice.actions;

export default promoCodeAccessSlice.reducer;
