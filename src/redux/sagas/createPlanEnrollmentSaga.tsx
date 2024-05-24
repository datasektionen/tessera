// planEnrollmentSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createPlanEnrollmentFailure,
  createPlanEnrollmentRequest,
  createPlanEnrollmentSuccess,
} from "../features/createPlanEnrollmentSlice";

function* createPlanEnrollmentSaga(
  action: ReturnType<typeof createPlanEnrollmentRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/plan-enrollments/free`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      // Create success
      yield put(createPlanEnrollmentSuccess());
    }
  } catch (error: any) {
    const errorMessage =
      error.response.data.error || error.message || "An error occurred";
    toast.error(errorMessage);

    yield put(createPlanEnrollmentFailure(errorMessage));
  }
}

export function* watchCreatePlanEnrollmentSaga() {
  yield takeEvery(createPlanEnrollmentRequest.type, createPlanEnrollmentSaga);
}
