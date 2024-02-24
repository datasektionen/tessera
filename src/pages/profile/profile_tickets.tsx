import React, { useEffect, useRef } from "react";
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
import { Trans, useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  clearPaymentSuccess,
  setPaymentSuccess,
} from "../../redux/features/paymentSlice";

const ProfileTicketsPage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const { tickets, loading: ticketLoading } = useSelector(
    (state: RootState) => state.myTickets
  );

  const { success: pSuccess } = useSelector(
    (state: RootState) => state.payment
  );

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  const viewTicketRef = useRef<HTMLDivElement>(null);

  const handleSetSelected = (index: number | null) => {
    setSelected(index);
    if (viewTicketRef.current) {
      viewTicketRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!isInitialized && !ticketLoading) {
      dispatch(getMyTicketsRequest());
      setIsInitialized(true);
    }
  }, []);

  const location = useLocation();
  const { t } = useTranslation();

  // Handle redirect from Stripe and show toast
  useEffect(() => {
    // get redirect_status query param
    const searchParams = new URLSearchParams(location.search);

    const redirect_status = searchParams.get("redirect_status");

    dispatch(setPaymentSuccess(redirect_status === "succeeded"));
  }, [dispatch, location]);

  useEffect(() => {
    if (pSuccess) {
      dispatch(getMyTicketsRequest());
      setTimeout(() => {
        toast.success(
          "The payment was successful! You may need to reload the page to see the updated status."
        );
      }, 500);
      dispatch(clearPaymentSuccess());
    }
  }, [pSuccess]);

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
        <Grid xs={16} md={8}>
          <Title>{t("profile.your_tickets.title")}</Title>
          <Box>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
              <Trans i18nKey="profile.your_tickets.description">
                Here you can see all the tickets you have gotten. You can give
                up your ticket by clicking on the ticket and then choose the
                option "I no longer wish to attend", which will give your ticket
                to the next person in line. If you have not yet been allocated a
                ticket or reserve ticket, you can see your ticket requests
                <Link href={ROUTES.PROFILE_TICKET_REQUESTS}>here</Link>.
              </Trans>
            </StyledText>
          </Box>
          <Grid xs={16} md={8}>
            <TicketsList
              tickets={tickets}
              selected={selected}
              setSelected={handleSetSelected}
            />
          </Grid>
        </Grid>
        <Grid xs={16} md={8} id="ticket-view" ref={viewTicketRef}>
          {selected && (
            <ViewTicket ticket={tickets.find((tr) => tr.id === selected)!} />
          )}
        </Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default ProfileTicketsPage;
