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

const initialValues = {
  password: "",
  password_repeat: "",
};

const validationSchema = Yup.object({
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

const PasswordReset: React.FC = () => {
  const { token } = useParams();

  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  const [hasVerified, setHasVerified] = React.useState<boolean | null>(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleResetPassword = async (values: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/password-reset/complete`,
        {
          token: token,
          new_password: values.password,
        }
      );

      if (response.status === 200) {
        setHasVerified(true);
        toast.success("Password reset successful");
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
      <Box sx={{ width: !isMobile ? "50%" : "80%", textAlign: "center" }}>
        <Typography level="h1" color="primary" fontSize={72}>
          Tessera
        </Typography>

        <StyledText level="body-md" fontSize={20} color="charcoal">
          Please enter your new password below.
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={(values, actions) => {
              handleResetPassword(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched, values }) => (
              <Form
                style={{
                  textAlign: "left",
                }}
              >
                <FormControl>
                  <StyledText level="body-md" fontSize={15} color="charcoal">
                    {t("external.form.password")}*
                    <Tooltip
                      title={
                        "Password must be at least 10 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
                      }
                    >
                      <HelpOutlineIcon
                        fontSize="inherit"
                        sx={{ marginLeft: 2 }}
                      />
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
                  style={{ width: "200px", marginTop: "20px" }}
                >
                  Reset Password
                </StyledButton>
              </Form>
            )}
          </Formik>
        </Box>
        <StyledText
          level="body-md"
          fontSize={15}
          color={PALLETTE.charcoal_see_through}
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Done or don't need to reset your password?{" "}
          <Link href="/external">Back to login</Link>
        </StyledText>
      </Box>
    </div>
  );
};

export default PasswordReset;
