import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITicketRequest } from "../../types";
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
import TicketRequestListRowView from "./ticket_request_list_row_view";

interface TicketRequestsListProps {
  ticketRequests: ITicketRequest[];
  selected: number | null;
  setSelected: (index: number | null) => void;
}

const TicketRequestsList: React.FC<TicketRequestsListProps> = ({
  ticketRequests,
  selected,
  setSelected,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedRequests = showAll
    ? ticketRequests
    : ticketRequests.slice(0, 1);

  if (ticketRequests.length === 0) {
    return (
      <Box mt={2}>
        <StyledText color={PALLETTE.charcoal} level="body-md" fontWeight={700}>
          No ticket requests yet
        </StyledText>
      </Box>
    );
  }

  const groupedRequests = ticketRequests.reduce((groups, request) => {
    const key = request.ticket_release?.eventId!;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(request);
    return groups;
  }, {} as Record<string, ITicketRequest[]>);

  const upcomingEvents = Object.keys(groupedRequests).filter((eventId) => {
    const event = groupedRequests[eventId][0].ticket_release?.event;
    return new Date(event!.date) > new Date();
  });

  const pastEvents = Object.keys(groupedRequests).filter((eventId) => {
    const event = groupedRequests[eventId][0].ticket_release?.event;
    return new Date(event!.date) < new Date();
  });

  console.log(groupedRequests);

  return (
    <Box mt={2} sx={{ width: "90%", padding: 0 }}>
      {/* Group ticket request based on event id */}
      <StyledText
        color={PALLETTE.charcoal}
        level="body-md"
        fontWeight={700}
        fontSize={22}
      >
        Upcoming Events
      </StyledText>
      {/* Start by only showing events that are in the future */}
      {upcomingEvents.length === 0 ? (
        <StyledText color={PALLETTE.charcoal} level="body-md">
          No upcoming events
        </StyledText>
      ) : (
        upcomingEvents.map((eventId) => {
          const event = groupedRequests[eventId][0].ticket_release?.event;

          return (
            <BorderBox
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
                    {groupedRequests[eventId].map((request, index) => {
                      const isUpcoming =
                        new Date(request.created_at) < new Date();
                      return (
                        <TicketRequestListRowView
                          ticketRequest={request}
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
        Past Events
      </StyledText>
      {pastEvents.length === 0 ? (
        <StyledText color={PALLETTE.charcoal} level="body-md">
          No past events
        </StyledText>
      ) : (
        pastEvents.map((eventId) => {
          const event = groupedRequests[eventId][0].ticket_release?.event;

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
                    {groupedRequests[eventId].map((request, index) => {
                      const isUpcoming =
                        new Date(request.created_at) < new Date();
                      return (
                        <TicketRequestListRowView
                          ticketRequest={request}
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

export default TicketRequestsList;
