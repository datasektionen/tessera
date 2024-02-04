import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import PALLETTE from "../../theme/pallette";
import { ITicketRequest } from "../../types";
import StyledText from "../text/styled_text";
import Title from "../text/title";
import BorderBox from "../wrappers/border_box";
import { useEffect, useState } from "react";

import { Box, Divider, Grid, useTheme } from "@mui/joy";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import StyledButton from "../buttons/styled_button";
import ConfirmModal from "../modal/confirm_modal";
import { cancelTicketRequestRequest } from "../../redux/features/myTicketRequestsSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/def";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

interface ViewTicketRequestProps {
  ticketRequest: ITicketRequest;
}

const ViewTicketRequest: React.FC<ViewTicketRequestProps> = ({
  ticketRequest,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  const handleCancel = () => {
    dispatch(cancelTicketRequestRequest(ticketRequest));
    setConfirmCancelOpen(false);
  };
  const { t } = useTranslation();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  if (!ticketRequest) {
    return <></>;
  }

  return (
    <BorderBox
      style={{
        marginTop: "16px",
        width: isScreenSmall ? "90%" : screenWidth,
        position: isScreenSmall ? "relative" : "fixed",
      }}
    >
      <Title fontSize={32}>{ticketRequest.ticket_type?.name}</Title>
      <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
        {t("common.made_at")}{" "}
        {new Date(ticketRequest.created_at).toLocaleString()}
      </StyledText>

      <Box mt={2}>
        <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal}>
          {t("ticket_request.cost_overview")}
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
      <Box>
        <ConfirmModal
          isOpen={confirmCancelOpen}
          onClose={() => setConfirmCancelOpen(false)}
          title={t("ticket_request.cancel_ticket_request_confirm_title")}
          actions={[
            <StyledButton
              key="confirm"
              bgColor={PALLETTE.offWhite}
              size="md"
              onClick={handleCancel}
              style={{
                marginTop: "16px",
              }}
            >
              {t("form.button_confirm")}
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
              {t("form.button_cancel")}
            </StyledButton>,
          ]}
        >
          <StyledText level="body-sm" fontSize={18} color={PALLETTE.charcoal}>
            {t("ticket_request.cancel_ticket_request_confirm")}
          </StyledText>
        </ConfirmModal>

        {!ticketRequest.is_handled ? (
          <StyledButton
            bgColor={PALLETTE.red}
            size="md"
            onClick={() => setConfirmCancelOpen(true)}
            style={{
              marginTop: "16px",
            }}
          >
            {t("ticket_request.cancel_ticket_request_button")}
          </StyledButton>
        ) : (
          <StyledButton
            bgColor={PALLETTE.green}
            size="md"
            onClick={() => {
              navigate(ROUTES.PROFILE_TICKETS);
            }}
            style={{
              marginTop: "16px",
            }}
          >
            {t("ticket_request.go_to_tickets_button")}
          </StyledButton>
        )}
      </Box>
    </BorderBox>
  );
};

export default ViewTicketRequest;
