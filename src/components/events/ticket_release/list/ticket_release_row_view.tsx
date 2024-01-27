import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITicket, ITicketRelease } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Divider, FormControl, Grid, Input, Link, Sheet } from "@mui/joy";
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

interface TicketReleaseRowViewProps {
  ticketRelease: ITicketRelease;
  ticketReleaseTickets?: ITicket[];
}

const TicketReleaseRowView: React.FC<TicketReleaseRowViewProps> = ({
  ticketRelease,
  ticketReleaseTickets,
}) => {
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log(error);
      toast.error(errorMessage);
    }
    setAllocationLoading(false);
    setConfirmOpen(false);
  };

  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  if (!ticketReleaseTickets) {
    return null;
  }

  const numTicketRequests = ticketReleaseTickets.filter(
    (ticket) => !ticket.ticket_request?.is_handled
  ).length;

  const numAllocatedTickets = ticketReleaseTickets.filter(
    (ticket) => ticket.ticket_request?.is_handled
  ).length;

  return (
    <Sheet
      style={{
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      <Grid container spacing={2} columns={16}>
        <Grid xs={4}>
          {" "}
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={700}
            color={PALLETTE.cerise}
          >
            {ticketRelease.name}
          </StyledText>
          <StyledText
            level="body-sm"
            fontSize={16}
            color={PALLETTE.charcoal}
            fontWeight={500}
          >
            {ticketRelease.ticketReleaseMethodDetail.ticketReleaseMethod?.name}
          </StyledText>
        </Grid>
        <Grid xs={5} justifyContent="flex-end" flexDirection="row">
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
              ? "Not yet open"
              : "Ticket Release " +
                (isCurrentlyOpen() ? "is open" : "has closed")}
          </StyledText>
        </Grid>
        <Grid xs={4}>
          <StyledText
            level="body-sm"
            fontSize={18}
            fontWeight={600}
            color={
              ticketRelease.has_allocated_tickets
                ? PALLETTE.green
                : PALLETTE.orange
            }
          >
            {ticketRelease.has_allocated_tickets!
              ? ` ${numAllocatedTickets} Allocated tickets`
              : `${numTicketRequests} Ticket requests`}
          </StyledText>
        </Grid>
        <Grid
          container
          xs={3}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <ConfirmModal
            isOpen={confirmOpen}
            onClose={() => {
              setConfirmOpen(false);
            }}
            title="Confirm ticket release"
            actions={[
              <StyledButton
                size="md"
                bgColor={PALLETTE.green}
                onClick={async () => {
                  await handleAllocateTickets();
                }}
              >
                {allocationLoading ? "Allocating..." : "Allocate"}
              </StyledButton>,
              <StyledButton
                size="md"
                bgColor={PALLETTE.red}
                onClick={() => {
                  setConfirmOpen(false);
                }}
              >
                Cancel
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
                ? "This ticket release is currently open. Allocating tickets now will automatically close the ticket release. Are you sure you want to allocate tickets now?"
                : "Are you sure you want to open this ticket release?"}

              <Divider sx={{ my: 2 }} />

              <FormControl>
                <StyledFormLabel>
                  Users must pay within (hours)*
                </StyledFormLabel>
                <Input
                  value={payWithinHours}
                  onChange={(e) => {
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
                  How long do users have to pay for their tickets before it is
                  given to the next person in line?
                </StyledFormLabelWithHelperText>
              </FormControl>
            </StyledText>
          </ConfirmModal>
          {!hasntOpenedYet() && (
            <StyledButton
              size="md"
              bgColor={isCurrentlyOpen() ? PALLETTE.red : PALLETTE.green}
              disabled={ticketRelease.has_allocated_tickets}
              onClick={() => {
                setConfirmOpen(true);
              }}
            >
              Allocate Tickets
            </StyledButton>
          )}
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default TicketReleaseRowView;
