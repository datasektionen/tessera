import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createTeamRequest,
  createTeamSuccess,
  createTeamFailure,
  getMyTeamsRequest,
  getMyTeamsFailure,
  getMyTeamsSuccess,
  getTeamUsersSuccess,
  getTeamUsersFailure,
  getTeamUsersRequest,
  getTeamEventsRequest,
  getTeamEventsSuccess,
  getTeamEventsFailure,
  deleteTeamRequest,
  deleteTeamSuccess,
  deleteTeamFailure,
  updateTeamStart,
  updateTeamSuccess,
  updateTeamFailure,
} from "./../features/teamSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { IEvent, ITeam, ITeamUser } from "../../types";
import ReloadToastContent from "../../components/toasts/ReloadToast";

function* createTeamSaga(
  action: PayloadAction<{ name: string; email: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/teams`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      toast.success("Team created!");
      yield put(createTeamSuccess(response));
    } else {
      toast.error("Something went wrong!");
      yield put(createTeamFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(createTeamFailure(error.message));
  }
}

function* getMyTeamsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/my-teams`,
      {
        withCredentials: true,
      }
    );

    const teams: ITeam[] = response.data.teams.map((team: any) => {
      return {
        id: team.ID!,
        name: team.name!,
        email: team.email!,
        created_at: new Date(team.CreatedAt!).getTime(),
      };
    });

    if (response.status == 200) {
      yield put(getMyTeamsSuccess(teams));
    } else {
      toast.error("Something went wrong!");
      yield put(getMyTeamsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getMyTeamsFailure(error.message));
  }
}

function* getTeamUsersSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/teams/${action.payload}/users`,
      {
        withCredentials: true,
      }
    );
    const users: ITeamUser[] = response.data.users.map((user: any) => {
      return {
        ug_kth_id: user.ug_kth_id!,
        username: user.username!,
        first_name: user.first_name!,
        last_name: user.last_name!,
        email: user.email!,
        team_role: user.team_user_roles[0].team_role_name,
        added_at: new Date(user.team_user_roles[0].created_at!).getTime(),
      };
    });

    if (response.status == 200) {
      yield put(getTeamUsersSuccess(users));
    } else {
      toast.error("Something went wrong!");
      yield put(getTeamUsersFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getTeamUsersFailure(error.message));
  }
}

function* getTeamEventsSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/teams/${action.payload}/events`,
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
        team_id: event.team_id!,
        created_at: new Date(event.CreatedAt!).getTime(),
      };
    });

    if (response.status == 200) {
      yield put(getTeamEventsSuccess(events));
    } else {
      toast.error("Something went wrong!");
      yield put(getTeamEventsFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(getTeamEventsFailure(error.message));
  }
}

const REMOVE_USER_REQUEST = "REMOVE_USER_REQUEST";
const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
const REMOVE_USER_FAILURE = "REMOVE_USER_FAILURE";

// Action creators
export const removeUserRequest = (teamId: number, username: string) => ({
  type: REMOVE_USER_REQUEST,
  payload: { teamId, username },
});
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
    const { teamId, username } = action.payload;
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/teams/${teamId}/users/${username}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      yield put(removeUserSuccess());

      yield put(getTeamUsersRequest(teamId)); // Dispatch the action to refetch the users
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

function* deleteTeamSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/teams/${action.payload}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      toast.success(<ReloadToastContent message="Team was deleted!" />);
      yield put(deleteTeamSuccess());
    } else {
      const errorMessage = response.data.error || "Something went wrong!";
      toast.error("Something went wrong!");
      yield put(deleteTeamFailure(errorMessage));
    }
  } catch (error: any) {
    const errorMessage = error.response.data.error || error.message;
    yield put(deleteTeamFailure(errorMessage));
    toast.error("There was a problem deleting the team!");
  }
}

function* updateTeamSaga(
  action: PayloadAction<{ id: number; name: string; email: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/teams/${action.payload.id}`,
      action.payload,
      {
        withCredentials: true,
      }
    );

    const team: ITeam = {
      id: response.data.team.ID!,
      name: response.data.team.name!,
      email: response.data.team.email!,
      created_at: new Date(response.data.team.CreatedAt!).getTime(),
    };

    if (response.status === 200) {
      toast.success("Team updated!");
      yield put(updateTeamSuccess(team));
    } else {
      toast.error("Something went wrong!");
      yield put(updateTeamFailure("Something went wrong!"));
    }
  } catch (error: any) {
    toast.error(error.response.data.error);
    yield put(updateTeamFailure(error.message));
  }
}

export function* watchCreateTeam() {
  yield takeEvery(createTeamRequest.type, createTeamSaga);
  yield takeEvery(getMyTeamsRequest.type, getMyTeamsSaga);
  yield takeEvery(getTeamUsersRequest.type, getTeamUsersSaga);
  yield takeEvery(getTeamEventsRequest.type, getTeamEventsSaga);
  yield takeEvery(deleteTeamRequest.type, deleteTeamSaga);
  yield takeEvery(updateTeamStart.type, updateTeamSaga);
  yield takeEvery(REMOVE_USER_REQUEST, removeUserSaga);
}
