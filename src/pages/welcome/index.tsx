import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Link,
  Typography,
  useTheme,
} from "@mui/joy";
import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import LoginButton from "../../components/login/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { currentUserRequest } from "../../redux/features/userSlice";
import MainPage from "../main";
import LoadingOverlay from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import StyledText from "../../components/text/styled_text";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Navigation } from "@mui/icons-material";
import NavigationBar from "../../components/navigation";

const WelcomePage = () => {
  // Get auth
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();

  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  if (isLoggedIn) {
    navigate("/");
  }

  const orLoading = userLoading;

  return (
    <>
      <NavigationBar />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",

          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: PALLETTE.offWhite,
          transform: "translateY(-50px)",
        }}
      >
        <ToastContainer
          position={isMobile ? "top-center" : "bottom-right"}
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
        {orLoading ? <LoadingOverlay /> : null}
        <StyledText level="h1" color={PALLETTE.cerise} fontSize={100}>
          Tessera
        </StyledText>
        <Typography level="h4" color="neutral">
          {t("main_page.not_a_pain")}
        </Typography>

        <Typography level="h4" color="neutral" fontSize={14} mt={3}>
          <LoginButton /> {t("main_page.login_page.secure_spot")}
        </Typography>

        <StyledText
          fontSize={14}
          color={PALLETTE.charcoal_see_through}
          level="body-sm"
          sx={{ mt: 3 }}
        >
          <Trans i18nKey="main_page.login_page.external_user">
            External user with no KTH account?
          </Trans>{" "}
          <Link href="/external">Click here</Link>
        </StyledText>

        <Box
          sx={{
            position: "absolute",
            bottom: "3%",
            width: "90%",
            textAlign: "center",
            mx: 2,
          }}
        >
          <StyledText
            fontSize={17}
            color={PALLETTE.charcoal_see_through}
            level="body-sm"
            sx={{ mt: 3 }}
          >
            <Trans i18nKey="main_page.login_page.for_business_inquiries">
              For business-related inquiries, please contact
              <Link
                href="https://www.linkedin.com/in/lucas-dow-1315a61b5/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lucas Dow
              </Link>
              , the creator of Tessera.
            </Trans>
          </StyledText>
        </Box>
      </div>
    </>
  );
};

export default WelcomePage;
