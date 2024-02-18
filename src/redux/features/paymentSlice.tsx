import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  success: boolean;
}

const initialState: PaymentState = {
  success: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    clearPaymentSuccess: (state) => {
      state.success = false;
    },
  },
});

export const { setPaymentSuccess, clearPaymentSuccess } = paymentSlice.actions;

export default paymentSlice.reducer;
