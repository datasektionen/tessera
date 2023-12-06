import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
} from "./../features/organizationSlice";
import axios from "axios";
import { toast } from "react-toastify";

function* createOrganizationSaga(
  action: PayloadAction<{ name: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/organizations`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    console.log(response);

    if (response.status == 201) {
      toast.success("Organization created!");
      yield put(createOrganizationSuccess(response));
    } else {
      toast.error("Something went wrong!");
      yield put(createOrganizationFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(createOrganizationFailure(error.message));
  }
}

export function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRequest.type, createOrganizationSaga);
}
