// src/sagas/organizationsSaga.ts
import { takeEvery, call, put } from "redux-saga/effects";
import {
  listOrganizationsStart,
  listOrganizationsSuccess,
  listOrganizationsFailure,
} from "../features/listOrganizationsSlice";
import { IOrganization } from "../../types";
import axios from "axios";

async function fetchOrganizationsApi(): Promise<IOrganization[]> {
  const response = await fetch("/api/organizations");
  return await response.json();
}

function* fetchOrganizationsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/organizations`,
      { withCredentials: true }
    );

    let organizations: IOrganization[] = response.data.organizations.map(
      (organization: any) => {
        return {
          id: organization.ID,
          name: organization.name,
          email: organization.email,
          created_at: organization.CreatedAt,
        };
      }
    );

    yield put(listOrganizationsSuccess(organizations));
  } catch (e: any) {
    const errorMessage = e.response.data.error || "An error occurred";
    yield put(listOrganizationsFailure(errorMessage));
  }
}

export function* listOrganizationsSaga() {
  yield takeEvery(listOrganizationsStart.type, fetchOrganizationsSaga);
}
