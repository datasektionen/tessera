import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import { Box, Grid, Typography, styled } from "@mui/joy";
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

  if (loading || error) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Box
        className={styles.divider}
        sx={{
          top: 0,
          left: 0,
          width: "100%", // Full width
          height: "100vh", // Full height
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
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
            top: "20%",
            left: "20%",
          }}
        >
          <StyledText color={PALLETTE.offWhite} level="body-md" fontSize={24}>
            {
              t("main_page.welcome", {
                name: getUserFullName(currentUser!),
              }) as string
            }
          </StyledText>
          <Title fontSize={128}>Tessera</Title>
          <StyledText
            color={PALLETTE.offWhite}
            level="body-md"
            fontSize={32}
            style={{
              marginTop: "-32px",
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
        sx={{ width: "100%", height: "100vh" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          columns={12}
          sx={{ height: "fit-content" }}
        >
          <Grid xs={12} md={6}>
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
          </Grid>
          <Grid xs={12} md={6}>
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
          </Grid>
        </Grid>

        <Box
          sx={{
            margin: "32px 32px",
          }}
        >
          <CommonlyAskedQuestions />
        </Box>

        <Box sx={{ margin: "16px 32px" }}>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Tessera is currently in <b>beta</b>. If you have any feedback,
            please contact me at{" "}
            <a href="mailto:lucdow7@gmail.com">lucdow7@gmail.com</a>.
          </StyledText>
        </Box>
        <Grid container spacing={2} sx={{ margin: "16px 32px" }}>
          <Grid>
            <MainPageButton
              onClick={() => {
                navigate("/events");
              }}
            >
              Events
            </MainPageButton>
          </Grid>
          <Grid>
            <MainPageButton
              onClick={() => {
                navigate("/create-event");
              }}
            >
              Create Event
            </MainPageButton>
          </Grid>
          <Grid>
            <MainPageButton
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </MainPageButton>
          </Grid>
          <Grid>
            <MainPageButton
              onClick={() => {
                navigate("/profile/organizations");
              }}
            >
              Your Teams
            </MainPageButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainPage;
