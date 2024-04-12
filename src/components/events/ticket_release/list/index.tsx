import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Grid,
  Link,
  Modal,
  Stack,
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
  setSelectedTicketRelease: (ticketRelease: ITicketRelease) => void;
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
  setSelectedTicketRelease,
}) => {
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});

  const [openModal, setOpenModal] = useState<number | null>(null);
  const { timestamp } = useSelector((state: RootState) => state.timestamp);

  const handleOpen = (id: number) => {
    setOpenModal(id);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  const isOpen = (ticketRelease: ITicketRelease) => {
    return ticketReleaseHasOpened(ticketRelease, timestamp!);
  };

  // Group tickets by ticket release

  if (!ticketReleases || ticketReleases.length === 0) {
    return null;
  }

  return (
    <Stack direction="column" spacing={2}>
      {[...ticketReleases]
        .sort((a, b) => {
          const dateA =
            a.created_at instanceof Date
              ? a.created_at
              : new Date(a.created_at);
          const dateB =
            b.created_at instanceof Date
              ? b.created_at
              : new Date(b.created_at);
          return dateA.getTime() - dateB.getTime();
        })
        .map((ticketRelease) => {
          return (
            <Box
              sx={{
                borderColor: PALLETTE.cerise,
                borderWidth: "1px",
                borderStyle: "solid",
                pl: 2,
                pt: 0.5,
                "&:hover": {
                  borderColor: PALLETTE.cerise_dark,
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setSelectedTicketRelease(ticketRelease);
              }}
            >
              <StyledText
                level="body-md"
                fontSize={18}
                color={PALLETTE.charcoal}
                fontWeight={700}
              >
                {ticketRelease.name}
              </StyledText>
              <StyledText
                level="body-md"
                fontSize={16}
                color={
                  isOpen(ticketRelease)
                    ? PALLETTE.dark_green
                    : PALLETTE.dark_red
                }
              >
                {isOpen(ticketRelease) ? "Open" : "Closed"}
              </StyledText>
            </Box>
          );
        })}
    </Stack>
  );
};

export default ListEventTicketReleases;
