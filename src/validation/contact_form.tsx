import * as Yup from "yup";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  subject: Yup.string()
    .required("Subject is required")
    .min(3, "Too short")
    .max(50, "Too long"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Too short")
    .max(2000, "Too long"),
});

export default ContactFormSchema;
