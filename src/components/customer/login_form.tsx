import { FormControl, Link } from "@mui/joy";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { ICustomerLoginValues } from "../../types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import { FormInput } from "../forms/input_types";
import { StyledErrorMessage } from "../forms/messages";
import StyledButton from "../buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// Validation schema remains unchanged
const customerLoginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface LoginFormProps {
  isValid: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isValid }) => {
  const { values } = useFormikContext<ICustomerLoginValues>();
  const { t } = useTranslation();

  return (
    <Form>
      <FormControl>
        <StyledFormLabel>
          {t("event.ticket_release.request_process.form.email")}
        </StyledFormLabel>
        <FormInput name="email" label="Email" placeholder="Email" required />
        <StyledErrorMessage name="email" />
      </FormControl>
      <FormControl>
        <StyledFormLabel>
          {t("event.ticket_release.request_process.form.password")}
        </StyledFormLabel>
        <FormInput
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          required
        />
        <StyledErrorMessage name="password" />
      </FormControl>

      <StyledButton
        type="submit"
        size="md"
        bgColor={PALLETTE.cerise}
        color={PALLETTE.offBlack}
        disabled={!isValid}
      >
        {t("event.ticket_release.request_process.form.button_sign_in")}
      </StyledButton>
    </Form>
  );
};

interface CustomerLoginFormProps {
  onLogin: (values: ICustomerLoginValues) => void;
}

const CustomerLoginForm: React.FC<CustomerLoginFormProps> = ({ onLogin }) => {
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
      onSubmit={(values) => {
        onLogin(values);
      }}
      enableReinitialize
    >
      {({ isValid }) => <LoginForm isValid={isValid} />}
    </Formik>
  );
};

export default CustomerLoginForm;
