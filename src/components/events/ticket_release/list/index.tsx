import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Link,
} from "@mui/joy";
import { IEvent, ITicket, ITicketRelease } from "../../../../types";
import Title from "../../../text/title";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import TicketReleaseRowView from "./ticket_release_row_view";
import { useEffect, useState } from "react";

interface ListEventTicketReleasesProps {
  ticketReleases: ITicketRelease[];
  tickets: ITicket[];
}

const ListEventTicketReleases: React.FC<ListEventTicketReleasesProps> = ({
  ticketReleases,
  tickets,
}) => {
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});

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

  console.log(groupedTickets);

  return (
    <Box sx={{ marginTop: "16px" }}>
      <Title fontSize={22} color={PALLETTE.charcoal}>
        Manage Ticket Releases
      </Title>

      <AccordionGroup>
        {ticketReleases.map((ticketRelease) => {
          return (
            <Accordion key={`ticket-release-${ticketRelease.id}`}>
              <AccordionSummary>
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.charcoal_see_through}
                  fontWeight={700}
                >
                  {ticketRelease.name}
                </StyledText>
              </AccordionSummary>
              <AccordionDetails>
                <TicketReleaseRowView
                  ticketRelease={ticketRelease}
                  ticketReleaseTickets={groupedTickets[ticketRelease.id] || []}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </AccordionGroup>
    </Box>
  );
};

export default ListEventTicketReleases;
