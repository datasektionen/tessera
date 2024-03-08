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
import { useNavigate } from "react-router-dom";
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

const MainPage: React.FC = () => {
  const { loading, error, events } = useSelector(
    (state: RootState) => state.events
  );

  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getEventsRequest());
  }, []);

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is in view
  });

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  if (loading || error) {
    return null;
  }

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div
      style={{
        overflow: "hidden",
      }}
    >
      <Navigation />
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
          <Title fontSize={isScreenSmall ? 64 : 128} color={PALLETTE.cerise}>
            Tessera
          </Title>
          <StyledText
            color={PALLETTE.offWhite}
            level="body-md"
            fontSize={isScreenSmall ? 16 : 32}
            style={{
              marginTop: isScreenSmall ? "-16px" : "-32px",
            }}
          >
            {t("main_page.not_a_pain")}
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
          <CallToActionButton />
        </Box>
      </Box>
      <Box
        sx={{ width: "100%" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
          position: "relative",
        }}
      >
        <HowToUse />

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
                  fontSize={18}
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
                <Title fontSize={32}>
                  {t("main_page.page_description.how_title")}
                </Title>
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                >
                  {t("main_page.page_description.how")}
                </StyledText>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        <Box
          style={{
            borderTop: "1px solid " + PALLETTE.cerise,
            borderBottom: "1px solid " + PALLETTE.cerise,
          }}
          my={4}
        >
          <ContactDetails />
        </Box>
        <CommonlyAskedQuestions />
      </Box>
      <Footer />
    </div>
  );
};

export default MainPage;
