import * as Yup from "yup";
import { parseDurationInput } from "../utils/date_conversions";

const PaymentDeadlineFormValidation = Yup.object().shape({
  payment_deadline: Yup.date()
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) {
        return false;
      }
      return value.getTime() > Date.now();
    })
    .required("Required"),
  reserve_payment_duration: Yup.string()
    .test("is-valid-duration", "Invalid duration", (value) => {
      if (!value) {
        return false;
      }
      try {
        return parseDurationInput(value) !== 0;
      } catch (error) {
        return false;
      }
    })
    .required("Required"),
});

export default PaymentDeadlineFormValidation;
