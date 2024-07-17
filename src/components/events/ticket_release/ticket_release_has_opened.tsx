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
  postTicketOrderRequest,
} from "../../../redux/features/ticketOrderSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import WhaIsTicketRequestModal from "./what_is_ticket_request";
import LoadingOverlay from "../../Loading";
import {
  ITicketOrderRequest,
  TicketRequestData,
} from "../../../redux/sagas/ticketOrderSaga";
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
import MakeTicketOrderWorkflow from "./ticket_request/make_ticket_request_work_flow";
import { createGuestTicketOrderRequest } from "../../../redux/features/guestCustomerSlice";

const TicketReleaseHasOpened: React.FC<{
  ticketRelease: ITicketRelease;
}> = ({ ticketRelease }) => {
  const { items: ticketOrderItems, loading: makingRequest } = useSelector(
    (state: RootState) => state.ticketOrder
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
    {
      ticket_type_id: number;
    }[]
  >([]);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const [selectedAddons, setSelectedAddons] = React.useState<ISelectedAddon[]>(
    []
  );

  const { guestCustomer } = useSelector((state: RootState) => state.auth);

  const [makeTicketOrderModalOpen, setMakeTicketOrderModalOpen] =
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

    ticketOrderItems.forEach((item) => {
      const ticketType = ticketRelease.ticket_types?.find(
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
    ticketOrderItems,
    ticketRelease.ticket_types,
    selectedAddons,
    ticketRelease.addons,
  ]);

  const handleMakeRequest = () => {
    // Make request
    // Get the tickets that are also in the basket
    // If there are 3 tickets in the basket, then there should be 3 tickets in the request
    let tickets: {
      ticket_type_id: number;
    }[] = [];
    ticketOrderItems.forEach((item) => {
      const ticketType = ticketRelease.ticket_types?.find(
        (tt) => tt.id === item.ticket.id
      );
      if (ticketType) {
        // Add a ticket_amount property
        for (let i = 0; i < item.quantity; i++) {
          tickets.push({
            ticket_type_id: ticketType.id,
          });
        }
      }
    });

    if (tickets.length === 0) {
      toast.info("No tickets selected");
      return;
    }

    setRequestedTickets(tickets);
    setMakeTicketOrderModalOpen(true);
  };

  const getPromoCodes = () => {
    let existingPromoCodes: string[] = [];
    if (existingPromoCodes) {
      existingPromoCodes = JSON.parse(
        localStorage.getItem("promo_codes") || "[]"
      );
    } else {
      existingPromoCodes = [];
    }
    return existingPromoCodes ?? [];
  };

  const onSubmit = () => {
    dispatch(
      postTicketOrderRequest({
        promoCodes: getPromoCodes(),
        tickeOrderReq: {
          ticket_release_id: ticketRelease.id!,
          tickets: requestedTickets,
        },
        addons: selectedAddons,
        eventId: ticketRelease.event_id,
      })
    );
  };

  const onGuestSubmit = () => {
    dispatch(
      createGuestTicketOrderRequest({
        promoCodes: getPromoCodes(),
        ticketOrder: {
          ticket_release_id: ticketRelease.id!,
          tickets: requestedTickets,
        },
        addons: selectedAddons,
        eventId: ticketRelease.event_id,
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
        isOpen={makeTicketOrderModalOpen}
        onClose={() => {
          setMakeTicketOrderModalOpen(false);
        }}
        title={t(
          "event.ticket_release.request_process.complete_ticket_request"
        )}
        width={isScreenSmall ? "100%" : "60%"}
      >
        <Box>
          <MakeTicketOrderWorkflow
            ticketRelease={ticketRelease}
            onSubmitTicketOrder={onSubmit}
            onSubmitGuestTicketOrder={onGuestSubmit}
            onClose={() => {
              setMakeTicketOrderModalOpen(false);
            }}
          />
        </Box>
      </InformationModal>

      {/* {makingRequest && <LoadingOverlay />} */}
      <Stack spacing={2} sx={{ p: 0 }} mt={2}>
        {ticketRelease.ticket_types!.length > 0 ? (
          ticketRelease.ticket_types!.map((ticketType, i) => {
            const key = `${ticketType.id}-${i}`;
            return (
              <TicketType
                ticketType={ticketType}
                maxTicketsPerUser={
                  ticketRelease.ticket_release_method_detail
                    ?.max_tickets_per_user
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
          <Divider
            sx={{
              mb: 1,
              maxWidth: "500px",
            }}
          />
          {/* Total */}
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              maxWidth: "500px",
            }}
          >
            <Grid container justifyContent={"flex-start"} flexDirection={"row"}>
              <ShoppingCartIcon />
              <StyledText
                level="body-sm"
                fontSize={16}
                color={PALLETTE.charcoal}
                sx={{
                  ml: 2,
                }}
              >
                {t("event.ticket_release.checkout.total")}
              </StyledText>
            </Grid>
            <StyledText level="body-sm" fontSize={16} color={PALLETTE.charcoal}>
              SEK{" "}
              {basket
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </StyledText>
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
                  ticketOrderItems,
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
