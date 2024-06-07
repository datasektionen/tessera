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
import { ITicketOrder } from "../../types";

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
  if (!ticketOrder) {
    return <></>;
  }

  const event = ticketOrder.ticket_release!.event;
  const isUpcoming = new Date(event!.date) > new Date();
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
        {ticketOrder.tickets.map((ticket) => (
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
