import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
  getOrganizationsRequest,
  getOrganizationsFailure,
  getOrganizationsSuccess,
  getOrganizationUsersSuccess,
  getOrganizationUsersFailure,
  getOrganizationUsersRequest,
} from "./../features/organizationSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { IOrganization, IOrganizationUser } from "../../types";

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

function* getMyOrganizationsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/my-organizations`,
      {
        withCredentials: true,
      }
    );

    const organizations: IOrganization[] = response.data.organizations.map(
      (organization: any) => {
        return {
          id: organization.ID!,
          name: organization.name!,
          created_at: new Date(organization.CreatedAt!).getTime(),
        };
      }
    );

    if (response.status == 200) {
      yield put(getOrganizationsSuccess(organizations));
    } else {
      toast.error("Something went wrong!");
      yield put(getOrganizationsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getOrganizationsFailure(error.message));
  }
}

function* getOrganizationUsersSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/organizations/${action.payload}/users`,
      {
        withCredentials: true,
      }
    );
    const users: IOrganizationUser[] = response.data.users.map((user: any) => {
      return {
        ug_kth_id: user.ug_kth_id!,
        username: user.username!,
        first_name: user.first_name!,
        last_name: user.last_name!,
        email: user.email!,
        organization_role:
          user.organization_user_roles[0].organization_role_name,
        added_at: new Date(
          user.organization_user_roles[0].created_at!
        ).getTime(),
      };
    });

    if (response.status == 200) {
      yield put(getOrganizationUsersSuccess(users));
    } else {
      toast.error("Something went wrong!");
      yield put(getOrganizationUsersFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getOrganizationUsersFailure(error.message));
  }
}

const REMOVE_USER_REQUEST = "REMOVE_USER_REQUEST";
const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
const REMOVE_USER_FAILURE = "REMOVE_USER_FAILURE";

// Action creators
export const removeUserRequest = (
  organizationId: number,
  username: string
) => ({ type: REMOVE_USER_REQUEST, payload: { organizationId, username } });
export const removeUserSuccess = () => ({ type: REMOVE_USER_SUCCESS });
export const removeUserFailure = (error: string) => ({
  type: REMOVE_USER_FAILURE,
  payload: error,
});

// Worker saga
function* removeUserSaga(
  action: ReturnType<typeof removeUserRequest>
): Generator<any, void, any> {
  try {
    const { organizationId, username } = action.payload;
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/organizations/${organizationId}/users/${username}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      yield put(removeUserSuccess());

      yield put(getOrganizationUsersRequest(organizationId)); // Dispatch the action to refetch the users
      setTimeout(() => {
        toast.success("User removed successfully!");
      }, 500);
    } else {
      yield put(removeUserFailure("Something went wrong!"));
      toast.error("Something went wrong!");
    }
  } catch (error: any) {
    yield put(removeUserFailure(error.message));
    toast.error(error.response.data.error);
  }
}

export function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRequest.type, createOrganizationSaga);
  yield takeEvery(getOrganizationsRequest.type, getMyOrganizationsSaga);
  yield takeEvery(getOrganizationUsersRequest.type, getOrganizationUsersSaga);
  yield takeEvery(REMOVE_USER_REQUEST, removeUserSaga);
}
