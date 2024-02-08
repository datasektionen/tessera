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
import TesseraWrapper from "../../components/wrappers/page_wrapper";

const FourOFour404: React.FC = () => {
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

  return (
    <TesseraWrapper>
      <Box
        sx={{
          width: "75%",
          margin: "32px auto",
        }}
      >
        <StyledText
          level="h1"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={48}
          sx={{
            textAlign: "center",
          }}
        >
          Page Not Found
        </StyledText>
      </Box>
    </TesseraWrapper>
  );
};

export default FourOFour404;
