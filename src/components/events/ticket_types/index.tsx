import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  Typography,
} from "@mui/joy";
import { ITicketType } from "../../../types";
import PALLETTE from "../../../theme/pallette";
import {
  ShoppingCartItem,
  addTicket,
  removeTicket,
} from "../../../redux/features/ticketRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  numberOfTicketRequestInBasket,
  numberOfTotalTicketRequestInBasket,
} from "../../../utils/ticket_types";

interface TicketTypeProps {
  ticketType: ITicketType;
  maxTicketsPerUser: number;
}

const TicketType: React.FC<TicketTypeProps> = ({
  ticketType,
  maxTicketsPerUser,
}) => {
  const { items } = useSelector((state: RootState) => state.ticketRequest) as {
    items: ShoppingCartItem[];
  };
  const [plusDisabled, setPlusDisabled] = React.useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const handleAddTicket = (ticket: ITicketType) => {
    const numberOfTotalTickets = numberOfTotalTicketRequestInBasket(
      items,
      ticket.ticketReleaseId!
    );
    if (numberOfTotalTickets >= maxTicketsPerUser) {
      toast.error(
        `You can only purchase a maximum of ${maxTicketsPerUser} tickets`
      );
      return;
    }

    if (numberOfTotalTickets + 1 >= maxTicketsPerUser) {
      setPlusDisabled(true);
    } else {
      setPlusDisabled(false);
    }

    dispatch(addTicket(ticket));
  };

  const handleRemoveTicket = (ticket: ITicketType) => {
    setPlusDisabled(false);
    dispatch(removeTicket(ticket));
  };

  const [ticketTypeCount, setTicketTypeCount] = React.useState<{
    [id: number]: number;
  }>({});

  useEffect(() => {
    // Get counts of ticket types from items
    const counts: { [n: number]: number } =
      numberOfTicketRequestInBasket(items);
    setTicketTypeCount(counts);
  }, [items]);

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      style={{
        backgroundColor: "transparent",
        borderColor: PALLETTE.cerise,
        maxHeight: "150px",
        minWidth: "fit-content",
        width: "90%",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <Typography
                textColor={PALLETTE.cerise}
                fontFamily={"Josefin sans"}
                fontWeight={700}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "160px", // Adjust this value to suit your needs
                }}
              >
                {ticketType.name}
              </Typography>
              <Typography
                level="body-sm"
                fontSize={12}
                fontFamily={"Josefin sans"}
                textColor={PALLETTE.charcoal}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "160px", // Adjust this value to suit your needs
                }}
              >
                {ticketType.description}
              </Typography>
            </div>
            <Typography
              level="body-sm"
              textColor={PALLETTE.cerise}
              style={{
                width: "100px",
                whiteSpace: "nowrap",
              }}
            >
              SEK{" "}
              <Typography
                level="body-sm"
                fontSize={18}
                fontWeight={"lg"}
                fontFamily={"Josefin sans"}
                textColor={PALLETTE.cerise}
              >
                {" "}
                {ticketType.price}
              </Typography>
            </Typography>
          </div>

          <Grid container spacing={1} alignItems="center">
            <Button
              size="sm"
              variant="solid"
              style={{ backgroundColor: PALLETTE.charcoal }}
              sx={{ px: 0.2, width: "40px", height: "20px" }}
              onClick={() => handleRemoveTicket(ticketType)}
            >
              -
            </Button>
            <Typography
              level="body-xs"
              fontWeight={700}
              fontSize={18}
              fontFamily={"Josefin sans"}
              textColor={PALLETTE.cerise}
              mx={1}
              style={{
                width: "30px",
                textAlign: "center",
              }}
            >
              {ticketTypeCount[ticketType.id!] || 0}
            </Typography>
            <Button
              variant="solid"
              size="sm"
              onClick={() => handleAddTicket(ticketType)}
              style={{ backgroundColor: PALLETTE.charcoal }}
              sx={{ px: 0.2, width: "40px", height: "20px" }}
              disabled={plusDisabled}
            >
              +
            </Button>
          </Grid>
        </div>
      </CardContent>
      <CardOverflow
        variant="soft"
        color="primary"
        sx={{
          px: 0.2,
          writingMode: "vertical-rl",
          textAlign: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
          backgroundColor: PALLETTE.cerise,
        }}
      >
        Ticket
      </CardOverflow>
    </Card>
  );
};

export default TicketType;
