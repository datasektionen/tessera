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
import { isMobile } from "react-device-detect";
import { ToastContainer } from "react-toastify";
import NavigationBar from "../../components/navigation";
import { Trans, useTranslation } from "react-i18next";
import CustomerLoginForm from "../../components/customer/login_form";
import { ICustomerLoginValues, ILoginFormValues } from "../../types";

const External: React.FC = () => {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);
  const { loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  const [tabIndex, setTabIndex] = React.useState(
    Number(localStorage.getItem("tabIndex")) || 0
  );

  React.useEffect(() => {
    localStorage.setItem("tabIndex", String(tabIndex));
  }, [tabIndex]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (values: ICustomerLoginValues) => {
    // Submit form values
  };

  if (isLoggedIn) {
    navigate("/");
  }

  const orLoading = userLoading;

  // Check on mobile

  return (
    <>
      <NavigationBar />
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
        {loading && <LoadingOverlay />}
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
          {orLoading ? <LoadingOverlay /> : null}
          <Typography level="h1" color="primary" fontSize={72}>
            Tessera
          </Typography>
          <Typography level="h4" color="neutral">
            {t("external.info.subtitle")}
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
            {t("external.info.description")}
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
            onChange={(_, newValue: any) => setTabIndex(newValue)}
            value={tabIndex}
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
                {t("external.login")}
              </Tab>
              <Tab
                variant="outlined"
                color="neutral"
                disableIndicator
                sx={{ flexGrow: 1 }}
              >
                {t("external.signup")}
              </Tab>
            </TabList>
            <TabPanel value={0}>
              <CustomerLoginForm
                onLogin={() => {
                  navigate("/");
                }}
              />
            </TabPanel>
            <TabPanel value={1}>{/* <SignupForm /> */}</TabPanel>
          </Tabs>
          <StyledText
            fontSize={14}
            color={PALLETTE.charcoal_see_through}
            level="body-sm"
            sx={{ mt: 3 }}
          >
            <Trans i18nKey="external.info.i_have_kth_account">
              but ifwjidjqwoidqjwdi
              <Link href="/login">Click here</Link>
            </Trans>
          </StyledText>
        </Box>
      </div>
    </>
  );
};

export default External;
