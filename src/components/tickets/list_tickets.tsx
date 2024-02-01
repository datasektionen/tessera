import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITicket, ITicketRequest } from "../../types";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  styled,
} from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import BorderBox from "../wrappers/border_box";
import { format } from "date-fns";
import TicketRequestListRowView from "./ticket_list_row_view";
import TicketListRowView from "./ticket_list_row_view";
import { useTranslation } from "react-i18next";

interface TicketsListProps {
  tickets: ITicket[];
  selected: number | null;
  setSelected: (index: number | null) => void;
}

const TicketsList: React.FC<TicketsListProps> = ({
  tickets,
  selected,
  setSelected,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  if (tickets.length === 0) {
    return (
      <Box mt={2}>
        <StyledText color={PALLETTE.charcoal} level="body-md" fontWeight={700}>
          {t("profile.your_tickets.no_tickets")}
        </StyledText>
      </Box>
    );
  }

  const groupedTickets = tickets.reduce((groups, ticket) => {
    const key = ticket.ticket_request?.ticket_release?.eventId!;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {} as Record<string, ITicket[]>);

  const upcomingEvents = Object.keys(groupedTickets).filter((eventId) => {
    const event =
      groupedTickets[eventId][0].ticket_request?.ticket_release?.event;
    return new Date(event!.date) > new Date();
  });

  const pastEvents = Object.keys(groupedTickets).filter((eventId) => {
    const event =
      groupedTickets[eventId][0].ticket_request?.ticket_release?.event;
    return new Date(event!.date) < new Date();
  });

  return (
    <Box mt={2} sx={{ width: "90%", padding: 0 }}>
      {/* Group ticket request based on event id */}
      <StyledText
        color={PALLETTE.charcoal}
        level="body-md"
        fontWeight={700}
        fontSize={22}
      >
        {t("profile.your_tickets.upcoming_events")}
      </StyledText>
      {/* Start by only showing events that are in the future */}
      {upcomingEvents.length === 0 ? (
        <StyledText color={PALLETTE.charcoal} level="body-md">
          {t("profile.your_tickets.no_upcoming_events")}
        </StyledText>
      ) : (
        upcomingEvents.map((eventId) => {
          const event =
            groupedTickets[eventId][0].ticket_request!.ticket_release!.event;
          return (
            <BorderBox
              key={`${eventId}-border-box`}
              style={{
                marginTop: "16px",
              }}
            >
              <AccordionGroup>
                <Accordion key={eventId}>
                  <AccordionSummary
                    style={{
                      padding: 0,
                    }}
                  >
                    <StyledText
                      color={PALLETTE.cerise}
                      level="body-lg"
                      fontWeight={600}
                      fontSize={22}
                    >
                      {event?.name}{" "}
                      <StyledText
                        color={PALLETTE.charcoal}
                        level="body-md"
                        fontWeight={500}
                        fontSize={16}
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {format(new Date(event?.date!), "dd/MM/yyyy HH:mm")}
                      </StyledText>
                    </StyledText>
                  </AccordionSummary>
                  <AccordionDetails>
                    {groupedTickets[eventId].map((ticket, index) => {
                      const isUpcoming =
                        new Date(ticket.created_at) < new Date();
                      return (
                        <TicketListRowView
                          ticket={ticket}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </BorderBox>
          );
        })
      )}
      <StyledText
        color={PALLETTE.charcoal}
        level="body-md"
        fontWeight={700}
        fontSize={22}
        style={{
          marginTop: "16px",
        }}
      >
        {t("profile.your_tickets.past_events")}
      </StyledText>
      {pastEvents.length === 0 ? (
        <StyledText color={PALLETTE.charcoal} level="body-md">
          {t("profile.your_tickets.no_past_events")}
        </StyledText>
      ) : (
        pastEvents.map((eventId) => {
          const event =
            groupedTickets[eventId][0].ticket_request?.ticket_release?.event;

          return (
            <BorderBox>
              <AccordionGroup>
                <Accordion key={eventId}>
                  <AccordionSummary
                    style={{
                      padding: 0,
                    }}
                  >
                    <StyledText
                      color={PALLETTE.cerise}
                      level="body-lg"
                      fontWeight={600}
                      fontSize={22}
                    >
                      {event?.name}{" "}
                      <StyledText
                        color={PALLETTE.charcoal}
                        level="body-md"
                        fontWeight={500}
                        fontSize={16}
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {format(new Date(event?.date!), "dd/MM/yyyy HH:mm")}
                      </StyledText>
                    </StyledText>
                  </AccordionSummary>
                  <AccordionDetails>
                    {groupedTickets[eventId].map((ticket, index) => {
                      return (
                        <TicketListRowView
                          ticket={ticket}
                          selected={selected}
                          setSelected={setSelected}
                          isPastEvent={true}
                        />
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </BorderBox>
          );
        })
      )}
    </Box>
  );
};

export default TicketsList;
