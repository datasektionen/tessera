import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { ITicket, ITicketRelease } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Divider, Grid, Link, Sheet } from "@mui/joy";
import LoadingOverlay from "../../../Loading";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";
import StyledButton from "../../../buttons/styled_button";
import ConfirmModal from "../../../modal/confirm_modal";

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

  const [loading, setLoading] = useState<boolean>(false);

  const isCurrentlyOpen = () => {
    const now = new Date();
    return (
      new Date(ticketRelease.open) < now && new Date(ticketRelease.close) > now
    );
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
      {loading && <LoadingOverlay />}
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
            Ticket release is {isCurrentlyOpen() ? "Open" : "Closed"}
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
                onClick={() => {}}
              >
                Confirm
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
            </StyledText>
          </ConfirmModal>
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
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default TicketReleaseRowView;
