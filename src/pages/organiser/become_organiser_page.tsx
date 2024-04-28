import React from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import MainPage from "../main";
import LoadingOverlay from "../../components/Loading";
import {
  Box,
  Link,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
} from "@mui/joy";
import LoginButton from "../../components/login/LoginButton";
import PALLETTE from "../../theme/pallette";
import StyledText from "../../components/text/styled_text";
import { isMobile } from "react-device-detect";
import { ToastContainer } from "react-toastify";
import NavigationBar from "../../components/navigation";
import { Trans, useTranslation } from "react-i18next";
import CustomerLoginForm from "../../components/customer/login_form";
import {
  ICustomerLoginValues,
  ICustomerSignupValues,
  ILoginFormValues,
} from "../../types";
import CustomerSignupForm from "../../components/customer/signup_form";
import { useDispatch } from "react-redux";
import {
  customerLoginRequest,
  customerSignupRequest,
} from "../../redux/features/authSlice";

const BecomeAnOrganiserPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const orLoading = userLoading;

  // Check on mobile

  return (
    <>
      <NavigationBar
        loginOptions={{
          showLogin: true,
        }}
      />
      <Box
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: PALLETTE.offWhite,
          paddingTop: "2em",
          paddingBottom: "10em",
        }}
      >
        {loading && <LoadingOverlay />}
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
        <Box sx={{ width: "95%", textAlign: "center" }}>
          {orLoading ? <LoadingOverlay /> : null}
          <StyledText level="h1" color={PALLETTE.cerise} fontSize={72}>
            Tessera
          </StyledText>
          <Typography level="h4" color="neutral">
            {t("customer.info.subtitle")}
          </Typography>

          <StyledText
            level="h4"
            color={PALLETTE.charcoal}
            fontSize={18}
            fontWeight={500}
            style={{
              width: "100%",
              margin: "0 auto",
              marginTop: "1em",
            }}
            sx={{
              textWrap: "balance",
            }}
          >
            {t("customer.info.description")}
          </StyledText>
        </Box>
      </Box>
    </>
  );
};

export default BecomeAnOrganiserPage;
