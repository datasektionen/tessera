import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { IDeadlineUnits, ITicket, ITicketRelease, ITicketReleasePaymentDeadlineForm } from "../../../../types";
import { useEffect, useState } from "react";
import { Box, Grid, Stack, Tooltip } from "@mui/joy";
import { toast } from "react-toastify";
import { format } from "date-fns";
import axios from "axios";
import StyledText from "../../../text/styled_text";
import StyledButton from "../../../buttons/styled_button";
import ConfirmTicketAllocationModal from "./confirm_ticket_allocation_modal";
import PaymentDeadlineForm from "./payment_deadline_form";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { canEditPaymentDeadline, canMassAllocateTickets, hasReserveTickets } from "../../../../utils/manage_event/can_edit_payment_deadline";
import { paymentDurationToString, toGoDuration } from "../../../../utils/date_conversions";
import handleDeleteTicketRelease from "../../../../redux/sagas/axios_calls/handle_delete_ticket_release";
import { fetchEventTicketsStart } from "../../../../redux/features/eventTicketsSlice";
import { getEventRequest } from "../../../../redux/features/eventSlice";
import PALLETTE from "../../../../theme/pallette";

interface TicketReleaseRowViewProps {
  ticketRelease: ITicketRelease;
  ticketReleaseTickets?: ITicket[];
}

