// planEnrollmentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFreeRegisterFormValues } from "../../types";

interface PlanEnrollmentState {
  loading: boolean;
  error: string | null;
  createSuccess: boolean | null;
}

const initialState: PlanEnrollmentState = {
  loading: false,
  error: null,
  createSuccess: null,
};

const planEnrollmentSlice = createSlice({
  name: "planEnrollmentCreation",
  initialState,
  reducers: {
    createPlanEnrollmentRequest: (
      state,
      action: PayloadAction<IFreeRegisterFormValues>
    ) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = null;
    },
    createPlanEnrollmentSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.createSuccess = true;
    },
    createPlanEnrollmentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.createSuccess = false;
    },
  },
});

export const {
  createPlanEnrollmentRequest,
  createPlanEnrollmentSuccess,
  createPlanEnrollmentFailure,
} = planEnrollmentSlice.actions;

export default planEnrollmentSlice.reducer;
