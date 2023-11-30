import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginCredentials } from "../../types";
import { RootState } from "../../store";
import { loginRequest, loginSuccess } from "../../redux/features/authSlice";
import { Button } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import Cookies from "js-cookie";
import { currentUserRequest } from "../../redux/features/userSlice";

const LoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  // Get query params from URL
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    dispatch(currentUserRequest());
  }, [dispatch]);

  const handleLogin = () => {
    console.log("login");
    dispatch(loginRequest());
  };

  return (
    <Button
      color="neutral"
      disabled={false}
      size="md"
      variant="soft"
      onClick={() => {
        handleLogin();
      }}
      style={{ background: PALLETTE.cerise, marginRight: 10 }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