const TicketReleaseRowView: React.FC<TicketReleaseRowViewProps> = ({ ticketRelease, ticketReleaseTickets }) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const isCurrentlyOpen = () => {
    const now = new Date();
    return new Date(ticketRelease.open) < now && new Date(ticketRelease.close) > now;
  };

  const hasntOpenedYet = () => {
    const now = new Date();
    return new Date(ticketRelease.open) > now;
  };

  const tryToAllocateReserveTickets = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/events/${ticketRelease.eventId}/ticket-release/${ticketRelease.id}/manually-allocate-reserve-tickets`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      toast.success("Reserve tickets allocated successfully");
      dispatch(fetchEventTicketsStart(ticketRelease.eventId!));
    } else {
      const errorMessage = response.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const updatePaymentDeadline = async (values: ITicketReleasePaymentDeadlineForm) => {
    const data = {
      original_deadline: new Date(values.payment_deadline).toISOString(),
      reserve_payment_duration: toGoDuration(reservePaymentDuration.days, reservePaymentDuration.hours, reservePaymentDuration.minutes, reservePaymentDuration.seconds),
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/events/${ticketRelease.eventId}/ticket-release/${ticketRelease.id}/payment-deadline`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Payment deadline updated successfully");
        dispatch(getEventRequest({ id: ticketRelease.eventId!, secretToken: "" }));
      } else {
        const errorMessage = response.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const [reservePaymentDuration, setReservePaymentDuration] = useState<IDeadlineUnits>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [deadlineInitialValues, setDeadlineInitialValues] = useState<ITicketReleasePaymentDeadlineForm>({ payment_deadline: new Date().toISOString(), reserve_payment_duration: "" });

  useEffect(() => {
    setDeadlineInitialValues({
      payment_deadline: ticketRelease.payment_deadline?.original_deadline.toISOString().substring(0, 16) || "",
      reserve_payment_duration: ticketRelease.payment_deadline?.reserve_payment_duration ? paymentDurationToString(ticketRelease.payment_deadline.reserve_payment_duration) : "",
    });
  }, [ticketRelease]);

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  if (!ticketReleaseTickets) {
    return null;
  }

  const numTicketRequests = ticketReleaseTickets.length;
  const numAllocatedTickets = ticketReleaseTickets.filter(ticket => ticket.id !== 0 && ticket?.ticket_request?.is_handled!).length;
  const numDeletedTicketRequests = ticketReleaseTickets.filter(ticket => !!ticket.ticket_request?.deleted_at).length;
  const numPaidTickets = ticketReleaseTickets.filter(ticket => ticket?.is_paid! && !!!ticket?.deleted_at).length;
  const numRefundedTickets = ticketReleaseTickets.filter(ticket => ticket?.refunded! && !!!ticket?.deleted_at).length;
  const numReserveTickets = ticketReleaseTickets.filter(ticket => ticket?.is_reserve! && !!!ticket?.deleted_at).length;
  const numDeletedTickets = ticketReleaseTickets.filter(ticket => !!ticket.deleted_at).length;

  return (
    <Box>
      <Grid container spacing={4} sx={{ p: 0 }}>
        {/* Ticket Release Information */}
        <Grid xs={12} md={4}>
          <Box>
            <StyledText level="body-md" fontSize={24} fontWeight={700} color={PALLETTE.cerise_dark}>
              {ticketRelease.name}
            </StyledText>
            <StyledText color={PALLETTE.charcoal_see_through} level="body-md" fontSize={15}>
              {t("common.created")} {format(new Date(ticketRelease.created_at), "dd/MM/yyyy HH:mm:ss")}
            </StyledText>
            <StyledText color={PALLETTE.charcoal_see_through} level="body-md" fontSize={15}>
              {t("common.updated")} {format(new Date(ticketRelease.updated_at!), "dd/MM/yyyy HH:mm:ss")}
            </StyledText>
          </Box>
          <Box mt={1}>
            <StyledText level="body-md" fontSize={18} fontWeight={700} color={PALLETTE.charcoal}>
              {t("manage_event.ticket_release_method_title")}
            </StyledText>
            <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal} fontWeight={500}>
              {ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod?.name}
            </StyledText>
          </Box>
          <Box mt={1}>
            <StyledText level="body-md" fontSize={18} fontWeight={700} color={PALLETTE.charcoal}>
              {t("manage_event.ticket_release_time_title")}
            </StyledText>
            <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
              {format(new Date(ticketRelease.open), "dd/MM/yyyy HH:mm:ss")} - {format(new Date(ticketRelease.close), "dd/MM/yyyy HH:mm:ss")}
            </StyledText>
            <StyledText level="body-sm" fontSize={18} fontWeight={500} color={isCurrentlyOpen() ? PALLETTE.dark_green : PALLETTE.red}>
              {hasntOpenedYet()
                ? t("manage_event.not_yet_open")
                : t("manage_event.the_ticket_release") +
                " " +
                (isCurrentlyOpen() ? t("manage_event.open") : t("manage_event.closed"))}
            </StyledText>
          </Box>
        </Grid>

        {/* Ticket Info */}



        {/* Ticket Release Time and Actions */}
        <Grid xs={12} md={4}>
          <Box mt={2}>
            <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal_see_through} fontWeight={700}>
              {t("manage_event.ticket_release_actions_title")}
            </StyledText>
            <Stack spacing={2} direction="column" mt={2}>
              {!hasntOpenedYet() &&
                canMassAllocateTickets(ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod) && (
                  <StyledButton
                    size="md"
                    bgColor={isCurrentlyOpen() ? PALLETTE.red : PALLETTE.green}
                    disabled={ticketRelease.has_allocated_tickets}
                    onClick={() => {
                      setConfirmOpen(true);
                    }}
                  >
                    {t("manage_event.allocate_tickets_button")}
                  </StyledButton>
                )}
              {hasReserveTickets(ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod) && (
                <StyledButton size="md" bgColor={PALLETTE.offWhite} startDecorator={<Tooltip title={t("manage_event.check_allocated_reserve_tickets_tooltip")}><HelpOutlineIcon /></Tooltip>} onClick={tryToAllocateReserveTickets}>
                  {t("manage_event.check_allocated_reserve_tickets")}
                </StyledButton>
              )}
            </Stack>
            <ConfirmTicketAllocationModal ticketRelease={ticketRelease} open={confirmOpen} onClose={() => setConfirmOpen(false)} isCurrentlyOpen={isCurrentlyOpen} />
          </Box>
        </Grid>


        <Grid xs={12}>
          <StyledText level="body-md" fontSize={22} fontWeight={700} color={PALLETTE.charcoal}>
            {t("manage_event.ticket_release_ticket_info_title")}
          </StyledText>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Box>
                <Stack spacing={1}>
                  <StyledText level="body-sm" fontSize={18} fontWeight={700} color={PALLETTE.charcoal}>
                    {`${ticketRelease.tickets_available} ` + t("manage_event.tickets_available")}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={600} color={PALLETTE.charcoal}>
                    {`${numTicketRequests} ` + t("manage_event.ticket_requests")}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={600} color={PALLETTE.charcoal} startDecorator={<DeleteIcon />}>
                    {`${numDeletedTicketRequests} ` + t("manage_event.deleted_ticket_requests")}
                  </StyledText>
                </Stack>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box>
                <Stack spacing={1}>
                  <StyledText level="body-sm" fontSize={20} fontWeight={600} color={PALLETTE.dark_green}>
                    {`${numAllocatedTickets} ${t("manage_event.allocated_tickets")}`}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={500} color={PALLETTE.charcoal} startDecorator={<CheckIcon />}>
                    {`${numPaidTickets} ${t("manage_event.paid_tickets")}`}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={500} color={PALLETTE.charcoal} startDecorator={<HourglassTopIcon />}>
                    {`${numAllocatedTickets - numPaidTickets - numDeletedTickets} ${t("manage_event.not_yet_paid_tickets")}`}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={500} color={PALLETTE.charcoal} startDecorator={<KeyboardReturnIcon />}>
                    {`${numRefundedTickets} ${t("manage_event.refunded_tickets")}`}
                  </StyledText>
                  <StyledText level="body-sm" fontSize={18} fontWeight={500} color={PALLETTE.charcoal} startDecorator={<DeleteIcon />}>
                    {`${numDeletedTickets} ${t("manage_event.deleted_tickets")}`}
                  </StyledText>
                </Stack>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box>
                <StyledText level="body-sm" fontSize={20} fontWeight={600} color={PALLETTE.orange}>
                  {`${numReserveTickets} ${t("manage_event.reserve_tickets")}`}
                </StyledText>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Edit Payment Deadline */}
        {canEditPaymentDeadline(ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod) && (
          <Grid xs={12}>
            <Box mt={2}>
              <StyledText level="body-md" fontSize={22} fontWeight={700} color={PALLETTE.cerise_dark}>
                {t("manage_event.edit_payment_deadline")}
              </StyledText>
              <StyledText level="body-md" fontSize={18} fontWeight={500} color={PALLETTE.charcoal}>
                {t("manage_event.payment_deadline_description")}
              </StyledText>
              <PaymentDeadlineForm
                initialValues={deadlineInitialValues}
                onSubmit={updatePaymentDeadline}
                ticketRelease={ticketRelease}
                reservePaymentDuration={reservePaymentDuration}
                setReservePaymentDuration={setReservePaymentDuration}
                enableReinitialize={true}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TicketReleaseRowView;
