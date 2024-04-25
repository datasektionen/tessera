import { Box, Divider, FormControl, Link, Stack } from "@mui/joy";
import { Form, Formik, useFormikContext } from "formik";
import { ICustomerSignupValues, ITicketRelease } from "../../types";
import { useTranslation } from "react-i18next";
import StyledButton from "../buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { useState } from "react";
import { createSignupValidationSchema } from "../../validation/customer_signup_validation";
import StyledText from "../text/styled_text";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../forms/form_labels";
import { FormCheckbox, FormInput } from "../forms/input_types";
import { StyledErrorMessage } from "../forms/messages";

interface SignupFormProps {
  accountIsRequired: boolean;
  onSignup: (values: ICustomerSignupValues) => void;
  initialValues: ICustomerSignupValues;
  validationSchema: any;
}

const SignupForm: React.FC<SignupFormProps> = ({
  accountIsRequired,
  onSignup,
  initialValues,
  validationSchema,
}) => {
  const { t } = useTranslation();
  const { isValid, values, errors } = useFormikContext<ICustomerSignupValues>();

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
            {t("event.ticket_release.request_process.form.first_name")}
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
        <FormInput name="email" label="Email" placeholder="Email" required />
        <StyledErrorMessage name="email" />
      </FormControl>
      <FormControl
        sx={{
          mt: 1,
        }}
      >
        <StyledFormLabel>
          {t("event.ticket_release.request_process.form.phone_number")}
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
          {t("event.ticket_release.request_process.form.button_save_account")}
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
          <FormControl>
            <StyledFormLabel>
              {t("event.ticket_release.request_process.form.password_repeat")}
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
          ? t("event.ticket_release.request_process.form.button_sign_up")
          : t(
              "event.ticket_release.request_process.form.button_continue_as_guest"
            )}
      </StyledButton>
    </Form>
  );
};

interface CustomerSignupFormProps {
  accountIsRequired: boolean;
  onSignupContinue: (values: ICustomerSignupValues) => void;
}

const CustomerSignupForm: React.FC<CustomerSignupFormProps> = ({
  onSignupContinue,
  accountIsRequired,
}) => {
  const initialValues: ICustomerSignupValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_saved: accountIsRequired,
    password: "",
    password_repeat: "",
  };

  const validationSchema = createSignupValidationSchema(accountIsRequired);

  return (
    <Box>
      {/* Other UI components remain the same */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSignupContinue(values)}
        validateOnBlur={true}
        validateOnChange={true}
        validateOnMount={true}
        enableReinitialize
      >
        <SignupForm
          accountIsRequired={accountIsRequired}
          onSignup={onSignupContinue}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Formik>
    </Box>
  );
};

export default CustomerSignupForm;
