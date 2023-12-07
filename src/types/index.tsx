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
  organizations: IOrganization[];
}

export interface IOrganizationUser extends IUser {
  organization_role: string;
  added_at: number;
}

export interface IOrganization {
  id: number;
  name: string;
  created_at?: number;
}
export interface IEvent {
  id: number;
  createdAt: number;
  name: string;
  description: string;
  date: number;
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
  id: number;
  ticketReleaseId: number;
  name: string;
  description: string;
  price: number;
  quantityTotal: number;
  isReserved: boolean;
}

export interface ITicketRelease {
  id: number;
  eventId: number;
  name: string;
  description: string;
  open: number;
  close: number;
  ticketTypes?: ITicketType[];
  ticketReleaseMethodDetail: ITicketReleaseMethodDetail;
}

export interface ITicketReleaseAdmin extends ITicketRelease {
  id: number;
  ticketReleaseMethodDetailId: number;
  hasAllocatedTickets: boolean;
}

export interface TicketRequestPostReq {
  ticket_type_id: number;
  ticket_release_id: number;
}

export interface IFoodPreference {
  id: string;
  label: string;
  checked?: boolean;
}

export enum OrganizationUserRole {
  OWNER = "owner",
  MEMBER = "member",
}

export const FoodPreferences: IFoodPreference[] = [
  {
    id: "gluten_intolerant",
    label: "Gluten Intolerant",
  },
  {
    id: "lactose_intolerant",
    label: "Lactose Intolerant",
  },
  {
    id: "vegetarian",
    label: "Vegetarian",
  },
  {
    id: "vegan",
    label: "Vegan",
  },
  {
    id: "nut_allergy",
    label: "Nut Allergy",
  },
  {
    id: "shellfish_allergy",
    label: "Shellfish Allergy",
  },
];

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
