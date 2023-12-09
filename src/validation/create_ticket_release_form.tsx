import * as Yup from "yup";

const checkDateInFuture = (timestamp: Date) => {
  const now = new Date();
  return timestamp > now;
};

const validateOpenAndClose = (
  open: Date,
  close: Date,
  open_window_duration: number
) => {
  // Check that open is before close
  // Check that open + open_window_duration is before close

  if (open > close) {
    return false;
  }

  if (!open || !close || !open_window_duration) {
    return false;
  }

  const openTimestamp = open.getTime();
  const windowTimestamp = openTimestamp + open_window_duration * 60 * 1000;

  if (windowTimestamp > close.getTime()) {
    return false;
  }

  return true;
};

const CreateTicketReleaseFormSchema = Yup.object()
  .shape({
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
      .min(1, "Ticket Release Method ID is required"),
    open_window_duration: Yup.number()
      .required("Open Window Duration is required")
      .min(1, "Open Window Duration must be greater than or equal to 1"),
    max_tickets_per_user: Yup.number()
      .required("Max Tickets Per User is required")
      .min(1, "Max Tickets Per User must be greater than or equal to 1"),
    notification_method: Yup.string().required(
      "Notification Method is required"
    ),
    cancellation_policy: Yup.string().required(
      "Cancellation Policy is required"
    ),
  })
  .test(
    "is-valid-open-and-close",
    "Open and Close are invalid",
    function (value) {
      const isValid = validateOpenAndClose(
        value.open,
        value.close,
        value.open_window_duration
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
  );

export default CreateTicketReleaseFormSchema;
