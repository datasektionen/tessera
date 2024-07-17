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
import BorderBox from "../wrappers/border_box";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { format } from "date-fns";
import { t } from "i18next";
import { ITicket, ITicketOrder } from "../../types";
import { useEffect, useState } from "react";

const StyledTicketRequestBox = styled(Box)(({ theme }) => ({
  border: "2px solid " + PALLETTE.charcoal,
  padding: theme.spacing(1),
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    transition: "all 0.2s ease-in-out",
    border: "2px solid " + PALLETTE.charcoal_see_through,
    backgroundColor: PALLETTE.white,
  },
}));

interface TicketOrderListRowViewProps {
  ticketOrder: ITicketOrder;
  selected: number | null;
  setSelected: (id: number | null) => void;
  isPastEvent?: boolean;
}

const TicketOrderListRowView: React.FC<TicketOrderListRowViewProps> = ({
  ticketOrder,
  selected,
  setSelected,
  isPastEvent = false,
}) => {
  const event = ticketOrder.ticket_release!.event;
  const isUpcoming = new Date(event!.date) > new Date();
  const [groupedTickets, setGroupedTickets] = useState<{
    [key: string]: { name: string; price: number; count: number }[];
  }>({});

  useEffect(() => {
    const grouped = ticketOrder.tickets.reduce(
      (
        acc: {
          [key: string]: { name: string; price: number; count: number }[];
        },
        ticket
      ) => {
        const key = ticket.ticket_order_id.toString(); // Ensure the key is a string
        const ticketTypeKey = ticket.ticket_type_id.toString();
        if (!acc[key]) {
          acc[key] = [];
        }
        const existingTicketType = acc[key].find(
          (t) =>
            t.name === ticket.ticket_type.name &&
            t.price === ticket.ticket_type.price
        );
        if (existingTicketType) {
          existingTicketType.count += 1;
        } else {
          acc[key].push({
            name: ticket.ticket_type.name,
            price: ticket.ticket_type.price,
            count: 1,
          });
        }
        return acc;
      },
      {}
    );

    setGroupedTickets(grouped);
  }, [ticketOrder.tickets]);

  if (!ticketOrder) {
    return <></>;
  }

  return (
    <StyledTicketRequestBox
      key={ticketOrder.id}
      my={1}
      style={{
        borderColor: selected === ticketOrder.id ? PALLETTE.cerise : undefined,
        backgroundColor:
          isPastEvent || ticketOrder.deleted_at
            ? PALLETTE.charcoal_see_through
            : undefined,
      }}
      onClick={() => setSelected(ticketOrder.id)}
    >
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        style={{
          padding: "8px",
        }}
      >
        {Object.entries(groupedTickets).map(([ticketOrderId, ticketTypes]) => (
          <Grid xs={12} key={ticketOrderId}>
            {ticketTypes.map((ticketType) => (
              <StyledText
                key={ticketType.name}
                color={PALLETTE.charcoal}
                level="body-md"
                fontWeight={700}
              >
                {ticketType.count} x {ticketType.name} -
                <StyledText
                  color={PALLETTE.charcoal}
                  level="body-md"
                  fontWeight={500}
                >
                  {" "}
                  {ticketType.price} SEK
                </StyledText>
              </StyledText>
            ))}
          </Grid>
        ))}

        <Grid>
          {!isPastEvent && (
            <Stack direction="row" spacing={1}>
              <Tooltip
                title={
                  <StyledText
                    color={PALLETTE.white}
                    level="body-md"
                    fontWeight={500}
                    fontSize={15}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    If a ticket request is handled,
                    <br />
                    the user will be able to view the ticket in the tickets
                    page.
                  </StyledText>
                }
              >
                <Chip
                  variant="soft"
                  color="primary"
                  style={{
                    backgroundColor: PALLETTE.charcoal,
                  }}
                >
                  <StyledText
                    color={
                      ticketOrder.is_handled ? PALLETTE.green : PALLETTE.orange
                    }
                    level="body-sm"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {ticketOrder.is_handled
                      ? t("ticket_request.handled")
                      : t("ticket_request.ticket_request")}
                  </StyledText>
                </Chip>
              </Tooltip>
              {ticketOrder.deleted_at && (
                <Chip
                  variant="soft"
                  color="primary"
                  style={{
                    backgroundColor: PALLETTE.charcoal,
                  }}
                >
                  <StyledText
                    color={PALLETTE.cerise}
                    level="body-sm"
                    fontSize={14}
                    fontWeight={600}
                  >
                    Deleted
                  </StyledText>
                </Chip>
              )}
              {ticketOrder.ticket_release?.is_reserved && (
                <Chip
                  variant="soft"
                  color="primary"
                  style={{
                    backgroundColor: PALLETTE.charcoal,
                  }}
                >
                  <StyledText
                    color={PALLETTE.cerise}
                    level="body-sm"
                    fontSize={14}
                    fontWeight={600}
                  >
                    Reserved
                  </StyledText>
                </Chip>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </StyledTicketRequestBox>
  );
};

export default TicketOrderListRowView;
