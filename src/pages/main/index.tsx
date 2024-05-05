import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import { Box, Grid, Typography, styled, useTheme } from "@mui/joy";
import Navigation from "../../components/navigation";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getEventsRequest } from "../../redux/features/listEventsSlice";
import EventList from "../../components/events/list";
import BorderBox from "../../components/wrappers/border_box";
import Title from "../../components/text/title";
import { getUserFullName } from "../../utils/user_utils";
import StyledText from "../../components/text/styled_text";
import StyledButton from "../../components/buttons/styled_button";
import MainPageButton from "../../components/buttons/main_page_button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import mainPageImage from "../../assets/images/main_page.jpg";
import styles from "./divider.module.css";
import CallToActionButton from "../../components/buttons/call_to_action_button";
import CommonlyAskedQuestions from "../../components/faq";
import { isMobile } from "react-device-detect";
import { useMediaQuery } from "@mui/material";
import Footer from "../../components/wrappers/footer";
import ContactDetails from "./get_in_touch";
import { BorderTop } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HowToUse from "./how_to_use";

import Bg1 from "../../assets/backgrounds/1.svg";
import Bg2 from "../../assets/backgrounds/2.svg";
import { TypeAnimation } from "react-type-animation";
import { ToastContainer, toast } from "react-toastify";
import { ROUTES } from "../../routes/def";

const EXCLUDED_POST_LOGIN_ENDPOINTS = [
  ROUTES.POST_LOGIN,
  ROUTES.BECOME_A_MANAGER,
];

const MainPage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { language } = useSelector((state: RootState) => state.language);

  // useEffect(() => {
  //   dispatch(getEventsRequest());
  // }, []);

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  const { ref: getInTouchButtonRef, inView: getInTouchButtonInView } =
    useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

  const LearnHowRef = React.useRef<HTMLDivElement>(null);
  const GetInTouchRef = React.useRef<HTMLDivElement>(null);

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 2.5, duration: 0.8 } },
  };

  useEffect(() => {
    // get email-verified query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const emailVerified = urlParams.get("email-verified");
    if (emailVerified === "true") {
      // Show toast
      setTimeout(() => {
        toast.success("Email verified successfully!");
      }, 0);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const location = useLocation();

  if (
    currentUser &&
    !currentUser.showed_post_login &&
    !EXCLUDED_POST_LOGIN_ENDPOINTS.includes(location.pathname)
  ) {
    navigate("/post-login");
  }

  return (
    <div
      style={{
        overflow: "hidden",
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
      <Navigation
        loginOptions={{
          showLogin: true,
        }}
      />
      <Box
        className={styles.divider}
        sx={{
          top: 0,
          left: 0,
          width: "100%", // Full width
          height: "fit-content", // Height is based on content
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
          }}
        >
          <img
            src={mainPageImage}
            alt="main page"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "blur(4px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgb(25, 25, 25), transparent)",
            }}
          />
        </div>
        <Box
          sx={{
            position: "absolute",
            top: isScreenSmall ? "15%" : "20%", // Adjust position based on screen size
            left: isScreenSmall ? "15%" : "20%", // Adjust position based on screen size
          }}
        >
          {isLoggedIn && (
            <StyledText
              color={PALLETTE.offWhite}
              level="body-md"
              fontSize={isScreenSmall ? 16 : 24}
            >
              {
                t("main_page.welcome", {
                  name: getUserFullName(currentUser!),
                }) as string
              }
            </StyledText>
          )}
          <Title fontSize={isScreenSmall ? 64 : 128} color={PALLETTE.cerise}>
            Tessera
          </Title>
          <StyledText
            color={PALLETTE.offWhite}
            level="body-md"
            fontSize={isScreenSmall ? 16 : 42}
            style={{
              marginTop: isScreenSmall ? "-16px" : "-32px",
            }}
          >
            <TypeAnimation
              key={language}
              sequence={[
                t("main_page.phrases.1"),
                1000, // Waits 1s
                t("main_page.phrases.2"),
                1000, // Waits 2s
                t("main_page.phrases.3"),
                1000,
                t("main_page.phrases.4"),
                1000,
                t("main_page.phrases.5"),
                1000,
                t("main_page.phrases.6"),
                2000,
              ]}
              deletionSpeed={70}
              speed={60}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </StyledText>
        </Box>
        <Box
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        >
          <CallToActionButton
            title={t("main_page.learn_how_button")}
            scrollRef={LearnHowRef}
          />
        </Box>
      </Box>
      <Box
        ref={LearnHowRef}
        sx={{ width: "100%" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
          position: "relative",
        }}
      >
        <HowToUse />
        <Box
          ref={getInTouchButtonRef}
          style={{
            position: "absolute",
            bottom: "6%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        >
          <motion.div
            initial="hidden"
            animate={getInTouchButtonInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <CallToActionButton
              title={t("main_page.get_in_touch_button")}
              scrollRef={GetInTouchRef}
            />
          </motion.div>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: PALLETTE.offWhite,
          position: "relative",
        }}
      >
        <Box
          ref={GetInTouchRef}
          style={{
            borderTop: "1px solid " + PALLETTE.cerise,
            borderBottom: "1px solid " + PALLETTE.cerise,
          }}
          my={4}
        >
          <ContactDetails />
        </Box>
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          columns={12}
          sx={{ height: "fit-content" }}
        >
          <Grid xs={12} md={6}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInFromLeft}
            >
              <Box
                sx={{
                  margin: "16px 32px",
                }}
              >
                <Title fontSize={32}>
                  {t("main_page.page_description.what_title")}
                </Title>
                <StyledText
                  level="body-md"
                  fontSize={20}
                  color={PALLETTE.charcoal}
                >
                  {t("main_page.page_description.what")}
                </StyledText>
              </Box>
            </motion.div>
          </Grid>
          <Grid xs={12} md={6}>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInFromRight}
            >
              <Box
                sx={{
                  margin: "16px 32px",
                }}
              >
                <Title fontSize={32} color={PALLETTE.cerise}>
                  {t("main_page.page_description.in_beta_title")}
                </Title>
                <StyledText
                  level="body-md"
                  fontSize={20}
                  color={PALLETTE.charcoal}
                >
                  {t("main_page.page_description.in_beta")}
                </StyledText>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        <CommonlyAskedQuestions />
      </Box>
      <Footer />
    </div>
  );
};

export default MainPage;
