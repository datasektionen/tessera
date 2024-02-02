import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
import SignupForm from "./signup_form";
import { isMobile } from "react-device-detect";
import LoginForm from "./login_form";

const External: React.FC = () => {
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

  // Check on mobile

  return isLoggedIn ? (
    <MainPage />
  ) : (
    <div
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: PALLETTE.offWhite,
        paddingTop: "2em",
        paddingBottom: "10em",
      }}
    >
      <Box sx={{ width: !isMobile ? "50%" : "80%", textAlign: "center" }}>
        {orLoading ? <LoadingOverlay /> : null}
        <Typography level="h1" color="primary" fontSize={72}>
          Tessera
        </Typography>
        <Typography level="h4" color="neutral">
          External login and signup.
        </Typography>

        <StyledText
          level="h4"
          color={PALLETTE.charcoal}
          fontSize={16}
          fontWeight={500}
          style={{
            width: "100%",
            margin: "0 auto",
            marginTop: "1em",
          }}
        >
          If you're not a KTH student, you can still use Tessera. However since
          you don't have a KTH account, you'll need to use a different login
          method. When using tessera, you will only be able to purchase tickets
          from ticket releases that are specific to external users. These may
          include "+1"-tickets, or honorary tickets for special guests.
        </StyledText>

        <Tabs
          orientation="horizontal"
          defaultValue={0}
          sx={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "lg",
            boxShadow: "sm",
            overflow: "auto",
            margin: "0 auto",
            marginTop: "2em",
          }}
        >
          <TabList
            disableUnderline
            sx={{
              [`& .${tabClasses.root}`]: {
                fontSize: "sm",
                fontWeight: "lg",
                [`&[aria-selected="true"]`]: {
                  color: "primary.500",
                  bgcolor: "background.surface",
                },
                [`&.${tabClasses.focusVisible}`]: {
                  outlineOffset: "-4px",
                },
              },
            }}
          >
            <Tab
              variant="outlined"
              color="neutral"
              disableIndicator
              sx={{ flexGrow: 1 }}
            >
              Signup
            </Tab>
            <Tab
              variant="outlined"
              color="neutral"
              disableIndicator
              sx={{ flexGrow: 1 }}
            >
              Login
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <SignupForm />
          </TabPanel>
          <TabPanel value={1}>
            <LoginForm />
          </TabPanel>
        </Tabs>
        <StyledText
          fontSize={14}
          color={PALLETTE.charcoal_see_through}
          level="body-sm"
          sx={{ mt: 3 }}
        >
          But i have a KTH account! Then <Link href="/login">Click here</Link>
        </StyledText>
      </Box>
    </div>
  );
};

export default External;
