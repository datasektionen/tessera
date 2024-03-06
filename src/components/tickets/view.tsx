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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import QRCode from "qrcode.react";

import Payment from "./payment";

import { addHours, format, isBefore } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { Trans, useTranslation } from "react-i18next";
import { cancelMyTicketStart } from "../../redux/features/myTicketsSlice";
import { canPayForTicket, mustPayBefore } from "../../utils/user_payment";

function convertPayWithinToString(
  payWithin: number,
  ticketUpdatedAt: Date
): string {
  const mustPayBeforeDate = mustPayBefore(payWithin, ticketUpdatedAt);
  return (
    format(mustPayBeforeDate, "yyyy-MM-dd HH:mm:ss") +
    " CET (or CEST in summer)"
  );
}

interface ViewTicketProps {
  ticket: ITicket;
}

const ViewTicket: React.FC<ViewTicketProps> = ({ ticket }) => {
  const dispatch: AppDispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState<boolean>(false);
  const [payBefore, setPayBefore] = useState<string>("the start of the event");
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const ticketRequest = ticket.ticket_request!;

  useEffect(() => {
    let updatedAt = new Date(ticket.updated_at);
    if (ticketRequest.ticket_release?.pay_within) {
      setPayBefore(
        convertPayWithinToString(
          ticketRequest.ticket_release.pay_within,
          updatedAt
        )
      );
    } else {
      setPayBefore("the start of the event");
    }
  }, [ticket]);

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

  const { t } = useTranslation();

  if (!ticket) {
    return <></>;
  }

  return (
    <BorderBox
      style={{
        marginTop: "16px",
        width: isScreenSmall ? "90%" : screenWidth,
        position: "relative",
      }}
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
          {ticket.is_reserve ? (
            t("tickets.reserve_ticket")
          ) : !ticket.is_paid ? (
            <Trans i18nKey="tickets.confirmed_ticket" values={{ payBefore }}>
              "Your ticket has been confirmed! Its now time to pay for your
              ticket. You can pay for your ticket by clicking the button below.
              If you do not pay for your ticket before
              <strong>{payBefore}</strong>, your ticket will be given to the
              next person in line.",
            </Trans>
          ) : (
            t("tickets.paid_ticket")
          )}

          {/* t("tickets.confirmed_ticket") */}
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

      {ticket.is_paid && (
        <Box>
          <Box
            sx={{
              backgroundColor: PALLETTE.cerise,
              padding: "16px",
              borderRadius: "8px",
              width: "fit-content",
              margin: "16px auto",
            }}
            style={
              {
                // add blur effect
              }
            }
          >
            {ticket.checked_in && (
              <StyledText
                level="body-sm"
                fontSize={24}
                color={PALLETTE.green}
                fontWeight={700}
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  width: "200px",
                  textShadow: "0 0 8px black",
                }}
              >
                {t("tickets.qr_code.already_checked_in")}
              </StyledText>
            )}

            <QRCode
              value={ticket.qr_code}
              size={256}
              style={{
                filter: ticket.checked_in ? "blur(8px)" : "none",
              }}
            />
          </Box>
          <StyledText
            level="body-sm"
            fontSize={18}
            color={PALLETTE.charcoal}
            style={{ marginTop: "8px" }}
          >
            {t("tickets.qr_code.description")}
          </StyledText>
        </Box>
      )}

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
          {!ticket.is_paid && canPayForTicket(ticket) ? (
            <Payment ticket={ticket} />
          ) : !canPayForTicket(ticket) ? null : (
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
          title={
            ticket.is_reserve
              ? t("tickets.confirm_cancel_ticket_request_title")
              : t("tickets.confirm_cancel_ticket_title")
          }
          actions={[
            <StyledButton
              bgColor={PALLETTE.offWhite}
              key="confirm"
              size="md"
              onClick={() => {
                handleCancelTicket();
                setConfirmCancelOpen(false);
              }}
              style={{
                marginTop: "16px",
              }}
            >
              {ticket.is_reserve
                ? t("tickets.leave_reserve_list_text")
                : t("tickets.cancel_ticket_button")}
            </StyledButton>,
            <StyledButton
              key="cancel"
              bgColor={PALLETTE.green}
              size="md"
              onClick={() => setConfirmCancelOpen(false)}
              style={{
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
          onClick={() => {
            if (canPayForTicket(ticket)) {
              setConfirmCancelOpen(true);
            }
          }}
          style={{
            width: "250px",
            marginTop: "16px",
          }}
        >
          {ticket.is_reserve
            ? t("tickets.leave_reserve_list_text")
            : canPayForTicket(ticket)
            ? t("tickets.cancel_ticket_button")
            : "Nothing to see here!"}
        </StyledButton>
      </Box>
    </BorderBox>
  );
};

export default ViewTicket;
