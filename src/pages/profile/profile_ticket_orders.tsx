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
import { getMyTicketOrdersRequest } from "../../redux/features/myTicketOrderSlice";
import { ITicketOrder } from "../../types";
import TicketOrdersList from "../../components/ticket_orders/list_ticket_orders";
import ViewTicketRequest from "../../components/ticket_orders/view";
import { Trans, useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ViewTicketOrder from "../../components/ticket_orders/view";

const ProfileTicketOrdersPage: React.FC = () => {
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { ticketOrders } = useSelector(
    (state: RootState) => state.myTicketOrders
  ) as { ticketOrders: ITicketOrder[] };
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = React.useState<number | null>(null);
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

  const ViewTicketOrderRef = useRef<HTMLDivElement>(null);

  const setSelectedTicketOrder = (index: number | null) => {
    setSelected(index);
    if (ViewTicketOrderRef.current) {
      ViewTicketOrderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Get query params
    const searchParams = new URLSearchParams(window.location.search);

    const ticketOrderId = searchParams.get("ticket_order_id");
    const created = searchParams.get("created");

    if (ticketOrderId && created) {
      setSelectedTicketOrder(parseInt(ticketOrderId));
      toast.info(
        "This is your tickets orders page, you can see all your ticket orders here."
      );
      navigate(ROUTES.PROFILE_TICKET_ORDERS, { replace: true });
    }
  }, []);

  useEffect(() => {
    dispatch(getMyTicketOrdersRequest([]));
  }, []);

  return (
    <TesseraWrapper defaultColors>
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
            <TicketOrdersList
              ticketOrders={ticketOrders}
              selected={selected}
              setSelected={setSelectedTicketOrder}
            />
          </Grid>
        </Grid>
        <Grid xs={16} md={8} ref={ViewTicketOrderRef}>
          {selected && (
            <ViewTicketOrder
              ticketOrder={ticketOrders.find((to) => to.id === selected)!}
            />
          )}
        </Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default ProfileTicketOrdersPage;
