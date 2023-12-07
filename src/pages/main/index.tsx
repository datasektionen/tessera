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

const MainPage: React.FC = () => {
  const { loading, error, events } = useSelector(
    (state: RootState) => state.events
  );
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
        sx={{ width: "100vw", height: "100vh" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
        }}
      >
        <Box sx={{ padding: "16px 32px" }}>
          <Title fontSize={32}>Welcome, {getUserFullName(currentUser!)}!</Title>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Tessera is a platform that makes ticket releases easy. Purchasing
            tickets should not be a pain. Tessera makes it easy to create ticket
            releases and manage them. Event organizers can easily view your food
            preferences, allergies, and more in order to make your experience as
            enjoyable as possible, with no hassle. Your account is automatically
            tied to your tickets, so no need to fill in google forms or anything
            like that.
          </StyledText>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Tessera is currently in <b>beta</b>. If you have any feedback,
            please contact me at{" "}
            <a href="mailto:lucdow7@gmail.com">lucdow7@gmail.com</a>.
          </StyledText>
        </Box>
        <Grid container spacing={2} sx={{ padding: "16px 32px" }}>
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
                navigate("/profil");
              }}
            >
              Profile
            </MainPageButton>
          </Grid>
        </Grid>

      </Box>
    </>
  );
};

export default MainPage;
