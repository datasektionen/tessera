// src/sagas/teamsSaga.ts
import { takeEvery, call, put } from "redux-saga/effects";
import {
  listTeamsStart,
  listTeamsSuccess,
  listTeamsFailure,
} from "../features/listTeamsSlice";
import { ITeam } from "../../types";
import axios from "axios";

async function fetchTeamsApi(): Promise<ITeam[]> {
  const response = await fetch("/api/teams");
  return await response.json();
}

function* fetchTeamsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/teams`,
      { withCredentials: true }
    );

    let teams: ITeam[] = response.data.teams.map((team: any) => {
      return {
        id: team.ID,
        name: team.name,
        email: team.email,
        created_at: team.CreatedAt,
      };
    });

    yield put(listTeamsSuccess(teams));
  } catch (e: any) {
    const errorMessage = e.response.data.error || "An error occurred";
    yield put(listTeamsFailure(errorMessage));
  }
}

export function* listTeamsSaga() {
  yield takeEvery(listTeamsStart.type, fetchTeamsSaga);
}
