import { takeEvery, call, put } from "redux-saga/effects";
import {
  getBankingDetailsRequest,
  getBankingDetailsSuccess,
  getBankingDetailsFailure,
  submitBankingDetailsRequest,
  submitBankingDetailsSuccess,
  submitBankingDetailsFailure,
  deleteBankingDetailsRequest,
  deleteBankingDetailsSuccess,
  deleteBankingDetailsFailure,
} from "../features/bankingDetailsSlice";
import { IBankingDetails } from "../../types";
import api from "../api/bankingDetailApi";
import { toast } from "react-toastify";

function* getBankingDetails(
  action: ReturnType<typeof getBankingDetailsRequest>
): Generator<any, void, any> {
  try {
    const data: any = yield call(
      api.getBankingDetails,
      action.payload.organizationID
    );

    const bankingDetails: IBankingDetails = {
      id: data.ID,
      account_holder: data.account_holder,
      bank_name: data.bank_name,
      account_number: data.account_number,
      clearing_number: data.clearing_number,
      organization_id: data.organization_id,
      updated_at: new Date(data.UpdatedAt),
      created_at: new Date(data.CreatedAt),
    };

    yield put(getBankingDetailsSuccess(bankingDetails));
  } catch (error: any) {
    const errorMessage =
      error.response.data.error || error.message || "Something went wrong!";
    toast.error(errorMessage);
    yield put(getBankingDetailsFailure({ error: errorMessage }));
  }
}

function* submitBankingDetails(
  action: ReturnType<typeof submitBankingDetailsRequest>
): Generator<any, void, any> {
  try {
    yield call(
      api.submitBankingDetails,
      action.payload.organizationID,
      action.payload.bankingDetails
    );
    yield put(submitBankingDetailsSuccess());
  } catch (error: any) {
    const errorMessage =
      error.response.data.error || error.message || "Something went wrong!";
    toast.error(errorMessage);
    yield put(submitBankingDetailsFailure({ error: errorMessage }));
  }
}

function* deleteBankingDetails(
  action: ReturnType<typeof deleteBankingDetailsRequest>
): Generator<any, void, any> {
  try {
    const bankingDetails: IBankingDetails = yield call(
      api.deleteBankingDetails,
      action.payload.organizationID
    );
    yield put(deleteBankingDetailsSuccess(bankingDetails));
  } catch (error: any) {
    const errorMessage =
      error.response.data.error || error.message || "Something went wrong!";
    toast.error(errorMessage);
    yield put(deleteBankingDetailsFailure({ error: errorMessage }));
  }
}

export default function* bankingDetailsSaga() {
  yield takeEvery(getBankingDetailsRequest.type, getBankingDetails);
  yield takeEvery(submitBankingDetailsRequest.type, submitBankingDetails);
  yield takeEvery(deleteBankingDetailsRequest.type, deleteBankingDetails);
}
