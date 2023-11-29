export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userRole: string | null;
  error: string | null;
}

export interface LoginRequestAction {
  type: "LOGIN_REQUEST";
  payload: LoginCredentials;
}

export interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
  payload: { token: string; userRole: string };
}

export interface LoginFailureAction {
  type: "LOGIN_FAILURE";
  payload: string;
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
