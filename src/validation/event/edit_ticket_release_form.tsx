import { format } from "date-fns";
import * as Yup from "yup";
import { isValidDecimal } from "../../utils/integer_validation";
import {
  canEditPaymentDeadlineFromId,
  canEditReservePaymentDurationFromId,
} from "../../utils/manage_event/can_edit_payment_deadline";

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

const EditTicketReleaseFormSchema = Yup.object()
  .shape({
    event_date: Yup.date().required("Event Date is required"),
    name: Yup.string()
      .required("Name is required")
      .min(3, "Too short")
      .max(80, "Too long"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Too short")
      .max(501, "Too long"),
    open: Yup.date().required("Open is required"),
    close: Yup.date()
      .required("Close is required")
      .min(Yup.ref("open"), "Close must be after open"),
    ticket_release_method_id: Yup.number()
      .required("Ticket Release Method ID is required")
      .min(1, "Ticket Release Method ID is required")
      .integer("Ticket Release Method ID must be an integer"),
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
    max_tickets_per_user: Yup.number()
      .required("Max Tickets Per User is required")
      .min(1, "Max Tickets Per User must be greater than or equal to 1")
      .max(1, "Multiple tickets per user is not supported yet")
      .integer("Max Tickets Per User must be an integer"),
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
        "is-valid-available-tickets",
        "Number of available tickets must be greater than or equal to the number of tickets per user",
        function (value) {
          const maxTicketsPerUser = this.parent.max_tickets_per_user;
          if (value < maxTicketsPerUser) {
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
    /**
     * Cannot be after the close time
     * Must be in the future
     * Must be before the event date
     */
    payment_deadline: Yup.date()
      .required("Payment Deadline is required")
      .test(
        "is-after-close",
        "Payment Deadline must be after the close time",
        function (value) {
          const close = this.parent.close;
          if (!value || !close) {
            return true;
          }

          return value > close;
        }
      )
      .test(
        "is-future",
        "Payment Deadline must be in the future",
        function (value) {
          if (!value) {
            return true; // Return true when the value is not set
          }

          return checkDateInFuture(value);
        }
      )
      .test(
        "is-valid-dates",
        "Payment Deadline must be before the event date",
        function (value) {
          const event_date = this.parent.event_date;
          if (!value || !event_date) {
            return true;
          }

          return value < event_date;
        }
      ),
    reserve_payment_duration: Yup.string().when("ticket_release_method_id", {
      // @ts-ignore
      is: (id: number) => {
        return canEditReservePaymentDurationFromId(id);
      },
      then: (schema) => schema.required("Reserve Payment Duration is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    // Defines the cut off time for allocation
    /**
     * Must be in the future
     * Must be before the event date
     * Must be after close
     */
    allocation_cut_off: Yup.date()
      .optional()
      .test(
        "is-future",
        "Allocation Cut Off must be in the future",
        function (value) {
          if (!value) {
            return true; // Return true when the value is not set
          }

          return checkDateInFuture(value);
        }
      )
      .test(
        "is-valid-dates",
        "Allocation Cut Off must be before the event date",
        function (value) {
          const event_date = this.parent.event_date;
          if (!value || !event_date) {
            return true;
          }

          return value < event_date;
        }
      )
      .test(
        "is-after-close",
        "Allocation Cut Off must be after the close time",
        function (value) {
          const close = this.parent.close;
          if (!value || !close) {
            return true;
          }

          return value > close;
        }
      ),
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
        "open"
      );
    }

    return true;
  });

export default EditTicketReleaseFormSchema;
