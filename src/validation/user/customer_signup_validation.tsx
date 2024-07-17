import * as Yup from "yup";

export const createSignupValidationSchema = (accountIsRequired: boolean) => {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string().optional(),
    is_saved: accountIsRequired ? Yup.boolean().required() : Yup.boolean(),

    password: accountIsRequired
      ? Yup.string()
          .min(10, "Password must be at least 10 characters long")
          .matches(
            /[a-z]/,
            "Password must contain at least one lowercase letter"
          )
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .required("Password cannot be empty")
      : Yup.string().optional(),

    password_repeat: accountIsRequired
      ? Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
          .required("Password repeat cannot be empty")
      : Yup.string().optional(),
  });

  return validationSchema;
};
