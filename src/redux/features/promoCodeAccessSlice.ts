import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGuestCustomer } from "../../types";

interface PromoCodeAccessData {
  promo_code: string;
  eventId: number;
  isGuestCustomer?: boolean;
  guestCustomer?: IGuestCustomer | null;
}

interface PromoCodeAccessState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const promoCodeAccessSlice = createSlice({
  name: "promoCodeAccess",
  initialState: {
    loading: false,
    error: null,
    success: false,
  } as PromoCodeAccessState,
  reducers: {
    getPromoCodeAccessRequest: (
      state,
      action: PayloadAction<PromoCodeAccessData>
    ) => {
      state.loading = true;
    },
    getPromoCodeAccessSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    getPromoCodeAccessFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  getPromoCodeAccessRequest,
  getPromoCodeAccessSuccess,
  getPromoCodeAccessFailure,
  resetSuccess,
} = promoCodeAccessSlice.actions;

export default promoCodeAccessSlice.reducer;
