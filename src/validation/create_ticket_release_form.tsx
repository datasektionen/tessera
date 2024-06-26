import { format } from "date-fns";
import * as Yup from "yup";
import { isValidDecimal } from "../utils/integer_validation";

const checkDateInFuture = (timestamp: Date) => {
  const now = new Date();
  return timestamp > now;
};

const checkDatesAreValidWithEventDate = (
  event_date: Date,
  open: Date,
  close: Date
) => {
  if (!event_date || !open || !close) {
    return false;
  }

  // Check that open and close are before event_date
  if (open > event_date || close > event_date) {
    return false;
  }

  return true;
};

const validateOpenAndClose = (
  open: Date,
  close: Date,
  open_window_duration?: number
) => {
  // Check that open is before close
  // Check that open + open_window_duration is before close
  // Check that open is after event_date

  if (open > close) {
    return false;
  }

  if (!open || !close) {
    return false;
  }

  if (!open_window_duration) {
    return true;
  }

  const openTimestamp = open.getTime();
  const windowTimestamp = openTimestamp + open_window_duration * 60 * 1000;

  if (windowTimestamp > close.getTime()) {
    return false;
  }

  return true;
};

export const PromoCodeValidationSchema = Yup.object().shape({
  promo_code: Yup.string()
    .required("Enter a promo code")
    .matches(
      /^[A-Z0-9]*$/,
      "Promo Code must only consist of capital letters and numbers"
    )
    .min(5, "Promo Code must be at least 5 characters")
    .max(20, "Promo Code must be at most 20 characters"),
});

const CreateTicketReleaseFormSchema = Yup.object()
  .shape({
    event_date: Yup.date().required("Event Date is required"),
    name: Yup.string()
      .required("Name is required")
      .min(3, "Too short")
      .max(80, "Too long"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Too short")
      .max(500, "Too long"),
    open: Yup.date()
      .required("Open is required")
      .test("is-future", "Needs to be in the future", checkDateInFuture),
    close: Yup.date()
      .required("Close is required")
      .min(Yup.ref("open"), "Close must be after open")
      .test("is-future", "Close must be in the future", checkDateInFuture),
    ticket_release_method_id: Yup.number()
      .required("Ticket Release Method ID is required")
      .integer("Ticket Release Method ID must be an integer")
      .min(1, "Ticket Release Method ID is required"),

    open_window_duration: Yup.number().when("ticket_release_method_id", {
      // @ts-ignore
      is: 1,
      then: (schema) =>
        schema
          .required("Open Window Duration is required")
          .min(1, "Open Window Duration must be greater than or equal to 1")
          .integer("Open Window Duration must be an integer"),
      otherwise: (schema) => schema.notRequired(),
    }),
    method_description: Yup.string().when("ticket_release_method_id", {
      // @ts-ignore
      is: 4,
      then: (schema) =>
        schema
          .required("Method Description is required")
          .min(5, "Too short")
          .max(500, "Too long"),
      otherwise: (schema) => schema.notRequired(),
    }),
    max_tickets_per_user: Yup.number()
      .required("Max Tickets Per User is required")
      .min(1, "Max Tickets Per User must be greater than or equal to 1")
      .max(1, "Multiple tickets per user is not supported yet"),
    tickets_available: Yup.number()
      .required("Available Tickets is required")
      .min(1, "Available Tickets must be greater than or equal to 1")
      .integer("Available Tickets must be an integer")
      .test(
        "is-valid-available-tickets",
        "Number of available tickets must be greater than or equal to the number of tickets per user",
        function (value) {
          const maxTicketsPerUser = this.parent.max_tickets_per_user;
          if (value < maxTicketsPerUser) {
            return false;
          }

          return true;
        }
      )
      .test(
        "is-valid-decimal",
        "Available Tickets must be a valid decimal number and cannot start with zero",
        function (value) {
          // Convert the value to a string and check if it starts with a zero
          if (String(value).startsWith("0") && value !== 0) {
            return false;
          }

          return true;
        }
      ),
    notification_method: Yup.string().required(
      "Notification Method is required"
    ),
    cancellation_policy: Yup.string().required(
      "Cancellation Policy is required"
    ),
    is_reserved: Yup.boolean(),
    allow_external: Yup.boolean(),
    promo_code: Yup.string().when("is_reserved", {
      // @ts-ignore
      is: true,
      then: (schema: any) =>
        schema
          .required("Promo Code is required")
          .matches(
            /^[A-Z0-9]*$/,
            "Promo Code must only consist of capital letters and numbers"
          )
          .min(5, "Promo Code must be at least 5 characters")
          .max(20, "Promo Code must be at most 20 characters"),
      otherwise: (schema: any) => schema.notRequired(),
    }),
  })
  .test(
    "is-valid-open-and-close",
    "Open and Close are invalid",
    function (value) {
      const isValid = validateOpenAndClose(
        value.open,
        value.close,
        value.open_window_duration || 0
      );

      if (!isValid) {
        return new Yup.ValidationError(
          "This duration is not valid with the current open and close times, try changing the duration or the open and close times",
          null,
          "open_window_duration"
        );
      }

      return true;
    }
  )
  .test("is-valid-dates", "Dates are invalid", function (value) {
    const isValid = checkDatesAreValidWithEventDate(
      value.event_date,
      value.open,
      value.close
    );

    if (!isValid) {
      return new Yup.ValidationError(
        "The open and close times must be before the event date: " +
          format(value.event_date, "yyyy-MM-dd HH:mm"),
        null,
        "close"
      );
    }

    return true;
  });

export default CreateTicketReleaseFormSchema;
