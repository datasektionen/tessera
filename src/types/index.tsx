import { PlaceOption } from "../components/forms/input_types";
import { formatDateToDateTimeLocal } from "../utils/date_conversions";

enum NoticicationMethod {
  EMAIL = "email",
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
  user: Object | null;
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
  role?: IRole;
  organizations?: IOrganization[];
  food_preferences?: IUserFoodPreference;
  is_external: boolean;
}

export interface IOrganizationUser extends IUser {
  organization_role: string;
  added_at: number;
}

export interface IOrganization {
  id: number;
  name: string;
  email: string;
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
  organization?: IOrganization;
  is_private: boolean;
  ticketReleases?: ITicketRelease[];
  createdById?: string;
}

export interface IEventForm {
  name: string;
  description: string;
  date: string;
  location: PlaceOption | null;
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
  location: null,
  organization_id: 1,
  is_private: false,
};

export const EventFormInitialTestValues: IEventForm = {
  name: "Test Event",
  description: "Test Event Description",
  date: formatDateToDateTimeLocal(new Date()),
  location: {
    label: "Test Location",
    value: {
      lat: 59.347,
      lng: 18.073,
    },
  },
  organization_id: 1,
  is_private: false,
};

export interface ITicketReleaseMethod {
  id: number;
  name: string;
  description: string;
}

export interface ITicketReleaseForm {
  event_date?: string;
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
  tickets_available: number;
  allow_external: boolean;
}

export interface ITicketReleasePostReq {
  event_id?: number;
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
  tickets_available: number;
  allow_external: boolean;
}

export const TicketReleaseFormInitialValues: ITicketReleaseForm = {
  name: "",
  description: "",
  open: formatDateToDateTimeLocal(new Date()),
  close: formatDateToDateTimeLocal(new Date()),
  ticket_release_method_id: 0,
  open_window_duration: 0,
  max_tickets_per_user: 0,
  notification_method: "EMAIL",
  cancellation_policy: "FULL_REFUND",
  tickets_available: 0,
  is_reserved: false,
  promo_code: "",
  allow_external: false,
};

export interface ITicketTypeForm {
  id?: number;
  name: string;
  description: string;
  price: number;
}

export interface ITicketTypePostReq {
  id?: number;
  event_id?: number;
  ticket_release_id?: number;
  name: string;
  description: string;
  price: number;
}

export const TicketTypeFormInitialValues: ITicketTypeForm = {
  name: "Default",
  description: "",
  price: 0,
};

export interface ITicketReleaseMethodDetail {
  id: number;
  name: string;
  maxTicketsPerUser: number;
  cancellationPolicy: string;
  openWindowDuration: number | null; // Todo change
  notificationMethod: string;
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
  has_allocated_tickets?: boolean;
  ticketReleaseMethodDetailId?: number;
  ticketTypes?: ITicketType[];
  ticketReleaseMethodDetail: ITicketReleaseMethodDetail;
  is_reserved?: boolean;
  promo_code?: string;
  event?: IEvent;
  tickets_available: number;
  pay_within?: number;
  allow_external: boolean;
}
export interface PromoCodeAccessForm {
  promo_code: string;
}

export const PromoCodeAccessFormInitialValues: PromoCodeAccessForm = {
  promo_code: "",
};

export interface ITicketReleaseAdmin extends ITicketRelease {
  id: number;
  ticketReleaseMethodDetailId: number;
  hasAllocatedTickets: boolean;
}

export interface ITicketRequest {
  id: number;
  created_at: number;
  is_handled: boolean;
  ticket_amount: number;

  ticket_type_id: number;
  ticket_type?: ITicketType;

  ticket_release_id: number;
  ticket_release?: ITicketRelease;
}

export interface ITicket {
  id: number;
  created_at: number;
  updated_at: number;
  ticket_request?: ITicketRequest;
  is_paid: boolean;
  is_reserve: boolean;
  refunded: boolean;
  user_id: number;
  user?: IUser;
  transaction?: ITransaction;
  reserve_number?: number;
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

export interface CompleteTicketReleaseWorkflowPostReq {
  ticket_release: ITicketReleasePostReq;
  ticket_types: ITicketTypePostReq[];
}

export interface IFoodPreference {
  id: string;
  label: string;
  checked?: boolean;
}

export interface IUserFoodPreference {
  gluten_intolerant: boolean;
  lactose_intolerant: boolean;
  vegetarian: boolean;
  vegan: boolean;
  nut_allergy: boolean;
  shellfish_allergy: boolean;
  kosher: boolean;
  halal: boolean;
  additional_info?: string;
}

export interface ITransaction {
  id: number;
  ticket_id: number;
  amount: number;
  currency: string;
  payed_at: number;
  refunded: boolean;
  refunded_at: number | null;
}

// External user
export interface ISignupFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_repeat: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export const SignupInitialValues: ISignupFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_repeat: "",
};

export const LoginInitialValues: ILoginFormValues = {
  email: "",
  password: "",
};

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
  {
    id: "kosher",
    label: "Kosher",
  },
  {
    id: "halal",
    label: "Halal",
  },
];

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
