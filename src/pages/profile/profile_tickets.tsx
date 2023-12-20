import React, { useEffect } from "react";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Box, Grid, Link, Typography } from "@mui/joy";
import Title from "../../components/text/title";
import FoodPreferences from "../../components/food_preferences";
import UserInfo from "../../components/user/user_info";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { ROUTES } from "../../routes/def";
import ViewTicketRequest from "../../components/ticket_requests/view";
import ViewTicket from "../../components/tickets/view";
import { getMyTicketsRequest } from "../../redux/features/myTicketsSlice";
import TicketsList from "../../components/tickets/list_tickets";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileTicketsPage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { tickets, loading: ticketLoading } = useSelector(
    (state: RootState) => state.myTickets
  );

  const dispatch: AppDispatch = useDispatch();

  console.log(tickets);

  useEffect(() => {
    if (!isInitialized && !ticketLoading) {
      console.log("dispatching");
      dispatch(getMyTicketsRequest());
      setIsInitialized(true);
    }
  }, []);

  const location = useLocation();

  // Handle redirect from Stripe and show toast
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("redirect_status");

    if (status === "succeeded") {
      // Handle successful payment
      toast.success("Your ticket purchase was successful!");
    } else {
      // Handle failed payment
      toast.error("Your ticket purchase was not successful.");
    }

    // Remove redirect_status from URL
    queryParams.delete("redirect_status");
  }, [location]);

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
          <Title>Your Tickets</Title>
          <Box>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
              Here you can see all the tickets you have gotten. You can give up
              your ticket by clicking on the ticket and then choose the option
              "I no longer wish to attend", which will give your ticket to the
              next person in line. If you have not yet been allocated a ticket
              or reserve ticket, you can see your ticket requests{" "}
              <Link href={ROUTES.PROFILE_TICKET_REQUESTS}>here</Link>.
            </StyledText>
          </Box>
          <Grid xs={8}>
            <TicketsList
              tickets={tickets}
              selected={selected}
              setSelected={setSelected}
            />
          </Grid>
        </Grid>
        <Grid xs={8}>
          {selected && (
            <ViewTicket ticket={tickets.find((tr) => tr.id === selected)!} />
          )}
        </Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default ProfileTicketsPage;
