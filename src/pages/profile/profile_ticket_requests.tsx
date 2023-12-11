import React from "react";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Box, Grid, Link, Typography } from "@mui/joy";
import Title from "../../components/text/title";
import FoodPreferences from "../../components/food_preferences";
import UserInfo from "../../components/user/user_info";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import PALLETTE from "../../theme/pallette";
import StyledText from "../../components/text/styled_text";
import { ROUTES } from "../../routes/def";

const ProfileTicketRequestsPage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);

  return (
    <TesseraWrapper>
      {loading && <LoadingOverlay />}
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{ flexGrow: 1 }}
        style={{
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Grid xs={8}>
          <Title>Your Ticket Requests</Title>
          <Box>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
              Here you can see all the ticket requests you have made. You can
              cancel a ticket request by clicking on the ticket request and
              clicking the cancel button. When the event organizer allocates
              tickets you will recieve either a ticket or a reserve status. You
              can see all your tickets and reserve status{" "}
              <Link href={ROUTES.PROFILE_TICKETS}>here</Link>.
            </StyledText>
          </Box>
        </Grid>
        <Grid xs={8}></Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default ProfileTicketRequestsPage;
