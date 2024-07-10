import { call, put, takeLatest, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { INetworkSettings, INetworkSettingsInput } from "../../../types";
import {
  updateNetworkSettingsRequest,
  updateNetworkSettingsSuccess,
  updateNetworkSettingsFailure,
  uploadLogoRequest,
  uploadLogoSuccess,
  uploadLogoFailure,
  updateUploadProgress,
} from "../../features/networkSettingsSlice";
import { ApiResponse, putApi } from "../../../utils/api/api";
import axios, { AxiosProgressEvent } from "axios";
import { RootState } from "../../../store";
import { toast } from "react-toastify";

// Selector to get the network ID from the state
const getNetworkId = (state: RootState) => state.network.network?.id;

function* updateNetworkSettingsSaga(
  action: PayloadAction<INetworkSettingsInput>
): Generator<any, void, any> {
  try {
    const networkId: number = yield select(getNetworkId);
    if (!networkId) {
      throw new Error("Network ID not found");
    }

    const response: ApiResponse<{
      settings: INetworkSettings;
    }> = yield call(
      putApi,
      `/manager/network/${networkId}/settings`,
      action.payload,
      true,
      false
    );

    if (response.status === "success") {
      yield put(updateNetworkSettingsSuccess(response.data.settings));
      toast.success("Network settings updated successfully");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "An error occurred";
    yield put(updateNetworkSettingsFailure(errorMessage));
  }
}

function uploadLogoApi(
  networkId: number,
  file: File,
  progressCallback: (progress: number) => void
) {
  const formData = new FormData();
  formData.append("logo", file);

  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/manager/network/${networkId}/logo`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          progressCallback(percentCompleted);
        }
      },
    }
  );
}

function* uploadLogoSaga(
  action: PayloadAction<File>
): Generator<any, void, any> {
  try {
    const networkId: number = yield select(getNetworkId);
    if (!networkId) {
      throw new Error("Network ID not found");
    }

    const response: ApiResponse<{ logo_url: string }> = yield call(
      uploadLogoApi,
      networkId,
      action.payload,
      function* (progress: number) {
        yield put(updateUploadProgress(progress));
      }
    );

    if (
      response.data &&
      response.data.logo_url &&
      response.status === "success"
    ) {
      yield put(uploadLogoSuccess(response.data.logo_url));
      toast.success("Logo uploaded successfully");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "An error occurred";
    yield put(uploadLogoFailure(errorMessage));
  }
}

function* watchNetworkSettingsSaga() {
  yield takeLatest(
    updateNetworkSettingsRequest.type,
    updateNetworkSettingsSaga
  );
  yield takeLatest(uploadLogoRequest.type, uploadLogoSaga);
}

export default watchNetworkSettingsSaga;
