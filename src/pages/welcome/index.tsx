import { AspectRatio, Button, Divider, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import LoginButton from "../../components/login/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

const WelcomePage = () => {
  // Get auth
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography level="h1">Loading...</Typography>
      </div>
    );
  }

  return isLoggedIn ? (
    <div>
      <Typography level="h1">Welcome</Typography>
      <Divider />
      <Typography level="h2">You are logged in</Typography>
    </div>
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
