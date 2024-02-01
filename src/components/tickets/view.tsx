import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import PALLETTE from "../../theme/pallette";
import { ITicket } from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useState } from "react";
import { Box, Divider, Grid } from "@mui/joy";

import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StyledButton from "../buttons/styled_button";
import ConfirmModal from "../modal/confirm_modal";

import Payment from "./payment";

import { Trans, useTranslation } from "react-i18next";
import { cancelMyTicketStart } from "../../redux/features/myTicketsSlice";

interface ViewTicketProps {
  ticket: ITicket;
}

const ViewTicket: React.FC<ViewTicketProps> = ({ ticket }) => {
  const stripeOptions = {
    clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY!,
  };

  const dispatch: AppDispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState<boolean>(false);

  useEffect(() => {
    // This function now updates the screenWidth state immediately.
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth / 2.3;
      setScreenWidth(newWidth);
    };

    // Call it immediately and also set it up as a resize event listener.
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);

    // Return a cleanup function to remove the event listener when the component unmounts.
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const handleCancelTicket = () => {
    dispatch(cancelMyTicketStart(ticket));
  };

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const { t } = useTranslation();

  if (!ticket) {
    return <></>;
  }

  const ticketRequest = ticket.ticket_request!;

  return (
    <BorderBox
      style={{ marginTop: "16px", width: screenWidth, position: "fixed" }}
    >
      <Title fontSize={32}>{ticketRequest.ticket_type?.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.made_at")}{" "}
        {new Date(ticketRequest.created_at).toLocaleString()}
      </StyledText>
      <Box>
        <StyledText
          level="body-sm"
          fontSize={18}
          color={PALLETTE.charcoal}
          style={{ marginTop: "16px" }}
        >
          {ticket.is_reserve
            ? t("tickets.reserve_ticket")
            : !ticket.is_paid
            ? t("tickets.confirmed_ticket")
            : t("tickets.paid_ticket")}
        </StyledText>
        {ticket.is_reserve && (
          <StyledText
            level="body-sm"
            fontSize={20}
            fontWeight={600}
            color={PALLETTE.cerise}
            style={{ marginTop: "16px" }}
          >
            <Trans
              i18nKey="tickets.reserve_number"
              values={{
                number: ticket.reserve_number,
              }}
            >
              You are number <strong>{ticket.reserve_number}</strong> on the
              reserve list.
            </Trans>
          </StyledText>
        )}
      </Box>

      <Box mt={2}>
        <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal}>
          {t("tickets.cost_overview")}
        </StyledText>
        <>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container justifyContent={"flex-start"} flexDirection={"row"}>
              <LocalActivityIcon />
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontSize={18}
                style={{
                  marginLeft: "8px",
                }}
              >
                {ticketRequest.ticket_amount} x{" "}
                {ticketRequest.ticket_type?.name}
              </StyledText>
            </Grid>
            <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={18}>
              SEK{" "}
              {(
                ticketRequest.ticket_type?.price! * ticketRequest.ticket_amount
              ).toFixed(2)}
            </StyledText>
          </Grid>
          <Divider />
        </>
      </Box>
      {!ticket.is_reserve && (
        <Box mt={2}>
          {!ticket.is_paid ? (
            <Payment ticket={ticket} />
          ) : (
            <StyledText
              level="body-sm"
              fontSize={18}
              color={PALLETTE.cerise}
              style={{ marginTop: "16px" }}
              fontWeight={700}
            >
              {t("tickets.has_paid")}
            </StyledText>
          )}
        </Box>
      )}
      <Box>
        <ConfirmModal
          isOpen={confirmCancelOpen}
          onClose={() => setConfirmCancelOpen(false)}
          title={t("tickets.confirm_cancel_ticket_request_title")}
          actions={[
            <StyledButton
              bgColor={PALLETTE.offWhite}
              size="md"
              onClick={() => {
                handleCancelTicket();
              }}
              style={{
                width: "300px",
                marginTop: "16px",
              }}
            >
              {ticket.is_reserve
                ? t("tickets.leave_reserve_list_text")
                : t("tickets.cancel_ticket_button")}
            </StyledButton>,
            <StyledButton
              bgColor={PALLETTE.green}
              size="md"
              onClick={() => setConfirmCancelOpen(false)}
              style={{
                width: "200px",
                marginTop: "16px",
              }}
            >
              {t("form.button_back")}
            </StyledButton>,
          ]}
        >
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            {ticket.is_reserve
              ? t("tickets.confirm_cancel_reserve_ticket_text")
              : t("tickets.confirm_cancel_ticket_text")}
          </StyledText>
        </ConfirmModal>

        <StyledButton
          bgColor={PALLETTE.offWhite}
          size="md"
          onClick={() => setConfirmCancelOpen(true)}
          style={{
            width: "250px",
            marginTop: "16px",
          }}
        >
          {ticket.is_reserve
            ? t("tickets.leave_reserve_list_text")
            : t("tickets.cancel_ticket_button")}
        </StyledButton>
      </Box>
    </BorderBox>
  );
};

export default ViewTicket;
