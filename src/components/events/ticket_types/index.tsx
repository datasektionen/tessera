import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Grid,
  Stack,
  Tooltip,
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StyledText from "../../text/styled_text";
import InfoIcon from "@mui/icons-material/Info";

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
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch: AppDispatch = useDispatch();
  const handleAddTicket = (ticket: ITicketType) => {
    const numberOfTotalTickets = numberOfTotalTicketRequestInBasket(
      items,
      ticket.ticket_release_id!
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

  const calculateFontSize = (str: string) => {
    const length = str.length;
    if (length <= 10) {
      return isScreenSmall ? 14 : 20;
    } else if (length <= 20) {
      return isScreenSmall ? 12 : 18;
    } else {
      return isScreenSmall ? 10 : 16;
    }
  };

  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      style={{
        backgroundColor: PALLETTE.white,
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.25)",
        borderColor: PALLETTE.cerise,
        maxHeight: isScreenSmall ? "100px" : "150px",
        minWidth: isScreenSmall ? "80%" : "fit-content",
        maxWidth: "600px",
        width: "90%",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isScreenSmall ? "column" : "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {!isScreenSmall && (
                  <Tooltip title={ticketType.description}>
                    <InfoIcon />
                  </Tooltip>
                )}
                <StyledText
                  level="body-md"
                  color={PALLETTE.cerise_dark}
                  fontWeight={700}
                  fontSize={
                    isScreenSmall ? 14 : calculateFontSize(ticketType.name)
                  }
                  style={{
                    overflow: "break-word",
                    lineHeight: "1",
                    textOverflow: "wrap",
                    maxWidth: isScreenSmall ? "100px" : "inherit",
                    width: isScreenSmall ? "60px" : "150px",
                  }}
                >
                  {ticketType.name}
                </StyledText>
              </Stack>
            </div>
            <Typography
              level="body-md"
              textColor={PALLETTE.cerise_dark}
              fontWeight={500}
              style={{
                width: isScreenSmall ? "fit-content" : "50",
                whiteSpace: "nowrap",
                margin: "0 8px",
              }}
            >
              SEK{" "}
              <Typography
                level="body-sm"
                fontSize={20}
                fontWeight={600}
                fontFamily={"Josefin sans"}
                textColor={PALLETTE.cerise_dark}
              >
                {" "}
                {ticketType.price}
              </Typography>
            </Typography>
          </div>

          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="flex-start"
            style={{
              minWidth: "80px",
            }}
          >
            <Button
              size="sm"
              variant="solid"
              style={{ backgroundColor: PALLETTE.cerise_dark }}
              sx={{
                px: 0.2,
                width: isScreenSmall ? "20px" : "40px",
                height: isScreenSmall ? "20px" : "40px",
              }}
              onClick={() => handleRemoveTicket(ticketType)}
            >
              -
            </Button>
            <Typography
              level="body-xs"
              fontWeight={700}
              fontSize={18}
              fontFamily={"Josefin sans"}
              textColor={PALLETTE.charcoal}
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
              style={{ backgroundColor: PALLETTE.cerise_dark }}
              sx={{
                px: 0.2,
                width: isScreenSmall ? "20px" : "40px",
                height: isScreenSmall ? "20px" : "40px",
              }}
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
          color: PALLETTE.charcoal,
        }}
      >
        Ticket
      </CardOverflow>
    </Card>
  );
};

export default TicketType;
