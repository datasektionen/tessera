import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/joy";

import { ToastContainer } from "react-toastify";
import axios from "axios";
import PALLETTE from "../../../theme/pallette";
import { isMobile } from "react-device-detect";
import StyledText from "../../../components/text/styled_text";

const VerifyPreferredEmail: React.FC = () => {
  const { token } = useParams();

  const [verifyLoading, setVerifyLoading] = React.useState(true);
  const [hasVerified, setHasVerified] = React.useState<boolean | null>(null);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/preferred-email/verify`, {
        token: token,
      })
      .then((response) => {
        if (response.status === 200) {
          setHasVerified(true);
          setVerifyLoading(false);
        } else if (response.status === 204) {
          setHasVerified(true);
          setVerifyLoading(false);
        } else {
          setHasVerified(false);
          setVerifyLoading(false);
        }
      })
      .catch((error) => {
        setHasVerified(false);
        setVerifyLoading(false);
      });
  }, [token]);

  const navigate = useNavigate();

  if (hasVerified === true) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
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
              Preferred Email verified successfully, Redirecting...
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

export default VerifyPreferredEmail;
