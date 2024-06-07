import { addHours, addWeeks, format } from "date-fns";
import { PlaceOption } from "../components/forms/input_types";
import {
  formatDateToDateTimeLocal,
  getDurationUnits,
  paymentDurationToString,
} from "../utils/date_conversions";
import { blue, green, grey, orange, red } from "@mui/material/colors";

enum NotificationMethod {
  EMAIL = "email",
}

enum CancellationPolicy {
  FULL_REFUND = "full_refund",
  NO_REFUND = "no_refund",
}

export interface ISQLNullTime {
  Time: string;
  Valid: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface INavigationLoginOptions {
  showLogin: boolean;
}
export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  user: any | null;
  token: string | null;
  error: string | null;
  fetchUser: boolean;
  onLoginRedirect: string | null;
  customerSignupSuccess: boolean;
  customerLoginSuccess: boolean;
  guestCustomer: IGuestCustomer | null;
}

export interface IGuestCustomerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
}

export interface IGuestCustomer {
  user_id: string;
  roles: IRole[];
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  request_token?: string;

  ticket_order_id?: number;
  ticket_order?: ITicketOrder;
  food_preferences?: IUserFoodPreference;
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

// Differeny types of roles
export enum RoleType {
  SUPER_ADMIN = "super_admin",
  MANAGER = "manager",
  CUSTOMER_GUEST = "customer_guest",
  CUSTOMER = "customer",
}

export interface IFreeRegisterFormValues {
  name: string;
  referral_source: string;
  referral_source_specific: string;
}

export interface IRole {
  id: number;
  name: string;
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

export enum NetworkRoleType {
  NetworkSuperAdmin = "network_super_admin",
  NetworkAdmin = "network_admin",
  NetworkMember = "network_member",
}

export type FeatureGroupType =
  | "event_management"
  | "ticket_management"
  | "api_integration"
  | "support"
  | "landing_page"
  | "financial_management"
  | "email_management"
  | "other";

export type PaymentPlanType = "monthly" | "yearly" | "one_time" | "no_payment";

export enum PaymentPlanOption {
  Monthly = "monthly",
  Yearly = "yearly",
  OneTime = "one_time",
  NoPayment = "no_payment",
}

export type PackageTierType =
  | "free"
  | "single_event"
  | "professional"
  | "network";

export interface IFeatureGroup {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: FeatureGroupType;
  description: string;
}

export interface IPackageTier {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  tier: PackageTierType;
  description: string;
  standard_monthly_price: number;
  standard_yearly_price: number;
  plan_enrollments: IPlanEnrollment[];
  default_feature_ids: number[];
  default_features: IFeature[];
}

export interface IRequiredPlanFeatures {
  feature_name: string;
  plans: PackageTierType[];
}

export interface IPlanEnrollment {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  creator_email: string;
  creator_id: string;
  creator: IUser; // You would need to define a User interface
  network_id: number;
  package_tier_id: number;
  features: IFeature[];
  monthly_price: number;
  yearly_price: number;
  one_time_price: number;
  plan: PaymentPlanType;
  features_usages: IFeatureUsage[];
  required_plan_features: IRequiredPlanFeatures[];
}

export interface IFeatureUsage {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  feature_id: number;
  plan_enrollment_id: number;
  usage: number;
  object_reference?: string;
}

export interface IFeature {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  description: string;
  feature_group_id: number;
  feature_group: IFeatureGroup;
  is_available: boolean;
  package_tiers: IPackageTier[];
  package_tiers_ids: number[];
  feature_limits: IFeatureLimit[];
  has_limit_access?: boolean;
}

export interface IFeatureLimit {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  feature_id: number;
  package_tier_id: number;
  limit_description: string;
  limit: number | null; // This is a hard limit
  monthly_limit: number | null;
  yearly_limit: number | null;
}

export interface INetwork {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  name: string;
  plan_enrollment_id: number;
  plan_enrollment: IPlanEnrollment;
  users: IUser[]; // You would need to define a User interface
  organizations: IOrganization[]; // You would need to define an Organization interface
  merchant: INetworkMerchant;
  details: INetworkDetails;
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

export interface IOrganizationUserRole {
  id: string;
  user_ug_kth_id: string;
  organization_id: number;
  organization_role_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface INetworkUserRole {
  id: string;
  user_ug_kth_id: string;
  network_id: number;
  network_role_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  // Define user properties based on your backend response
  id?: string;
  ug_kth_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  roles?: IRole[];
  organizations?: IOrganization[];
  food_preferences?: IUserFoodPreference;
  is_external: boolean;
  showed_post_login?: boolean;
  network_user_roles?: INetworkUserRole[];
  organization_user_roles?: IOrganizationUserRole[];
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
  organization_user_roles?: IOrganizationUserRole[];
  common_event_locations: {
    name: string;
  }[];
  users?: IUser[];
}

export interface IStoreTerminal {
  terminal_id: string;
  event_id: number;
  store_id: string;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IStore {
  store_id: string;
  name: string;
  organization_id: number;
  terminals: IStoreTerminal[];

  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IEvent {
  id: number;
  reference_id: string;
  createdAt: number;
  name: string;
  description: string;
  date: Date;
  end_date?: Date;
  location: string;
  organization_id: number;
  organization?: IOrganization;
  is_private: boolean;
  ticket_releases?: ITicketRelease[];
  created_by?: string;
  form_field_description?: string;
  form_fields?: IEventFormField[];
  landing_page?: IEventLandingPage;
  collect_food_preferences?: boolean;
  terminal: IStoreTerminal;
}

export interface IEventForm {
  name: string;
  description: string;
  date: string;
  end_date?: string;
  location: PlaceOption | null;
  organization_id: number;
  is_private: boolean;
  collect_food_preferences: boolean;
}

export interface IEventPostReq {
  name: string;
  description: string;
  date: string;
  end_date?: string;
  location: string;
  organization_id: number;
  is_private: boolean;
  collect_food_preferences: boolean;
}

export const EventFormInitialValues: IEventForm = {
  name: "",
  description: "",
  date: "",
  location: null,
  organization_id: 1,
  is_private: false,
  collect_food_preferences: false,
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
  collect_food_preferences: false,
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
  is_saved?: boolean;
  save_template: boolean;
  payment_deadline: string;
  reserve_payment_duration: string;
  allocation_cut_off: string;
}

export interface ITicketReleasePostReq {
  event_id?: number;
  name: string;
  description: string;
  open: string;
  close: string;
  open_window_duration?: number;
  max_tickets_per_user: number;
  notification_method: string;
  cancellation_policy: string;
  ticket_release_method_id: number;
  is_reserved: boolean;
  promo_code?: string;
  tickets_available: number;
  method_description?: string;
  save_template: boolean;
  payment_deadline?: string;
  reserve_payment_duration?: string;
  allocation_cut_off?: string;
}

export const TicketReleaseFormInitialValues: ITicketReleaseForm = {
  name: "",
  description: "",
  open: format(addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
  close: format(addWeeks(addHours(new Date(), 1), 1), "yyyy-MM-dd'T'HH:mm"),
  ticket_release_method_id: 0,
  open_window_duration: 0,
  method_description: "",
  max_tickets_per_user: 1,
  notification_method: "EMAIL",
  cancellation_policy: "FULL_REFUND",
  tickets_available: 0,
  is_reserved: false,
  promo_code: "",
  is_saved: false,
  save_template: false,
  payment_deadline: "",
  reserve_payment_duration: "",
  allocation_cut_off: "",
};

export interface ITicketTypeForm {
  id?: number;
  name: string;
  description: string;
  price: number;
  save_template: boolean;
}

export interface ITicketTypePostReq {
  id?: number;
  event_id?: number;
  ticket_release_id?: number;
  name: string;
  description: string;
  price: number;
  save_template: boolean;
}

export const TicketTypeFormInitialValues: ITicketTypeForm = {
  name: "Default",
  description: "",
  price: 0,
  save_template: false,
};

export interface ITicketReleaseMethodDetail {
  id: number;
  name: string;
  max_tickets_per_user: number;
  cancellation_policy: string;
  open_window_duration: number | null; // Todo change
  method_description: string;
  notification_method: string;
  ticket_release_method?: ITicketReleaseMethod;
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
  ticket_release_id: number;
  name: string;
  description: string;
  price: number;
  quantityTotal: number;
  isReserved: boolean;
  save_template: boolean;
}

export interface ITicketRelease {
  created_at: string | number | Date;
  updated_at?: string | number | Date;
  id: number;
  event_id: number;
  name: string;
  description: string;
  open: Date;
  close: Date;
  has_allocated_tickets?: boolean;
  ticket_release_method_detail_id?: number;
  ticket_types?: ITicketType[];
  ticket_release_method_detail: ITicketReleaseMethodDetail;
  is_reserved?: boolean;
  promo_code?: string;
  event?: IEvent;
  tickets_available: number;
  addons?: IAddon[];
  payment_deadline: ITicketReleasePaymentDeadline;
  save_template: boolean;
  allocation_cut_off: Date;
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
  ticket_release_method_detail_id: number;
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

export interface ITicketOrder {
  id: number;
  user_ug_kth_id: string;
  user?: IUser;

  is_handled: boolean;
  num_tickets: number;
  total_amount: number;
  is_paid: boolean;
  paid_at: Date | null;
  type: string;

  ticket_release_id: number;
  ticket_release?: ITicketRelease;

  tickets: ITicket[];

  created_at: number;
  updated_at: number;
  deleted_at: number | null;
  deleted_reason?: string;

  order: IOrder;
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
  ticket_order_id: number;
  ticket_order: ITicketOrder;
  is_paid: boolean;
  is_reserve: boolean;
  refunded: boolean;
  reserve_number?: number;
  qr_code: string;
  was_reserve: boolean;

  checked_in: boolean;
  checked_in_at: Date | null;

  ticket_type: ITicketType;

  user_ug_kth_id: string;
  user: IUser;

  purchasable_at?: Date | null;

  ticket_add_ons?: ITicketAddon[];
  ticket_type_id: number;
  payment_deadline: ISQLNullTime;
  event_form_responses?: IEventFormFieldResponse[];

  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  deleted_reason?: string;
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
  num_ticket_orders: number;
  num_ticket_orders_last_week: number;
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

// export interface ITransaction {
//   id: number;
//   ticket_id: number;
//   amount: number;
//   currency: string;
//   payed_at: number;
//   refunded: boolean;
//   refunded_at: number | null;
//   payment_method?: string;
//   transaction_type: string;
// }

enum OrderStatusType {
  Pending = "pending",
  Initiated = "payment_initiated",
  Processed = "payment_processed",
  PaymentCompleted = "payment_completed",
  PaymentCancelled = "payment_cancelled",
  PartialPaymentCompleted = "partial_payment_completed",
}

export interface IOrder {
  id: number; // Automatically managed by GORM
  order_id: string;
  merchant_id: string;
  event_id: number;
  user_ug_kth_id: string;
  payment_page_link: string;

  status: OrderStatusType;
  details: IOrderDetails;
  tickets: ITicket[];

  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export interface IOrderDetails {
  id: number; // Automatically managed by GORM
  order_id: string;

  payment_id: string;
  transaction_id: string;
  payment_method: string;
  payment_status: string;
  truncated_pan: string;
  card_label: string;
  pos_entry_mode: string;
  issuer_application: string;
  terminal_verification_result: string;
  aid: string;
  customer_response_code: string;
  cvm_method: string;
  auth_mode: string;

  total: number;
  currency: string;

  refunded: boolean;
  refunded_at: Date | null;
  payed_at: string | null;

  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
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
  ticket_order_id: number;
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
  ticket_id?: number;
  quantity: number;
}

export interface ISelectedAddon {
  id: number;
  quantity: number;
}

export interface IEventLandingPage {
  id?: number;
  event_id: number;
  html: string;
  css: string;
  js: string;
  enabled: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export enum SurfApplicationStatus {
  ApplicationNotStarted = "application_not_started",
  ApplicationInitiated = "application_initiated",
  ApplicationSubmitted = "application_submitted",
  ApplicationPendingInformation = "application_pending_information",
  ApplicationSigned = "application_signed",
  ApplicationRejected = "application_rejected",
  ApplicationCompleted = "application_completed",
  ApplicationExpired = "application_expired",
  MerchantCreated = "merchant_created",
}

export const ApplicationStatusColors = {
  application_not_started: grey[500],
  application_initiated: green[200],
  application_submitted: green[400],
  application_pending_information: orange[500],
  application_signed: blue[500],
  application_rejected: red[500],
  application_completed: green[500],
  application_expired: red[500],
  merchant_created: green[500],
};

export interface INetworkMerchant {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  networkId: number;
  applicationId: string;
  merchantId: string;
  applicationStatus: SurfApplicationStatus;
  webKybUrl: string;
  storeId: string;
}

export interface INetworkDetails {
  id: number;
  created_at: Date;
  updated_at: Date;
  network_id: number;
  corporate_id: string; // Corporate ID of the network
  legal_name: string; // Legal name of the network
  description: string; // Description of the network
  care_of: string; // Care of (c/o) of the network
  address_line1: string; // Address line 1 of the network
  address_line2: string; // Address line 2 of the network
  language: string;
  city: string;
  postal_code: string;
  country: string;
  phone_code: string;
  phone_number: string;
  country_code: string; // Two-letter ISO country code, in uppercase. i.e 'SE' | 'DK' | 'FI'.
  email: string; // main email for the network
}

export type Country = {
  name: string;
  code: string;
  phone: number;
};

export const AvaialableCountries: Country[] = [
  {
    name: "Sweden",
    code: "SE",
    phone: 46,
  },
];

export interface BusinessDetailsFormValues {
  country_code: string;
  legal_name: string;
  corporate_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  postal_code: string;
  phone_number: string;
  business_email: string;
  store_name: string;
}

export enum OrganizationUserRoleType {
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
