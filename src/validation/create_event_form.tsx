import * as Yup from "yup";
import { isValidDecimal } from "../utils/integer_validation";

const checkDateInFuture = (date: string | undefined) => {
  if (!date) {
    return true;
  }

  const now = new Date();
  const dateToCheck = new Date(date);
  return dateToCheck > now;
};

const CreateEventFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Too short")
    .max(10000, "Too long"),
  date: Yup.string()
    .required("Date is required"),
  end_date: Yup.string() // Removed check for future date so that it can be edited after the event has passed
    .optional()
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const startDate = this.parent.date;
        if (!value || !startDate) {
          return true;
        }
        return value > startDate;
      }
    ),
  location: Yup.object()
    .shape({
      label: Yup.string().required("Location is required"),
    })
    .required("Location is required"),
  organization_id: Yup.number()
    .required("Team is required")
    .integer("Team must be a whole number"),

  is_private: Yup.boolean(),
});

export default CreateEventFormSchema;
