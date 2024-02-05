import * as Yup from "yup";
import { isValidDecimal } from "../utils/integer_validation";

const checkDateInFuture = (date: string) => {
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
    .max(2000, "Too long"),
  date: Yup.string()
    .required("Date is required")
    .test("is-future", "Date must be in the future", checkDateInFuture),
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
