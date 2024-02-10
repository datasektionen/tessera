import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { StyledErrorMessage } from "../../components/forms/messages";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../components/forms/form_labels";
import { FormControl, Link, Stack, Tooltip } from "@mui/joy";
import { FormInput } from "../../components/forms/input_types";
import { useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StyledButton from "../../components/buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { ILoginFormValues, LoginInitialValues } from "../../types";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { externalLoginRequest } from "../../redux/features/authSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
  password: Yup.string().required("Password cannot be empty"),
});

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = (values: ILoginFormValues) => {
    // Submit form values
    dispatch(externalLoginRequest(values));
  };

  return (
    <Formik
      initialValues={LoginInitialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        // Submit form values
        handleLogin(values);
      }}
      validateOnBlur={true}
    >
      {({ errors, touched }) => (
        <Form
          style={{
            textAlign: "left",
          }}
        >
          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.email")}*
            </StyledText>
            <FormInput
              name="email"
              label="First name"
              autoComplete="email"
              type="text"
              placeholder="John"
              overrideStyle={{ width: "250px", backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="email" />
          </FormControl>

          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.password")}*
            </StyledText>

            <FormInput
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              placeholder="Enter password"
              overrideStyle={{ width: "250px", backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="password" />
          </FormControl>

          <StyledButton
            size="md"
            bgColor="cerise"
            textColor="charcoal"
            type="submit"
            style={{ width: "100px", marginTop: "20px" }}
          >
            {t("external.form.button_login")}
          </StyledButton>

          <StyledText
            level="body-md"
            fontSize={15}
            color={PALLETTE.charcoal_see_through}
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Forgot your password?{" "}
            <Link href="/forgot-password">Click here</Link> <br />
            {t("external.form.no_account")}
          </StyledText>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
