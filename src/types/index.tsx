import { PlaceOption } from "../components/forms/input_types";
import { formatDateToDateTimeLocal } from "../utils/date_conversions";

enum NotificationMethod {
  EMAIL = "email",
}

enum CancellationPolicy {
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
  fetchUser: boolean;
  onLoginRedirect: string | null;
  customerSignupSucess: boolean;
  customerLoginSucess: boolean;
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
  errorStatusCode: number | null;
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

export interface IPreferredEmail {
  ID: number;
  email: string;
  requested_change_email: string;
  is_verified: boolean;
}

export interface ICustomerSignupValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;

  is_saved?: boolean;
  password?: string;
  password_repeat?: string;
}

export interface ICustomerLoginValues {
  email: string;
  password: string;
}

export interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  verifiedEmail: boolean;
  food_preferences?: IUserFoodPreference;
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
  preferred_email?: IPreferredEmail;
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
  end_date?: number;
  location: string;
  organizationId: number;
  organization?: IOrganization;
  is_private: boolean;
  ticketReleases?: ITicketRelease[];
  createdById?: string;
  form_field_description?: string;
  form_fields?: IEventFormField[];
}

export interface IEventForm {
  name: string;
  description: string;
  date: string;
  end_date?: string;
  location: PlaceOption | null;
  organization_id: number;
  is_private: boolean;
}

export interface IEventPostReq {
  name: string;
  description: string;
  date: number;
  end_date?: number;
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
  method_description?: string;
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
  method_description?: string;
}

export const TicketReleaseFormInitialValues: ITicketReleaseForm = {
  name: "",
  description: "",
  open: formatDateToDateTimeLocal(new Date()),
  close: formatDateToDateTimeLocal(new Date()),
  ticket_release_method_id: 0,
  open_window_duration: 0,
  method_description: "",
  max_tickets_per_user: 1,
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
  method_description: string;
  notificationMethod: string;
  ticketReleaseMethod?: ITicketReleaseMethod;
}

export enum NotificationType {
  EMAIL = "email",
}

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export interface INotification {
  id: number;
  created_at: Date;
  updated_at: Date;
  event_id?: number | null;
  user?: IUser;
  type: NotificationType;
  status: NotificationStatus;
  status_message?: string | null;
  send_out_id?: number | null;
  subject?: string | null;
  content?: string | null;
}
export interface ISendOut {
  id: number;
  event_id: number;
  notifications: INotification[];
  subject: string;
  content: string;
  created_at: Date;
  updated_at: Date;
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
  created_at: string | number | Date;
  updated_at?: string | number | Date;
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
  allow_external: boolean;
  addons?: IAddon[];
  payment_deadline: ITicketReleasePaymentDeadline;
}

export interface ITicketReleasePaymentDeadline {
  id: number;
  ticket_release_id: number;
  original_deadline: Date;
  reserve_payment_duration: number;
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

export interface IEventSalesReport {
  id: number;
  event_id: number;
  total_sales: number;
  tickets_sold: number;
  status: string;
  message: string;
  created_at: Date;
  updated_at: Date;
  url: string;
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
  event_form_responses?: IEventFormFieldResponse[];

  deleted_at: number | null;

  ticket_add_ons?: ITicketAddon[];
}

export interface IDeadlineUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ITicketReleasePaymentDeadlineForm {
  payment_deadline: string;
  reserve_payment_duration: string;
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
  checked_in: boolean;
  qr_code: string;
  purchasable_at?: Date | null;
  deleted_at: number | null;
  ticket_add_ons?: ITicketAddon[];
  payment_deadline?: Date;
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

export interface IEventSiteVisit {
  total_site_visits: number;
  total_site_visits_last_week: number;
  unique_visitors: number;
  unique_visitors_last_week: number;
  last_week_date: Date;
  num_ticket_requests: number;
  num_ticket_requests_last_week: number;
  total_income: number;
  total_income_last_week: number;
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
  prefer_meat: boolean;
  additional: string;
}

export interface ITransaction {
  id: number;
  ticket_id: number;
  amount: number;
  currency: string;
  payed_at: number;
  refunded: boolean;
  refunded_at: number | null;
  payment_method?: string;
  transaction_type: string;
}

export interface IBankingDetails {
  id: number;
  organization_id: number;
  bank_name: string;
  account_number: string;
  account_holder: string;
  clearing_number: string;
  created_at: Date;
  updated_at?: Date | null;
}

export interface IBankingDetailsReq {
  bank_name: string;
  account_number: string;
  account_holder: string;
  clearing_number: string;
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

export type IEventFormFields = "text" | "number" | "checkbox" | "";
export const EventFormFieldsArray: IEventFormFields[] = [
  "text",
  "number",
  "checkbox",
  "",
];

export const EventFormFields: { id: IEventFormFields; label: string }[] = [
  {
    id: "text",
    label: "Text",
  },
  {
    id: "number",
    label: "Number",
  },
  {
    id: "checkbox",
    label: "Checkbox",
  },
];

export interface IEventFormField {
  id: number;
  name: string;
  description: string;
  is_required: boolean;
  type: IEventFormFields;
  event_id: number;
}

export interface IEventFormFieldInput {
  form_field_description: string;
  form_fields: IFormFieldInput[];
}

export interface IFormFieldInput {
  name: string;
  description: string;
  is_required: boolean;
  type: string;
}

export interface IEventFormFieldResponse {
  id: number;
  ticket_request_id: number;
  event_form_field_id: number;
  event_form_field?: IEventFormField;
  value: string | number | boolean | null;
  updated_at: number;
}

export interface IContactFormValues {
  name: string;
  email: string;
  organization_id: number | null;
  subject: string;
  message: string;
}

export interface IAddon {
  id: number;
  name: string;
  description: string;
  price: number;
  contains_alcohol: boolean;
  max_quantity: number;
  is_enabled: boolean;
  ticket_release_id?: number;
}

export interface ITicketAddon {
  id: any;
  add_on_id: number;
  add_on?: IAddon;
  ticket_request_id?: number;
  ticket_id?: number;
  quantity: number;
}

export interface ISelectedAddon {
  id: number;
  quantity: number;
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
  {
    id: "kosher",
    label: "Kosher",
  },
  {
    id: "halal",
    label: "Halal",
  },
  {
    id: "prefer_meat",
    label: "I Prefer Meat If Available",
  },
];

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
