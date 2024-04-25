import { Form, Formik } from "formik";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  IGuestCustomer,
  IGuestCustomerForm,
  ITicketRelease,
} from "../../../../types";
import * as Yup from "yup";
import { Box, Divider, FormControl, Link, Stack } from "@mui/joy";
import { FormCheckbox, FormInput } from "../../../forms/input_types";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { StyledErrorMessage } from "../../../forms/messages";
import StyledButton from "../../../buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch } from "react-redux";
import CustomerLoginForm from "./customer_login_form";
import {
  customerLoginRequest,
  customerSignupRequest,
} from "../../../../redux/features/authSlice";
import { useSelector } from "react-redux";
import {
  hasLottery,
  ticketReleaseRequiresAccount,
} from "../../../../utils/manage_event/can_edit_payment_deadline";
import { useTranslation } from "react-i18next";

interface MakeTicketRequestUserDetailsProps {
  accountIsRequired: boolean;
  ticketRelease: ITicketRelease;
  onSignupContinue: (values: ICustomerSignupValues) => void;
  onLoginContinue: () => void;
}

const createValidationSchema = (accountIsRequired: boolean) => {
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

const MakeTicketRequestUserDetails: React.FC<
  MakeTicketRequestUserDetailsProps
> = ({
  accountIsRequired,
  ticketRelease,
  onLoginContinue,
  onSignupContinue,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_saved: accountIsRequired,
    password: "",
    password_repeat: "",
  };

  const onSignup = (values: ICustomerSignupValues) => {
    dispatch(customerSignupRequest(values));

    if (values.is_saved) {
      setHasAccount(true);
    }
  };

  const onLogin = (values: ICustomerLoginValues) => {
    dispatch(customerLoginRequest(values));
  };

  // "event.ticket_release.request_process"
  const { t } = useTranslation();

  const validatationSchema = createValidationSchema(accountIsRequired);

  return (
    <Box>
      {/* Already has an account */}
      {accountIsRequired && (
        <StyledText
          level="body"
          color={PALLETTE.charcoal}
          fontWeight={700}
          fontSize={18}
          sx={{
            my: 1,
          }}
        >
          {t(
            "event.ticket_release.request_process.account_required_description"
          )}
        </StyledText>
      )}
      {!hasAccount && (
        <Box>
          <StyledText level="h4" color={PALLETTE.cerise_dark}>
            {t("event.ticket_release.request_process.already_have_an_account")}
          </StyledText>
          <StyledButton
            onClick={() => setHasAccount(true)}
            size="md"
            bgColor={PALLETTE.cerise}
            color={PALLETTE.offBlack}
            sx={{
              mt: 1,
            }}
          >
            {t("form.button_sign_in")}
          </StyledButton>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {hasAccount ? (
        <CustomerLoginForm
          accountIsRequired={accountIsRequired}
          onLoginContinue={onLogin}
          goBack={() => {
            setHasAccount(false);
          }}
        />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validatationSchema}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={true}
          onSubmit={(values) => {}}
          enableReinitialize
          validate={(values) => {
            console.log("values", values);
          }}
        >
          {({ values, isValid, errors }) => {
            console.log(errors);
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSignup(values);
                }}
              >
                <StyledText
                  level="h4"
                  color={PALLETTE.cerise_dark}
                  fontSize={22}
                  fontWeight={700}
                  sx={{
                    mb: 2,
                  }}
                >
                  {values.is_saved ? "Sign Up" : "Continue as Guest"}
                </StyledText>
                <Stack spacing={4} direction="row">
                  <FormControl>
                    <StyledFormLabel>
                      {t(
                        "event.ticket_release.request_process.form.first_name"
                      )}
                    </StyledFormLabel>
                    <FormInput
                      name="first_name"
                      label="First Name"
                      placeholder="First Name"
                      required
                    />
                    <StyledErrorMessage name="first_name" />
                  </FormControl>
                  <FormControl>
                    <StyledFormLabel>
                      {t("event.ticket_release.request_process.form.last_name")}
                    </StyledFormLabel>
                    <FormInput
                      name="last_name"
                      label="Last Name"
                      placeholder="Last Name"
                      required
                    />
                    <StyledErrorMessage name="last_name" />
                  </FormControl>
                </Stack>
                <FormControl
                  sx={{
                    mt: 1,
                  }}
                >
                  <StyledFormLabel>
                    {t("event.ticket_release.request_process.form.email")}
                  </StyledFormLabel>
                  <FormInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    required
                  />
                  <StyledErrorMessage name="email" />
                </FormControl>
                <FormControl
                  sx={{
                    mt: 1,
                  }}
                >
                  <StyledFormLabel>
                    {t(
                      "event.ticket_release.request_process.form.phone_number"
                    )}
                  </StyledFormLabel>
                  <FormInput
                    name="phone_number"
                    label="Phone Number"
                    placeholder="Phone Number"
                    required={false}
                  />
                  <StyledErrorMessage name="phone_number" />
                </FormControl>

                <FormControl
                  sx={{
                    mt: 1,
                  }}
                >
                  <StyledFormLabel>
                    {t(
                      "event.ticket_release.request_process.form.button_save_account"
                    )}
                  </StyledFormLabel>
                  <FormCheckbox
                    name="is_saved"
                    label="Save my details for future purchases"
                    disabled={accountIsRequired}
                  />
                  <StyledErrorMessage name="is_saved" />
                  <StyledFormLabelWithHelperText>
                    {t(
                      "event.ticket_release.request_process.form.button_save_account_helperText"
                    )}
                  </StyledFormLabelWithHelperText>
                </FormControl>

                {values.is_saved && (
                  <Box>
                    <FormControl>
                      <StyledFormLabel>
                        {t(
                          "event.ticket_release.request_process.form.password"
                        )}
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
                    <FormControl>
                      <StyledFormLabel>
                        {t(
                          "event.ticket_release.request_process.form.password_repeat"
                        )}
                      </StyledFormLabel>
                      <FormInput
                        name="password_repeat"
                        label="Password Repeat"
                        placeholder="Repeat Password"
                        type="password"
                        required
                      />
                      <StyledErrorMessage name="password_repeat" />
                    </FormControl>
                  </Box>
                )}

                {/* TODO: Add GDPR compliance and other checkboxes */}

                <StyledButton
                  type="submit"
                  size="md"
                  bgColor={PALLETTE.cerise}
                  color={PALLETTE.offBlack}
                  disabled={!isValid}
                  sx={{
                    mt: 2,
                  }}
                >
                  {values && values.is_saved
                    ? t(
                        "event.ticket_release.request_process.form.button_sign_up"
                      )
                    : t(
                        "event.ticket_release.request_process.form.button_continue_as_guest"
                      )}
                </StyledButton>
              </Form>
            );
          }}
        </Formik>
      )}
    </Box>
  );
};

export default MakeTicketRequestUserDetails;
