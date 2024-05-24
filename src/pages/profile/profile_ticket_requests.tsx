import React, { useEffect, useRef } from "react";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import { Box, Grid, Link, Typography, useTheme } from "@mui/joy";
import Title from "../../components/text/title";
import FoodPreferences from "../../components/food_preferences";
import UserInfo from "../../components/user/user_info";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import PALLETTE from "../../theme/pallette";
import StyledText from "../../components/text/styled_text";
import { ROUTES } from "../../routes/def";
import { getMyTicketRequestsRequest } from "../../redux/features/myTicketRequestsSlice";
import { ITicketRequest } from "../../types";
import TicketRequestsList from "../../components/ticket_requests/list_ticket_requests";
import ViewTicketRequest from "../../components/ticket_requests/view";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileTicketRequestsPage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { ticketRequests } = useSelector(
    (state: RootState) => state.myTicketRequests
  ) as { ticketRequests: ITicketRequest[] };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = React.useState<number | null>(null);
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  const ViewTicketRequestRef = useRef<HTMLDivElement>(null);

  const setSelectedTicketRequest = (index: number | null) => {
    setSelected(index);
    if (ViewTicketRequestRef.current) {
      ViewTicketRequestRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Get query params
    const searchParams = new URLSearchParams(window.location.search);

    // ticket_request_id
    const ticketRequestId = searchParams.get("ticket_request_id");
    const created = searchParams.get("created");

    if (ticketRequestId && created) {
      setSelectedTicketRequest(parseInt(ticketRequestId));
      toast.info(
        "This is your tickets request page, you can see all your ticket requests here."
      );
      navigate(ROUTES.PROFILE_TICKET_REQUESTS, { replace: true });
    }
  }, []);

  useEffect(() => {
    dispatch(getMyTicketRequestsRequest([]));
  }, []);

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
          <Title>{t("profile.your_ticket_requests.title")}</Title>
          <Box>
            <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
              <Trans i18nKey="profile.your_ticket_requests.description">
                Here you can see all the ticket requests you have made. You can
                cancel a ticket request by selecting it and clicking the cancel
                button. When the event organizer allocates tickets you will
                receive either a ticket or a reserve status. You can see all
                your tickets and reserve status
                <Link href={ROUTES.PROFILE_TICKETS}>here</Link>.
              </Trans>
            </StyledText>
          </Box>
          <Grid xs={16} md={8}>
            <TicketRequestsList
              ticketRequests={ticketRequests}
              selected={selected}
              setSelected={setSelectedTicketRequest}
            />
          </Grid>
        </Grid>
        <Grid xs={16} md={8} ref={ViewTicketRequestRef}>
          {selected && (
            <ViewTicketRequest
              ticketRequest={ticketRequests.find((tr) => tr.id === selected)!}
            />
          )}
        </Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default ProfileTicketRequestsPage;
