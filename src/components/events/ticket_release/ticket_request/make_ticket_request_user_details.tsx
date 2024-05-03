import { Form, Formik } from "formik";
import { ITicketRelease } from "../../../../types";
import * as Yup from "yup";
import { Box, FormControl, Stack } from "@mui/joy";
import { FormInput } from "../../../forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { StyledErrorMessage } from "../../../forms/messages";

interface MakeTicketRequestUserDetailsProps {
  ticketRelease: ITicketRelease;
}

interface ITicketRequestUserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;

  is_saved?: boolean;
  password?: string;
  password_confirmation?: string;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().optional(),
  is_saved: Yup.boolean().optional(),

  password: Yup.string()
    .min(10, "Password must be at least 10 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password cannot be empty"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
    .required("Password repeat cannot be empty"),
});

const MakeTicketRequestUserDetails: React.FC<
  MakeTicketRequestUserDetailsProps
> = ({ ticketRelease }) => {
  return (
    <Box>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={4} direction="row">
              <FormControl>
                <StyledFormLabel>First Name</StyledFormLabel>
                <FormInput
                  name="first_name"
                  label="First Name"
                  placeholder="First Name"
                  required
                />
                <StyledErrorMessage name="first_name" />
                <StyledFormLabelWithHelperText>
                  Please enter your first name
                </StyledFormLabelWithHelperText>
              </FormControl>
              <FormControl>
                <StyledFormLabel>Last Name</StyledFormLabel>
                <FormInput
                  name="last_name"
                  label="Last Name"
                  placeholder="Last Name"
                  required
                />
                <StyledErrorMessage name="last_name" />
                <StyledFormLabelWithHelperText>
                  Please enter your last name
                </StyledFormLabelWithHelperText>
              </FormControl>
            </Stack>
            <FormControl>
              <StyledFormLabel>Email</StyledFormLabel>
              <FormInput
                name="email"
                label="Email"
                placeholder="Email"
                required
              />
              <StyledErrorMessage name="email" />
              <StyledFormLabelWithHelperText>
                Please enter your email
              </StyledFormLabelWithHelperText>
            </FormControl>
            <FormControl>
              <StyledFormLabel>Phone Number (Optional)</StyledFormLabel>
              <FormInput
                name="phone_number"
                label="Phone Number"
                placeholder="Phone Number"
                required={false}
              />
              <StyledErrorMessage name="phone_number" />
              <StyledFormLabelWithHelperText>
                Please enter your phone number
              </StyledFormLabelWithHelperText>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default MakeTicketRequestUserDetails;
