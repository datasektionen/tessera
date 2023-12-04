import { AspectRatio, Button, Divider, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import LoginButton from "../../components/login/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { currentUserRequest } from "../../redux/features/userSlice";
import MainPage from "../main";
import LoadingOverlay from "../../components/Loading";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  // Get auth
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();

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
    </div>
  );
};

export default WelcomePage;
