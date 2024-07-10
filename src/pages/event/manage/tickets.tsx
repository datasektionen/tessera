import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer/event_detail";
import { Box, Breadcrumbs } from "@mui/joy";
import { useEventDetails } from "../../../hooks/event/use_event_details_hook";
import { useTranslation } from "react-i18next";
import EventTicketsList from "../../../components/events/tickets/list/ticket_data_grid";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import Title from "../../../components/text/title";
import { ITicket } from "../../../types";
import TicketDetail from "../../../components/events/tickets/detail/ticket_detail";
import LoadingOverlay from "../../../components/Loading";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { generateRoute, ROUTES } from "../../../routes/def";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";

const ManageEventTicketsPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [selectedTicketOrderID, setSelectedTicketOrderID] = useState<
    number | null
  >(null);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const {
    eventTickets: { tickets, loading: ticketsLoading },
  } = useEventDetails(parseInt(eventID!));

  const handleSetSelectedTicket = useCallback(() => {
    if (!ticketsLoading) {
      const ticket = tickets.find((ticket) => {
        return ticket?.ticket_order?.id === selectedTicketOrderID;
      });
      setSelectedTicket(ticket || null);
    }
  }, [tickets, selectedTicketOrderID, ticketsLoading]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticketOrderID = params.get("ticket_order_id");

    if (ticketOrderID) {
      const parsedID = parseInt(ticketOrderID);
      if (!isNaN(parsedID)) {
        setSelectedTicketOrderID(parsedID);
      } else {
        setSelectedTicketOrderID(null);
      }
    }
  }, [setSelectedTicketOrderID]);

  useEffect(() => {
    handleSetSelectedTicket();
  }, [handleSetSelectedTicket]);

  useEffect(() => {
    if (selectedTicket) {
      navigate(
        `/events/${eventID}/manage/tickets?ticket_order_id=${selectedTicket.ticket_order?.id}`
      );
    }
  }, [selectedTicket, navigate, eventID]);

  const reFetchTickets = useCallback(() => {
    dispatch(fetchEventTicketsStart(parseInt(eventID!)));
  }, [dispatch, eventID]);

  const handleBackNavigation = useCallback(() => {
    // Custom logic when back button is pressed
    // For example, navigate to a specific path or perform checks
    setSelectedTicketOrderID(null);
  }, [navigate]);

  useEffect(() => {
    // Add event listener for popstate
    window.onpopstate = handleBackNavigation;

    // Cleanup listener
    return () => {
      window.onpopstate = null;
    };
  }, [handleBackNavigation]);

  return (
    <MUITesseraWrapper>
      {ticketsLoading && <LoadingOverlay />}
      <DrawerBoxWrapper eventID={eventID!}>
        <Title fontSize={36}>{t("manage_event.tickets.title")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={generateRoute(ROUTES.MANAGE_EVENT, { eventId: eventID! })}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.MANAGE_EVENT_TICKETS, {
              eventId: eventID!,
            })}
            label={t("manage_event.breadcrumbs.tickets")}
          />
          {selectedTicket && (
            <BreadCrumbLink
              to={`/events/${eventID}/manage/tickets?ticket_order_id=${selectedTicket.ticket_order?.id}`}
              label={selectedTicket.id.toString()}
            />
          )}
        </Breadcrumbs>
        <Box pt={2}>
          {selectedTicket ? (
            <TicketDetail ticket={selectedTicket} />
          ) : (
            <EventTicketsList
              tickets={tickets}
              selectTicketOrder={setSelectedTicketOrderID}
              reFetch={reFetchTickets}
            />
          )}
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManageEventTicketsPage;
