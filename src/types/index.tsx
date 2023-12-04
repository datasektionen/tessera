export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  token: string | null;
  error: string | null;
}

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface ListEventState {
  events: IEvent[];
  loading: boolean;
  error: string | null;
}

export interface EventState {
  event: IEvent | null;
  loading: boolean;
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

export interface IRole {
  id: number;
  name: string;
}
export interface IUser {
  // Define user properties based on your backend response
  ug_kth_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: IRole;
}

export interface IOrganization {
  name: string;
}
export interface IEvent {
  createdAt: Date;
  name: string;
  description: string;
  date: Date;
  location: string;
  organizationId: number;
  ticketReleases?: ITicketRelease[];
}

export interface ITicketReleaseMethod {
  id: number;
  methodName: string;
  description: string;
}

export interface ITicketReleaseMethodDetail {
  id: number;
  name: string;
  maxTicketsPerUser: number;
  cancellationPolicy: string;

  openWindowDays: number | null;

  ticketReleaseMethod?: ITicketReleaseMethod;
}

export interface ITicketType {
  id?: number;
  ticketReleaseId: number;
  name: string;
  description: string;
  price: number;
  quantityTotal: number;
  isReserved: boolean;
}

export interface ITicketRelease {
  eventId: number;
  name: string;
  description: string;
  open: Date;
  close: Date;
  ticketTypes?: ITicketType[];
  ticketReleaseMethodDetail?: ITicketReleaseMethodDetail;
}

export interface ITicketReleaseAdmin extends ITicketRelease {
  id: number;
  ticketReleaseMethodDetailId: number;
  hasAllocatedTickets: boolean;
}

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
