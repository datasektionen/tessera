import { Box, Divider, Link, Stack } from "@mui/joy";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import FoodPreferences from "../../../components/food_preferences";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { getGuestCustomerRequest } from "../../../redux/features/guestCustomerSlice";
import { useSelector } from "react-redux";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import LoadingOverlay from "../../../components/Loading";
import EditFormFieldResponse from "../../../components/events/form_field_response/edit";
import { Trans } from "react-i18next";
import Payment from "../../../components/tickets/payment";
import { cancelTicketRequestRequest } from "../../../redux/features/myTicketRequestsSlice";
import StyledButton from "../../../components/buttons/styled_button";
import { cancelMyTicketStart } from "../../../redux/features/myTicketsSlice";

const GuestTicketRequestPage: React.FC = () => {
  const { refID, ugkthid } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { guestCustomer, loading } = useSelector(
    (state: RootState) => state.guestCustomer
  );

  const { deleteSucess: ticketRequestDeleteSuccess } = useSelector(
    (state: RootState) => state.myTicketRequests
  );

  const { deleteSucess: ticketDeleteSuccess } = useSelector(
    (state: RootState) => state.myTickets
  );

  useEffect(() => {
    if (!refID || !ugkthid) {
      toast.error("Missing required parameters");
      return;
    }

    // GET query param request_token
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");

    if (!requestToken) {
      toast.error("Missing required parameters");
      return;
    }

    dispatch(getGuestCustomerRequest({ ugkthid, request_token: requestToken }));
  }, [refID, ugkthid]);

  const cancelTicketRequest = () => {
    dispatch(
      cancelTicketRequestRequest({
        ticket_request: guestCustomer?.ticket_request!,
        isGuestCustomer: true,
        guestCustomer,
      })
    );
  };

  const cancelTicket = () => {
    dispatch(
      cancelMyTicketStart({
        ticket: guestCustomer?.ticket!,
        isGuestCustomer: true,
        guestCustomer: guestCustomer,
      })
    );
  };

  useEffect(() => {
    if (ticketRequestDeleteSuccess) {
      toast.info("Ticket request cancelled!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [navigate, ticketRequestDeleteSuccess]);

  useEffect(() => {
    if (ticketDeleteSuccess) {
      toast.info("Ticket cancelled successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [navigate, ticketDeleteSuccess]);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <TesseraWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <StyledText
          level="h1"
          color={PALLETTE.cerise_dark}
          fontSize={32}
          sx={{
            my: 2,
          }}
        >
          {guestCustomer?.first_name!}'s{" "}
          {!guestCustomer?.ticket_request?.is_handled
            ? "Ticket Request"
            : "Ticket"}
        </StyledText>
        <Box>
          <Stack spacing={2} direction={"row"}>
            {guestCustomer?.ticket_request?.is_handled &&
              guestCustomer.ticket && (
                <Payment
                  ticket={guestCustomer?.ticket!}
                  isGuestCustomer={true}
                  guestCustomer={guestCustomer}
                />
              )}
            {!guestCustomer?.ticket_request?.is_handled && (
              <StyledButton
                size="md"
                onClick={cancelTicketRequest}
                bgColor={PALLETTE.red}
              >
                Cancel Ticket Request
              </StyledButton>
            )}
            {guestCustomer?.ticket_request?.is_handled &&
              guestCustomer.ticket && (
                <StyledButton
                  size="lg"
                  onClick={cancelTicket}
                  bgColor={PALLETTE.red}
                >
                  I no longer want to attend
                </StyledButton>
              )}
          </Stack>
        </Box>
        {guestCustomer?.ticket_request?.is_handled && guestCustomer.ticket && (
          <Divider sx={{ my: 2 }} />
        )}
        <Box
          sx={{
            maxWidth: "800px",
          }}
        >
          <FoodPreferences />
        </Box>
        <Divider sx={{ my: 2 }} />
        {guestCustomer?.ticket_request?.ticket_release?.event?.form_fields
          ?.length! > 0 && (
          <Box
            sx={{
              maxWidth: "800px",
            }}
          >
            <EditFormFieldResponse
              ticketRequest={guestCustomer?.ticket_request!}
              isGuestCustomer={true}
            />
            <StyledText
              color={PALLETTE.charcoal}
              level="body-sm"
              fontSize={18}
              fontWeight={500}
              style={{
                marginTop: "1rem",
              }}
            >
              <Trans i18nKey="event.ticket_request_success_description">
                hjdw
                <Link href="/profile/ticket-requests" target="_blank">
                  here{" "}
                </Link>
              </Trans>
            </StyledText>
          </Box>
        )}
        {guestCustomer?.ticket_request?.ticket_release?.event?.form_fields
          ?.length! > 0 && <Divider sx={{ my: 2 }} />}
      </Box>
    </TesseraWrapper>
  );
};

export default GuestTicketRequestPage;
