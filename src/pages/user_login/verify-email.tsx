import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import MainPage from "../main";
import LoadingOverlay from "../../components/Loading";
import {
  Box,
  CircularProgress,
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
import axios from "axios";

const ExternalVerifyEmail: React.FC = () => {
  const { token } = useParams();

  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  const [verifyLoading, setVerifyLoading] = React.useState(true);
  const [hasVerified, setHasVerified] = React.useState<boolean | null>(null);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/verify-email`,
        {
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setHasVerified(true);
          setVerifyLoading(false);
        } else {
          setHasVerified(false);
          setVerifyLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.data.error === "Email already verified") {
          setHasVerified(true);
          setVerifyLoading(false);
          return;
        }

        setHasVerified(false);
        setVerifyLoading(false);
      });
  }, [token]);

  const navigate = useNavigate();

  if (isLoggedIn && !loading) {
    navigate("/");
  }

  if (hasVerified === true) {
    setTimeout(() => {
      navigate("/?email-verified=true");
    }, 1000);
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PALLETTE.offWhite,
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
        {verifyLoading ? "Verifying..." : null}
        {hasVerified === true ? (
          <>
            <StyledText
              level="h4"
              color={PALLETTE.green}
              fontSize={22}
              fontWeight={700}
            >
              Verified! Redirecting...
            </StyledText>
            <CircularProgress sx={{ mt: 2 }} />
          </>
        ) : null}
        {hasVerified === false && (
          <StyledText
            level="h4"
            color={PALLETTE.red}
            fontSize={22}
            fontWeight={700}
          >
            Verification failed. Please try again or contact us.
          </StyledText>
        )}
      </Box>
    </div>
  );
};

export default ExternalVerifyEmail;
