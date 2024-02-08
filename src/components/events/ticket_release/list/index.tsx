import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Grid,
  Link,
  Modal,
} from "@mui/joy";
import { IEvent, ITicket, ITicketRelease } from "../../../../types";
import Title from "../../../text/title";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import TicketReleaseRowView from "./ticket_release_row_view";
import { useEffect, useState } from "react";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasOpened,
} from "../../../../utils/event_open_close";
import InformationModal from "../../../modal/information";
import BorderBox from "../../../wrappers/border_box";
import StyledButton from "../../../buttons/styled_button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface ListEventTicketReleasesProps {
  ticketReleases: ITicketRelease[];
  tickets: ITicket[];
}

// Component to view what status the ticket release is in and if an action is needed
const TicketReleaseStatusIndicator: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  const [status, setStatus] = useState<string>("");
  const { timestamp } = useSelector((state: RootState) => state.timestamp);

  useEffect(() => {
    let status: string = "";
    if (ticketReleaseHasOpened(ticketRelease, timestamp!)) {
      status = "Open";
    } else if (ticketReleaseHasClosed(ticketRelease, timestamp!)) {
      status = "Closed, ";
      if (!ticketRelease.has_allocated_tickets) {
        status += "No tickets allocated";
      } else {
        status += "Tickets allocated";
      }
    }
    setStatus(status);
  }, [ticketRelease]);

  return (
    <StyledText
      level="body-md"
      fontSize={18}
      color={PALLETTE.charcoal_see_through}
      fontWeight={700}
    >
      {status}
    </StyledText>
  );
};

const ListEventTicketReleases: React.FC<ListEventTicketReleasesProps> = ({
  ticketReleases,
  tickets,
}) => {
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});

  const [openModal, setOpenModal] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setOpenModal(id);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  // Group tickets by ticket release
  useEffect(() => {
    const grouped = tickets.reduce((groups, ticket) => {
      const key = ticket?.ticket_request?.ticket_release?.id!;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {} as Record<string, ITicket[]>);

    setGroupedTickets(grouped);
  }, [tickets]);

  if (!ticketReleases || ticketReleases.length === 0) {
    return null;
  }

  return (
    <Grid container alignItems="center" justifyContent="flex-start" spacing={2}>
      {ticketReleases.map((ticketRelease) => {
        return (
          <Grid key={"ticket-release-" + ticketRelease.id}>
            <StyledButton
              size="md"
              bgColor={PALLETTE.offWhite}
              onClick={() => {
                handleOpen(ticketRelease.id);
              }}
              style={{ width: "300px" }}
            >
              {ticketRelease.name}
            </StyledButton>
            <InformationModal
              title={"Manage " + ticketRelease.name}
              isOpen={openModal === ticketRelease.id}
              onClose={handleClose}
              width={"75%"}
            >
              <TicketReleaseRowView
                ticketRelease={ticketRelease}
                ticketReleaseTickets={groupedTickets[ticketRelease.id] || []}
              />
            </InformationModal>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ListEventTicketReleases;
