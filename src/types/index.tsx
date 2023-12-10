import { formatDateToDateTimeLocal } from "../utils/date_conversions";

enum NoticicationMethod {
  EMAIL = "email",
  SMS = "sms",
}

enum CacellationPolicy {
  FULL_REFUND = "full_refund",
  NO_REFUND = "no_refund",
}

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
  is_private: boolean;
  ticketReleases?: ITicketRelease[];
}

export interface IEventForm {
  name: string;
  description: string;
  date: string;
  location: string;
  organization_id: number;
  is_private: boolean;
}

export interface IEventPostReq {
  name: string;
  description: string;
  date: number;
  location: string;
  organization_id: number;
  is_private: boolean;
}

export const EventFormInitialValues: IEventForm = {
  name: "",
  description: "",
  date: "",
  location: "",
  organization_id: 0,
  is_private: false,
};

export interface ITicketReleaseMethod {
  id: number;
  name: string;
  description: string;
}

export interface ITicketReleaseForm {
  name: string;
  description: string;
  open: string;
  close: string;
  ticket_release_method_id: number;
  open_window_duration?: number;
  max_tickets_per_user: number;
  notification_method: string;
  cancellation_policy: string;
  is_reserved: boolean;
  promo_code?: string;
}

export interface ITicketReleasePostReq {
  name: string;
  description: string;
  open: number;
  close: number;
  open_window_duration?: number;
  max_tickets_per_user: number;
  notification_method: string;
  cancellation_policy: string;
  ticket_release_method_id: number;
  is_reserved: boolean;
  promo_code?: string;
}

export const TicketReleaseFormInitialValues: ITicketReleaseForm = {
  name: "",
  description: "",
  open: formatDateToDateTimeLocal(new Date()),
  close: formatDateToDateTimeLocal(new Date()),
  ticket_release_method_id: 0,
  open_window_duration: 0,
  max_tickets_per_user: 0,
  notification_method: "email",
  cancellation_policy: "no_refund",
  is_reserved: false,
  promo_code: "",
};

export interface ITicketTypeForm {
  name: string;
  description: string;
  price: number;
  quantity_total: number;
}

export interface ITicketTypePostReq {
  name: string;
  description: string;
  price: number;
  quantity_total: number;
}

export const TicketTypeFormInitialValues: ITicketTypeForm = {
  name: "Default",
  description: "",
  price: 0,
  quantity_total: 0,
};

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
  ticketReleaseMethodDetailId?: number;
  ticketTypes?: ITicketType[];
  ticketReleaseMethodDetail: ITicketReleaseMethodDetail;
  is_reserved?: boolean;
  promo_code?: string;
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

export interface CompleteEventWorkflowPostReq {
  event: IEventPostReq;
  ticket_release: ITicketReleasePostReq;
  ticket_types: ITicketTypePostReq[];
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
