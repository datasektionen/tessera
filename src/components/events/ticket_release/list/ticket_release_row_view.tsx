import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITicket, ITicketRelease } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  Input,
  Link,
  Sheet,
  Stack,
  Tooltip,
} from "@mui/joy";
import LoadingOverlay from "../../../Loading";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";
import StyledButton from "../../../buttons/styled_button";
import ConfirmModal from "../../../modal/confirm_modal";
import axios from "axios";
import { toast } from "react-toastify";
import { getEventRequest } from "../../../../redux/features/eventSlice";
import { fetchEventTicketsStart } from "../../../../redux/features/eventTicketsSlice";
import {
  StyledFormLabel,
  StyledFormLabelWithHelperText,
} from "../../../forms/form_labels";
import { DefaultInputStyle, FormInput } from "../../../forms/input_types";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface TicketReleaseRowViewProps {
  ticketRelease: ITicketRelease;
  ticketReleaseTickets?: ITicket[];
}

const TicketReleaseRowView: React.FC<TicketReleaseRowViewProps> = ({
  ticketRelease,
  ticketReleaseTickets,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const [allocationLoading, setAllocationLoading] = useState<boolean>(false);
  const [payWithinHours, setPayWithinHours] = useState<number>(0);

  const isCurrentlyOpen = () => {
    const now = new Date();
    return (
      new Date(ticketRelease.open) < now && new Date(ticketRelease.close) > now
    );
  };

  const hasntOpenedYet = () => {
    const now = new Date();
    return new Date(ticketRelease.open) > now;
  };

  const handleAllocateTickets = async () => {
    // Validate payWithinHours
    if (payWithinHours < 1) {
      toast.error("Hours must be greater than 0");
      return;
    }

    setAllocationLoading(true);
    try {
      const response = await axios.post(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/events/${ticketRelease.eventId!}/ticket-release/${
          ticketRelease.id
        }/allocate-tickets`,
        {
          pay_within: payWithinHours,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Tickets allocated successfully");
        dispatch(getEventRequest(ticketRelease.eventId!));
        dispatch(fetchEventTicketsStart(ticketRelease.eventId!));
      } else {
        const errorMessage = response.data?.message || "Something went wrong";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log(error);
      toast.error(errorMessage);
    }
    setAllocationLoading(false);
    setConfirmOpen(false);
  };

  const tryToAllocateReserveTickets = async () => {
    const response = await axios.post(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/events/${ticketRelease.eventId!}/ticket-release/${
        ticketRelease.id
      }/manually-allocate-reserve-tickets`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Reserve tickets allocated successfully");
      }, 1000);
      // dispatch(getEventRequest(ticketRelease.eventId!));
      dispatch(fetchEventTicketsStart(ticketRelease.eventId!));
    } else {
      const errorMessage = response.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  if (!ticketReleaseTickets) {
    return null;
  }

  console.log(ticketReleaseTickets, "ticketReleaseTickets");

  const numTicketRequests = ticketReleaseTickets.length;

  const numAllocatedTickets = ticketReleaseTickets.filter(
    (ticket) => ticket.id !== 0
  ).length;

  const numPaidTickets = ticketReleaseTickets.filter(
    (ticket) => ticket?.is_paid!
  ).length;

  const numRefundedTickets = ticketReleaseTickets.filter(
    (ticket) => ticket?.refunded!
  ).length;

  const numReserveTickets = ticketReleaseTickets.filter(
    (ticket) => ticket?.is_reserve!
  ).length;

  return (
    <Sheet
      sx={{
        width: "100%",
        height: "500px",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 1,
          paddingRight: 1,
          width: "100%",
        }}
      >
        <Grid xs={8}>
          <StyledText
            level="body-md"
            fontSize={18}
            fontWeight={700}
            color={PALLETTE.charcoal_see_through}
          >
            {t("manage_event.ticket_release_method_title")}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={16}
            color={PALLETTE.charcoal}
            fontWeight={500}
          >
            {ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod?.name}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={700}
            sx={{ mt: 2 }}
            color={PALLETTE.charcoal}
          >
            {t("manage_event.ticket_release_ticket_info_title")}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={600}
            color={PALLETTE.charcoal}
          >
            {`${numTicketRequests} ` + t("manage_event.ticket_requests")}
          </StyledText>
          <Box mt={1}>
            <StyledText
              level="body-sm"
              fontSize={20}
              fontWeight={600}
              color={PALLETTE.green}
            >
              {`${numAllocatedTickets} ${t("manage_event.allocated_tickets")}`}
            </StyledText>
            <StyledText
              level="body-sm"
              fontSize={18}
              fontWeight={500}
              color={PALLETTE.charcoal}
              sx={{ ml: 2 }}
              startDecorator={<CheckIcon />}
            >
              {`${numPaidTickets} ${t("manage_event.paid_tickets")}`}
            </StyledText>
            <StyledText
              level="body-sm"
              fontSize={18}
              fontWeight={500}
              color={PALLETTE.charcoal}
              sx={{ ml: 2 }}
              startDecorator={<HourglassTopIcon />}
            >
              {`${numAllocatedTickets - numPaidTickets} ${t(
                "manage_event.not_yet_paid_tickets"
              )}`}
            </StyledText>
            <StyledText
              level="body-sm"
              fontSize={18}
              fontWeight={500}
              color={PALLETTE.charcoal}
              sx={{ ml: 2 }}
              startDecorator={<KeyboardReturnIcon />}
            >
              {`${numRefundedTickets} ${t("manage_event.refunded_tickets")}`}
            </StyledText>
          </Box>
          <Box mt={1}>
            <StyledText
              level="body-sm"
              fontSize={20}
              fontWeight={600}
              color={PALLETTE.orange}
            >
              {`${numReserveTickets} ${t("manage_event.reserve_tickets")}`}
            </StyledText>
          </Box>
        </Grid>
        <Grid xs={8} justifyContent="flex-end" flexDirection="row">
          <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
            {format(new Date(ticketRelease.open), "dd/MM/yyyy HH:mm:ss")} -{" "}
            {format(new Date(ticketRelease.close), "dd/MM/yyyy HH:mm:ss")}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={500}
            color={isCurrentlyOpen() ? PALLETTE.green : PALLETTE.red}
          >
            {hasntOpenedYet()
              ? t("manage_event.not_yet_open")
              : t("manage_event.the_ticket_release") +
                " " +
                (isCurrentlyOpen()
                  ? t("manage_event.open")
                  : t("manage_event.closed"))}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={22}
            color={PALLETTE.charcoal_see_through}
            fontWeight={700}
            sx={{ mt: 2 }}
          >
            {t("manage_event.ticket_release_actions_title")}
          </StyledText>
          <Box mt={2}>
            <ConfirmModal
              isOpen={confirmOpen}
              onClose={() => {
                setConfirmOpen(false);
              }}
              title={t("manage_event.allocate_tickets_confirm_title")}
              actions={[
                <StyledButton
                  key="confirm"
                  size="md"
                  bgColor={PALLETTE.green}
                  onClick={async () => {
                    await handleAllocateTickets();
                  }}
                >
                  {allocationLoading
                    ? "Allocating..."
                    : t("form.button_confirm")}
                </StyledButton>,
                <StyledButton
                  key="cancel"
                  size="md"
                  bgColor={PALLETTE.red}
                  onClick={() => {
                    setConfirmOpen(false);
                  }}
                >
                  {t("form.button_cancel")}
                </StyledButton>,
              ]}
            >
              <StyledText
                level="body-md"
                fontWeight={500}
                color={PALLETTE.charcoal}
                fontSize={18}
              >
                {isCurrentlyOpen() && (
                  <StyledText
                    level="body-md"
                    fontWeight={700}
                    color={PALLETTE.red}
                    fontSize={18}
                  >
                    WARNING:{" "}
                  </StyledText>
                )}
                {isCurrentlyOpen()
                  ? t("manage_event.allocate_tickets_warning")
                  : t("manage_event.allocate_tickets_confirm")}

                <Divider sx={{ my: 2 }} />

                <FormControl>
                  <StyledFormLabel>
                    {t("manage_event.pay_within_hours")}
                  </StyledFormLabel>
                  <Input
                    value={payWithinHours}
                    onChange={(e) => {
                      // remove zeros at the start
                      if (
                        e.target.value.startsWith("0") &&
                        e.target.value.length > 1
                      ) {
                        e.target.value = e.target.value.slice(1);
                      }

                      // check more than 0
                      if (parseInt(e.target.value) < 1) {
                        e.target.value = "1";
                      }

                      setPayWithinHours(parseInt(e.target.value));
                    }}
                    placeholder=""
                    type="number"
                    style={
                      {
                        ...DefaultInputStyle,
                      } as any
                    }
                  />

                  <StyledFormLabelWithHelperText>
                    {t("manage_event.allocate_tickets_helperText")}
                  </StyledFormLabelWithHelperText>
                </FormControl>
              </StyledText>
            </ConfirmModal>
            <Stack spacing={2} direction={"column"}>
              {!hasntOpenedYet() && (
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
              <StyledButton
                size="md"
                bgColor={PALLETTE.offWhite}
                startDecorator={
                  <Tooltip
                    title={t(
                      "manage_event.check_allocated_reserve_tickets_tooltip"
                    )}
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                }
                onClick={() => {
                  tryToAllocateReserveTickets();
                }}
                sx={{ mt: 1 }}
              >
                {t("manage_event.check_allocated_reserve_tickets")}
              </StyledButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default TicketReleaseRowView;
