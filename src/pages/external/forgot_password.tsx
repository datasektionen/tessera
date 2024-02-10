import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import MainPage from "../main";
import LoadingOverlay from "../../components/Loading";
import {
  Box,
  CircularProgress,
  FormControl,
  Link,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tooltip,
  Typography,
  tabClasses,
} from "@mui/joy";
import LoginButton from "../../components/login/LoginButton";
import PALLETTE from "../../theme/pallette";
import StyledText from "../../components/text/styled_text";
import SignupForm from "./signup_form";
import { isMobile } from "react-device-detect";
import LoginForm from "./login_form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Form, Formik } from "formik";
import { FormInput } from "../../components/forms/input_types";
import { StyledErrorMessage } from "../../components/forms/messages";
import StyledButton from "../../components/buttons/styled_button";
import { useTranslation } from "react-i18next";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import * as Yup from "yup";
import { StyledFormLabel } from "../../components/forms/form_labels";

const initalValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email cannot be empty"),
});

const ForgotPassword: React.FC = () => {
  const { token } = useParams();

  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  const [hasVerified, setHasVerified] = React.useState<boolean | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRequestForgotPassword = async (values: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/password-reset`,
        {
          email: values.email,
        }
      );

      if (response.status === 201) {
        setHasVerified(true);
        toast.success("Password reset link sent to your email");
      }
    } catch (error: any) {
      const errorMessage = error.response.data.error || "An error occurred";
      toast.error(errorMessage);
    }
  };

  if (isLoggedIn && !loading) {
    navigate("/");
  }

  if (hasVerified === true) {
    setTimeout(() => {
      navigate("/external");
    }, 1000);
  }

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: PALLETTE.offWhite,
        paddingTop: "2em",
        paddingBottom: "10em",
      }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box sx={{ width: "80%", textAlign: "center" }}>
        <Typography level="h1" color="primary" fontSize={72}>
          Tessera
        </Typography>

        <StyledText level="body-md" fontSize={20} color="charcoal">
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </StyledText>

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            overflow: "auto",
            margin: "0 auto",
            marginTop: "2em",
          }}
        >
          <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              handleRequestForgotPassword(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched, values, isValid }) => (
              <Form
                style={{
                  textAlign: "left",
                }}
              >
                <FormControl>
                  <StyledFormLabel>Email*</StyledFormLabel>
                  <FormInput
                    name="email"
                    label="Email"
                    type="emaik"
                    autoComplete="email"
                    placeholder=""
                    overrideStyle={{ backgroundColor: "white", width: "300px" }}
                  />
                  <StyledErrorMessage fontSize={14} name="email" />
                </FormControl>

                <StyledButton
                  size="md"
                  bgColor="cerise"
                  textColor="charcoal"
                  disabled={!isValid}
                  type="submit"
                  style={{ width: "200px", marginTop: "20px" }}
                >
                  Request Reset
                </StyledButton>
              </Form>
            )}
          </Formik>
        </Box>
        <StyledText
          fontSize={14}
          color={PALLETTE.charcoal_see_through}
          level="body-sm"
          sx={{ mt: 3 }}
        >
          {" "}
          Done or don't need to reset your password?{" "}
          <Link href="/external">Back to login</Link>
        </StyledText>
      </Box>
    </div>
  );
};

export default ForgotPassword;
