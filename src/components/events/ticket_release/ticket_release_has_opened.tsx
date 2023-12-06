import React, { useEffect } from "react";
import { ITicketRelease, ITicketType } from "../../../types";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import PALLETTE from "../../../theme/pallette";

import TicketReleaseCountdown from "./tr_countdown";
import TicketType from "../ticket_types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  ShoppingCartItem,
  postTicketRequest,
} from "../../../redux/features/ticketRequestSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import WhaIsTicketRequestModal from "./what_is_ticket_request";
import LoadingOverlay from "../../Loading";
import { TicketRequestData } from "../../../redux/sagas/ticketRequestSaga";

const TicketReleasHasOpened: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  const { items: ticketRequestItems, loading: makingRequest } = useSelector(
    (state: RootState) => state.ticketRequest
  ) as {
    items: ShoppingCartItem[];
    loading: boolean;
  };

  const [basket, setBasketItems] = React.useState<
    {
      name: string;
      quantity: number;
      price: number;
    }[]
  >();

  const [whatIsRequestOpen, setWhatIsRequestOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Create a summary of the ticket request items
    // Only where ticketType.ticketReleaseId === ticketRelease.id
    // Use ticketRelease.ticketTypes
    let summary = "";
    const basketItems: {
      name: string;
      quantity: number;
      price: number;
    }[] = [];

    ticketRequestItems.forEach((item) => {
      const ticketType = ticketRelease.ticketTypes?.find(
        (tt) => tt.id === item.ticket.id
      );
      if (ticketType) {
        summary += `${item.quantity} x ${ticketType.name}, `;
        basketItems.push({
          name: ticketType.name,
          quantity: item.quantity,
          price: ticketType.price,
        });
      }
    });

    setBasketItems(basketItems);
  }, [ticketRequestItems, ticketRelease.ticketTypes]);

  const handleMakeRequest = () => {
    // Make request
    // Get the tickets that are also in the basket
    // If there are 3 tickets in the basket, then there should be 3 tickets in the request
    let tickets: TicketRequestData[] = [];
    ticketRequestItems.forEach((item) => {
      const ticketType = ticketRelease.ticketTypes?.find(
        (tt) => tt.id === item.ticket.id
      );
      if (ticketType) {
        // Add a ticket_amount property
        const ticket: TicketRequestData = {
          ticket_type_id: ticketType.id,
          ticket_amount: item.quantity,
        };

        tickets.push(ticket);
      }
    });

    dispatch(
      postTicketRequest({
        tickets,
        eventId: ticketRelease.eventId,
        ticketReleaseId: ticketRelease.id,
      })
    );
  };

  console.log(makingRequest);

  return (
    <>
      {/* {makingRequest && <LoadingOverlay />} */}
      <Stack spacing={2} sx={{ p: 0 }} mt={2}>
        {ticketRelease.ticketTypes!.length > 0 ? (
          ticketRelease.ticketTypes!.map((ticketType, i) => {
            const key = `${ticketType.id}-${i}`;
            return (
              <TicketType
                ticketType={ticketType}
                maxTicketsPerUser={
                  ticketRelease.ticketReleaseMethodDetail?.maxTicketsPerUser
                }
                key={key}
              />
            );
          })
        ) : (
          <Typography level="body-sm" fontFamily={"Josefin sans"}>
            No tickets available
          </Typography>
        )}
      </Stack>
      {basket! && (
        <>
          <Typography
            level="h4"
            fontFamily={"Josefin Sans"}
            mt={2}
            style={{
              color: PALLETTE.charcoal,
            }}
          >
            Overview
          </Typography>
          {basket?.map((item, index) => (
            <>
              <Grid
                container
                key={`${item.name}-${index}`}
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
                  <Typography
                    level="body-sm"
                    fontFamily={"Josefin sans"}
                    ml={2}
                  >
                    {item.quantity} x {item.name}
                  </Typography>
                </Grid>
                <Typography level="body-sm" fontFamily={"Josefin sans"}>
                  SEK {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Grid>
              <Divider />
            </>
          ))}
          <Divider />
          {/* Total */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid container justifyContent={"flex-start"} flexDirection={"row"}>
              <ShoppingCartIcon />
              <Typography level="body-sm" fontFamily={"Josefin sans"} ml={2}>
                Total
              </Typography>
            </Grid>
            <Typography level="body-sm" fontFamily={"Josefin sans"}>
              SEK{" "}
              {basket
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </Grid>

          <Grid
            mt={2}
            container
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              size="md"
              onClick={handleMakeRequest}
              style={{
                borderColor: PALLETTE.cerise,
                color: PALLETTE.cerise,
              }}
            >
              Request
            </Button>
            <Typography
              fontFamily={"Josefin Sans"}
              fontSize={14}
              fontWeight={300}
            >
              <Link
                href="#"
                onClick={() => {
                  setWhatIsRequestOpen(true);
                }}
              >
                What is request?
              </Link>
            </Typography>
          </Grid>
          <WhaIsTicketRequestModal
            isOpen={whatIsRequestOpen}
            onClose={() => {
              setWhatIsRequestOpen(false);
            }}
          />
        </>
      )}
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <Typography
          level="body-md"
          fontFamily={"Josefin sans"}
          fontWeight={500}
          style={{
            color: PALLETTE.charcoal,
            // ALign right
          }}
        >
          Tickets available for:
        </Typography>
        <TicketReleaseCountdown
          ticketRelease={ticketRelease}
          fw={500}
          fs={14}
          useOpen={false}
        />
      </div>
    </>
  );
};

export default TicketReleasHasOpened;
