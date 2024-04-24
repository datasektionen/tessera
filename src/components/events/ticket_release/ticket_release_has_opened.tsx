import React, { useEffect } from "react";
import { ISelectedAddon, ITicketRelease, ITicketType } from "../../../types";
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
import WhaIsTicketRequestModal from "./what_is_ticket_request";
import LoadingOverlay from "../../Loading";
import { TicketRequestData } from "../../../redux/sagas/ticketRequestSaga";
import { toast } from "react-toastify";
import StyledButton from "../../buttons/styled_button";
import {
  numberOfTicketRequestInBasket,
  numberOfTotalTicketRequestInBasket,
} from "../../../utils/ticket_types";
import { Trans, useTranslation } from "react-i18next";
import StyledText from "../../text/styled_text";
import TicketReleaseAddons from "./addons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InformationModal from "../../modal/information";
import { useMediaQuery, useTheme } from "@mui/material";
import MakeTicketRequestUserDetails from "./ticket_request/make_ticket_request_user_details";
import MakeTicketRequestWorkflow from "./ticket_request/make_ticket_request_work_flow";
import { createGuestTicketRequest } from "../../../redux/features/guestCustomerSlice";

const TicketReleaseHasOpened: React.FC<{
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
      type: "ticket" | "addon";
    }[]
  >();

  const [whatIsRequestOpen, setWhatIsRequestOpen] = React.useState(false);
  const [requestedTickets, setRequestedTickets] = React.useState<
    TicketRequestData[]
  >([]);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const [selectedAddons, setSelectedAddons] = React.useState<ISelectedAddon[]>(
    []
  );

  const { guestCustomer } = useSelector((state: RootState) => state.auth);

  const [makeTicketRequestModalOpen, setMakeTicketRequestModalOpen] =
    React.useState(false);

  useEffect(() => {
    // Create a summary of the ticket request items
    // Only where ticketType.ticketReleaseId === ticketRelease.id
    // Use ticketRelease.ticketTypes
    let summary = "";
    const basketItems: {
      name: string;
      quantity: number;
      price: number;
      type: "ticket" | "addon";
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
          type: "ticket",
        });
      }
    });

    selectedAddons.forEach((addon) => {
      const addonType = ticketRelease.addons?.find((a) => a.id === addon.id);
      if (addonType && addon.quantity > 0) {
        summary += `${addon.quantity} x ${addonType.name}, `;
        basketItems.push({
          name: addonType.name,
          quantity: addon.quantity,
          price: addonType.price,
          type: "addon",
        });
      }
    });

    setBasketItems(basketItems);
  }, [
    ticketRequestItems,
    ticketRelease.ticketTypes,
    selectedAddons,
    ticketRelease.addons,
  ]);

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

    if (tickets.length === 0) {
      toast.info("No tickets selected");
      return;
    }

    setRequestedTickets(tickets);
    setMakeTicketRequestModalOpen(true);
  };

  const onSubmit = () => {
    dispatch(
      postTicketRequest({
        tickets: requestedTickets,
        addons: selectedAddons,
        eventId: ticketRelease.eventId,
        ticketReleaseId: ticketRelease.id,
      })
    );
  };

  const onGuestSubmit = () => {
    dispatch(
      createGuestTicketRequest({
        tickets: requestedTickets,
        addons: selectedAddons,
        eventId: ticketRelease.eventId,
        ticketReleaseId: ticketRelease.id,
        guestCustomer: guestCustomer!,
      })
    );
  };

  const handleAddonChange = (
    selectedAddons: { id: number; quantity: number }[]
  ) => {
    setSelectedAddons(selectedAddons);
    // Should be able to add addons to the basket
  };

  return (
    <>
      <InformationModal
        isOpen={makeTicketRequestModalOpen}
        onClose={() => {
          setMakeTicketRequestModalOpen(false);
        }}
        title={t("event.ticket_release.checkout.confirm_request_title")}
        width={isScreenSmall ? "100%" : "60%"}
      >
        <Box>
          <MakeTicketRequestWorkflow
            ticketRelease={ticketRelease}
            onSubmitTicketRequest={onSubmit}
            onSubmitGuestTicketRequest={onGuestSubmit}
          />
        </Box>
      </InformationModal>

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
            {t("event.ticket_release.no_tickets")}
          </Typography>
        )}
      </Stack>
      {ticketRelease.addons && ticketRelease.addons.length > 0 && (
        <TicketReleaseAddons
          ticketRelease={ticketRelease}
          handleChange={handleAddonChange}
          selectedAddons={selectedAddons}
        />
      )}
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
            {t("event.ticket_release.checkout.overview")}
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
                  {item.type === "ticket" ? (
                    <LocalActivityIcon />
                  ) : (
                    <AddCircleOutlineIcon />
                  )}
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
              <Typography
                level="body-sm"
                fontFamily={"Josefin sans"}
                ml={2}
                fontWeight={600}
              >
                {t("event.ticket_release.checkout.total")}
              </Typography>
            </Grid>
            <Typography level="body-sm" fontFamily={"Josefin sans"}>
              SEK{" "}
              {basket
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
          </Grid>

          <Box mt={2}>
            <StyledText
              level="body-sm"
              fontWeight={500}
              fontSize={14}
              color={PALLETTE.charcoal}
            >
              <Trans i18nKey="event.ticket_release.information_processing_policy_info">
                By requesting a ticket you agree to share your food preferences
                and user details with the event organizer until the event is
                over. Information collected will be processed in accordance with
                the Chapter's information processing policy,
                <Link
                  href="https://styrdokument.datasektionen.se/pm_informationshantering"
                  target="_blank"
                >
                  click here
                </Link>
                for more information.
              </Trans>
            </StyledText>
          </Box>

          <Grid
            mt={2}
            container
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <StyledButton
              size="lg"
              onClick={handleMakeRequest}
              bgColor={PALLETTE.green}
              color={PALLETTE.charcoal}
              disabled={
                numberOfTotalTicketRequestInBasket(
                  ticketRequestItems,
                  ticketRelease.id!
                ) === 0
              }
            >
              {t("form.button_request")}
            </StyledButton>
            <Typography
              fontFamily={"Josefin Sans"}
              fontSize={16}
              fontWeight={400}
            >
              <Link
                href="#"
                onClick={() => {
                  setWhatIsRequestOpen(true);
                }}
              >
                {t("event.ticket_release.checkout.what_is_a_request_title")}
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
        <StyledText
          level="body-sm"
          fontWeight={600}
          fontSize={16}
          color={PALLETTE.charcoal}
        >
          {t("event.ticket_release.tickets_available_for")}:
        </StyledText>
        <TicketReleaseCountdown
          ticketRelease={ticketRelease}
          fw={500}
          fs={18}
          useOpen={false}
        />
      </div>
    </>
  );
};

export default TicketReleaseHasOpened;
