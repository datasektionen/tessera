import { FormControl, Link } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { FormInput } from "../../../forms/input_types";
import { StyledErrorMessage } from "../../../forms/messages";
import StyledText from "../../../text/styled_text";
import StyledButton from "../../../buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ICustomerLoginValues } from "../../../../types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { customerLoginRequest } from "../../../../redux/features/authSlice";

const customerLoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface CustomerLoginFormProps {
  accountIsRequired: boolean;
  onLoginContinue: (values: ICustomerLoginValues) => void;
  goBack?: () => void;
}

const CustomerLoginForm: React.FC<CustomerLoginFormProps> = ({
  accountIsRequired,
  onLoginContinue,
  goBack,
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={customerLoginValidationSchema}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values) => {}}
      enableReinitialize
    >
      {({ values, isValid }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginContinue(values);
          }}
        >
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
            <StyledFormLabel>Password</StyledFormLabel>
            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              required
            />
            <StyledErrorMessage name="password" />
            <StyledFormLabelWithHelperText>
              Please enter your password
            </StyledFormLabelWithHelperText>
          </FormControl>

          <StyledButton
            type="submit"
            size="md"
            bgColor={PALLETTE.cerise}
            color={PALLETTE.offBlack}
            disabled={!isValid}
          >
            Sign In
          </StyledButton>
          <StyledText
            level="body"
            color={PALLETTE.charcoal_see_through}
            fontSize={16}
            sx={{
              mt: 1,
            }}
          >
            <Link href="/forgot-password">Forgot your password?</Link>
          </StyledText>
          <StyledText
            level="body"
            color={PALLETTE.charcoal_see_through}
            fontSize={16}
            onClick={() => goBack && goBack()}
            sx={{
              mt: 1,
            }}
          >
            <Link href="#">Continue as guest</Link>
          </StyledText>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerLoginForm;
