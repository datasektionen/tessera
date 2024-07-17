import * as Yup from "yup";
import { AvaialableCountries, Country } from "../../types";
import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

// Validation schema
export const BusinessDetailsFormSchema = Yup.object().shape({
  country_code: Yup.string().required("Required"),
  legal_name: Yup.string().required("Required"),
  corporate_id: Yup.string().required("Required"),
  address_line1: Yup.string().required("Required"),
  address_line2: Yup.string().optional(),
  city: Yup.string().required("Required"),
  postal_code: Yup.string().required("Required"),
  phone_number: Yup.string()
    .required("Required")
    .test("is-valid-phone", "Invalid phone number", function (value) {
      const phone_code = AvaialableCountries.find(
        (c: Country) => c.code === this.parent.country_code
      )?.phone;
      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(
          `+${phone_code}${value}`
        );
        const isValid = phoneUtil.isValidNumber(phoneNumber);
        return phoneUtil.isValidNumber(phoneNumber);
      } catch (err) {
        return false;
      }
    }),
  business_email: Yup.string().email("Invalid email").required("Required"),
  store_name: Yup.string().required("Required"),
});
