import { Box, Divider, Grid } from "@mui/joy";
import { IAddon, ITicket, ITicketAddon, ITicketOrder } from "../../types";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { useCosts } from "../events/payments/use_cost";
import { useTranslation } from "react-i18next";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface ShowTicketOrdersTicketsProps {
  ticketOrder: ITicketOrder;
}

const ShowTicketOrdersTickets: React.FC<ShowTicketOrdersTicketsProps> = ({
  ticketOrder,
}) => {
  const { totalTicketCost, totalAddonsCost, totalCost } = useCosts(ticketOrder);

  const { addons: allAddons } = ticketOrder.ticket_release!;
  const { t } = useTranslation();

  // Group tickets by ticket_type_id
  const groupedTickets: { [key: string]: ITicket[] } =
    ticketOrder.tickets.reduce((acc, ticket) => {
      if (!acc[ticket.ticket_type_id]) {
        acc[ticket.ticket_type_id] = [];
      }
      acc[ticket.ticket_type_id].push(ticket);
      return acc;
    }, {} as { [key: string]: ITicket[] });

  return (
    <Box mt={2}>
      <StyledText level="body-sm" fontSize={22} color={PALLETTE.charcoal}>
        {t("ticket_request.cost_overview")}
      </StyledText>
      <>
        {Object.keys(groupedTickets).map((ticketTypeId) => {
          const tickets = groupedTickets[ticketTypeId];
          const ticketType = tickets[0].ticket_type;
          const subtotal = tickets.reduce(
            (acc, ticket) => acc + (ticket.ticket_type?.price || 0),
            0
          );

          return (
            <Box key={ticketTypeId} mt={2}>
              <Grid
                container
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid
                  container
                  justifyContent={"flex-start"}
                  flexDirection={"row"}
                >
                  <LocalActivityIcon />
                  <StyledText
                    level="body-sm"
                    color={PALLETTE.charcoal}
                    fontSize={18}
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {tickets.length} x {ticketType?.name}
                  </StyledText>
                </Grid>
                <StyledText
                  level="body-sm"
                  color={PALLETTE.charcoal}
                  fontSize={18}
                >
                  SEK {subtotal.toFixed(2)}
                </StyledText>
              </Grid>
              {tickets.map((ticket) => (
                <Box key={ticket.id}>
                  {ticket.ticket_add_ons?.map((addon: ITicketAddon) => {
                    const a: IAddon | undefined = allAddons?.find(
                      (a: any) => a.id === addon.add_on_id
                    );

                    return (
                      <Grid
                        key={addon.id + "-addon"}
                        container
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid
                          container
                          justifyContent={"flex-start"}
                          flexDirection={"row"}
                        >
                          <AddCircleOutlineIcon />
                          <StyledText
                            level="body-sm"
                            color={PALLETTE.charcoal}
                            fontSize={18}
                            style={{
                              marginLeft: "8px",
                            }}
                          >
                            {addon.quantity} x {a?.name}
                          </StyledText>
                        </Grid>
                        <StyledText
                          level="body-sm"
                          color={PALLETTE.charcoal}
                          fontSize={18}
                        >
                          SEK {(a?.price! * addon.quantity).toFixed(2)}
                        </StyledText>
                      </Grid>
                    );
                  })}
                </Box>
              ))}
            </Box>
          );
        })}
        <Divider />
        <Grid
          container
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <StyledText
            level="body-sm"
            color={PALLETTE.charcoal}
            fontSize={18}
            style={{
              fontWeight: "bold",
            }}
          >
            {t("event.ticket_release.checkout.total")}
          </StyledText>
          <StyledText
            level="body-sm"
            color={PALLETTE.charcoal}
            fontSize={18}
            style={{
              fontWeight: "bold",
            }}
          >
            SEK {totalCost.toFixed(2)}
          </StyledText>
        </Grid>
      </>
    </Box>
  );
};

export default ShowTicketOrdersTickets;
