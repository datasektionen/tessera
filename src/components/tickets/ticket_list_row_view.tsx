import { ITicket } from "../../types";
import { Box, Chip, Grid, IconButton, Stack, Tooltip, styled } from "@mui/joy";
import BorderBox from "../wrappers/border_box";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

import { canPayForTicket } from "../../utils/user_payment";

const StyledTicketBox = styled(Box)(({ theme }) => ({
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

interface TicketListRowViewProps {
  ticket: ITicket;
  selected: number | null;
  setSelected: (id: number | null) => void;
  isPastEvent?: boolean;
}

const TicketListRowView: React.FC<TicketListRowViewProps> = ({
  ticket,
  selected,
  setSelected,
  isPastEvent = false,
}) => {
  if (!ticket) {
    return <></>;
  }

  const ticketOrder = ticket.ticket_order!;
  const event = ticketOrder.ticket_release!.event;

  const handleClick = () => {
    if (!isPastEvent) setSelected(ticket.id);
  };

  return (
    <StyledTicketBox
      key={ticket.id}
      my={1}
      style={{
        borderColor: selected === ticket.id ? PALLETTE.cerise : undefined,
        backgroundColor: isPastEvent
          ? PALLETTE.charcoal_see_through
          : undefined,
      }}
      onClick={handleClick}
    >
      <Grid
        container
        justifyContent="space-between"
        spacing={2}
        style={{
          padding: "8px",
        }}
      >
        <Grid>
          <StyledText
            color={PALLETTE.charcoal}
            level="body-md"
            fontWeight={700}
          >
            {ticket.ticket_type!.name} -
            <StyledText
              color={PALLETTE.charcoal}
              level="body-md"
              fontWeight={500}
            >
              {" "}
              {ticket.ticket_type!.price} SEK
            </StyledText>
          </StyledText>
        </Grid>
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
                    This shows if you got the ticket or is a reserve.
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
                    color={ticket.is_reserve ? PALLETTE.orange : PALLETTE.green}
                    level="body-sm"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {ticket.is_reserve ? "Reserve" : "Ticket"}
                  </StyledText>
                </Chip>
              </Tooltip>

              <Chip
                variant="soft"
                color="primary"
                style={{
                  backgroundColor: PALLETTE.charcoal,
                }}
              >
                <StyledText
                  color={!ticket.is_paid ? PALLETTE.red : PALLETTE.green}
                  level="body-sm"
                  fontSize={14}
                  fontWeight={600}
                >
                  {ticket.is_paid
                    ? "Paid"
                    : canPayForTicket(ticket)
                    ? "Not paid"
                    : "Not paid in time"}
                </StyledText>
              </Chip>
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
              {!ticket.is_reserve && ticket.is_paid && (
                <Chip
                  variant="soft"
                  color="primary"
                  style={{
                    backgroundColor: PALLETTE.charcoal,
                  }}
                >
                  <StyledText
                    color={ticket.checked_in ? PALLETTE.green : PALLETTE.orange}
                    level="body-sm"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {ticket.checked_in ? "Checked in" : "Not checked in"}
                  </StyledText>
                </Chip>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </StyledTicketBox>
  );
};

export default TicketListRowView;
