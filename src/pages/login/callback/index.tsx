import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { currentUserRequest } from "../../../redux/features/userSlice";
import { AppDispatch, RootState } from "../../../store";
import { is } from "immer/dist/internal";
import { Box, CircularProgress } from "@mui/joy";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { toast } from "react-toastify";
import { clearLoginRedirect } from "../../../redux/features/authSlice";

const HandleLoginCallback: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, onLoginRedirect } = useSelector(
    (state: RootState) => state.auth
  );
  const { user } = useSelector((state: RootState) => state.user);

  const attemptCountRef = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLoggedIn && user) {
        clearInterval(intervalId);

        if (onLoginRedirect) {
          dispatch(clearLoginRedirect());
          navigate(decodeURIComponent(onLoginRedirect));
          return;
        }

        navigate("/");
      }

      dispatch(currentUserRequest());

      attemptCountRef.current += 1;
      if (attemptCountRef.current >= 3) {
        clearInterval(intervalId);

        setTimeout(() => {
          toast.error("Failed to log you in. Please try again.");
        }, 1000);

        navigate("/login");
        // Redirect to login page
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn, user]);
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <StyledText
        color={PALLETTE.charcoal_see_through}
        level="h2"
        sx={{ mt: 5 }}
      >
        Keep Tight! We are logging you in...
      </StyledText>
    </Box>
  );
};

export default HandleLoginCallback;
