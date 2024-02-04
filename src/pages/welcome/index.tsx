import {
  AspectRatio,
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

const WelcomePage = () => {
  // Get auth
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

  if (loading) {
    return null;
  }

  if (isLoggedIn) {
    navigate("/");
  }

  const orLoading = userLoading;

  return isLoggedIn ? (
    <MainPage />
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: PALLETTE.offWhite,
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
      <Typography level="h1" color="primary" fontSize={72}>
        Tessera
      </Typography>
      <Typography level="h4" color="neutral">
        Ticket releases should not be a pain.
      </Typography>

      <Typography level="h4" color="neutral" fontSize={14} mt={3}>
        <LoginButton /> To secure your spot.
      </Typography>

      <StyledText
        fontSize={14}
        color={PALLETTE.charcoal_see_through}
        level="body-sm"
        sx={{ mt: 3 }}
      >
        External user with no KTH account?{" "}
        <Link href="/external">Click here</Link>
      </StyledText>
    </div>
  );
};

export default WelcomePage;
