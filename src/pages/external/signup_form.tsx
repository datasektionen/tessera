import React from "react";
import { Formik, Field, Form, FormikHelpers, FormikValues } from "formik";
import * as Yup from "yup";
import { StyledErrorMessage } from "../../components/forms/messages";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../components/forms/form_labels";
import { FormControl, Stack, Tooltip } from "@mui/joy";
import { FormInput } from "../../components/forms/input_types";
import { useTranslation } from "react-i18next";
import StyledText from "../../components/text/styled_text";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StyledButton from "../../components/buttons/styled_button";
import { ISignupFormValues, SignupInitialValues } from "../../types";
import { externalSignupRequest } from "../../redux/features/authSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name cannot be empty"),
  last_name: Yup.string().required("Last name cannot be empty"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
  password: Yup.string()
    .min(10, "Password must be at least 10 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password cannot be empty"),
  password_repeat: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
    .required("Password repeat cannot be empty"),
});

const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (values: ISignupFormValues) => {
    // Submit form values
    dispatch(externalSignupRequest(values));
    navigate("/external");
  };

  return (
    <Formik
      initialValues={SignupInitialValues}
      validationSchema={validationSchema}
      onSubmit={async (
        values: ISignupFormValues,
        actions: FormikHelpers<ISignupFormValues>
      ) => {
        // You can perform event.preventDefault() here if needed,
        // but Formik's <Form> does this by default.
        // Perform it
        // event.preventDefault();

        // You can set submitting to false if needed
        handleSignup(values);
        actions.setSubmitting(false);
      }}
      validateOnBlur={true}
    >
      {({ errors, touched, values }) => (
        <Form
          style={{
            textAlign: "left",
          }}
        >
          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.first_name")}*
            </StyledText>
            <FormInput
              name="first_name"
              label="First name"
              type="text"
              placeholder="John"
              autoComplete="given-name"
              overrideStyle={{ width: "150px", backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="first_name" />
          </FormControl>

          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.last_name")}*
            </StyledText>

            <FormInput
              name="last_name"
              label="Last name"
              type="text"
              placeholder="Doe"
              autoComplete="family-name"
              overrideStyle={{ width: "150px", backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="last_name" />
          </FormControl>

          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.email")}*
            </StyledText>
            <FormInput
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder=""
              overrideStyle={{ backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="email" />
          </FormControl>

          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.password")}*
              <Tooltip
                title={
                  "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
                }
              >
                <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
              </Tooltip>
            </StyledText>
            <FormInput
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder=""
              overrideStyle={{ backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="password" />
          </FormControl>

          <FormControl>
            <StyledText level="body-md" fontSize={15} color="charcoal">
              {t("external.form.password_repeat")}*
            </StyledText>
            <FormInput
              name="password_repeat"
              label="Repeat password"
              type="password"
              autoComplete="new-password"
              placeholder=""
              overrideStyle={{ backgroundColor: "white" }}
            />
            <StyledErrorMessage fontSize={14} name="password_repeat" />
          </FormControl>

          <StyledButton
            size="md"
            bgColor="cerise"
            textColor="charcoal"
            type="submit"
            style={{ width: "100px", marginTop: "20px" }}
          >
            {t("external.form.button_signup")}
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
