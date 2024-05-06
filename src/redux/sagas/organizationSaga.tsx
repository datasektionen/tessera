import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createOrganizationRequest,
  createOrganizationSuccess,
  createOrganizationFailure,
  getMyOrganizationsRequest,
  getMyOrganizationsFailure,
  getMyOrganizationsSuccess,
  getOrganizationUsersSuccess,
  getOrganizationUsersFailure,
  getOrganizationUsersRequest,
  getOrganizationEventsRequest,
  getOrganizationEventsSuccess,
  getOrganizationEventsFailure,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFailure,
  updateOrganizationStart,
  updateOrganizationSuccess,
  updateOrganizationFailure,
} from "./../features/organizationSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { IEvent, IOrganization, IOrganizationUser } from "../../types";
import ReloadToastContent from "../../components/toasts/ReloadToast";

function* createOrganizationSaga(
  action: PayloadAction<{ name: string; email: string }>
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

    if (response.status === 201) {
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
          email: organization.email!,
          created_at: new Date(organization.CreatedAt!).getTime(),
        };
      }
    );

    if (response.status === 200) {
      yield put(getMyOrganizationsSuccess(organizations));
    } else {
      toast.error("Something went wrong!");
      yield put(getMyOrganizationsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getMyOrganizationsFailure(error.message));
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

    if (response.status === 200) {
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

function* getOrganizationEventsSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/organizations/${action.payload}/events`,
      {
        withCredentials: true,
      }
    );

    const events: IEvent[] = response.data.events.map((event: any) => {
      return {
        id: event.ID!,
        name: event.name!,
        description: event.description!,
        location: event.location!,
        date: new Date(event.date!).getTime(),
        is_private: event.is_private!,
        organization_id: event.organization_id!,
        created_at: new Date(event.CreatedAt!).getTime(),
      };
    });

    if (response.status == 200) {
      yield put(getOrganizationEventsSuccess(events));
    } else {
      toast.error("Something went wrong!");
      yield put(getOrganizationEventsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getOrganizationEventsFailure(error.message));
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

function* deleteOrganizationSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/organizations/${action.payload}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      toast.success(<ReloadToastContent message="Team was deleted!" />);
      yield put(deleteOrganizationSuccess());
    } else {
      const errorMessage = response.data.error || "Something went wrong!";
      toast.error("Something went wrong!");
      yield put(deleteOrganizationFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    yield put(deleteOrganizationFailure(errorMessage));
    toast.error("There was a problem deleting the organization!");
  }
}

function* updateOrganizationSaga(
  action: PayloadAction<{ id: number; name: string; email: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/organizations/${action.payload.id}`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    const organization: IOrganization = {
      id: response.data.organization.ID!,
      name: response.data.organization.name!,
      email: response.data.organization.email!,
      created_at: new Date(response.data.organization.CreatedAt!).getTime(),
    };

    if (response.status === 200) {
      toast.success("Organization updated!");
      yield put(updateOrganizationSuccess(organization));
    } else {
      toast.error("Something went wrong!");
      yield put(updateOrganizationFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(updateOrganizationFailure(error.message));
  }
}

export function* watchCreateOrganization() {
  yield takeEvery(createOrganizationRequest.type, createOrganizationSaga);
  yield takeEvery(getMyOrganizationsRequest.type, getMyOrganizationsSaga);
  yield takeEvery(getOrganizationUsersRequest.type, getOrganizationUsersSaga);
  yield takeEvery(getOrganizationEventsRequest.type, getOrganizationEventsSaga);
  yield takeEvery(deleteOrganizationRequest.type, deleteOrganizationSaga);
  yield takeEvery(updateOrganizationStart.type, updateOrganizationSaga);
  yield takeEvery(REMOVE_USER_REQUEST, removeUserSaga);
}
