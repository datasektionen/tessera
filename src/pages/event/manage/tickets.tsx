import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer/event_detail";
import { Box, Breadcrumbs } from "@mui/joy";
import { useEventDetails } from "../../../hooks/use_event_details_hook";
import { useTranslation } from "react-i18next";
import EventTicketsList from "../../../components/events/tickets/list";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import Title from "../../../components/text/title";
import { ITicket } from "../../../types";
import TicketDetail from "../../../components/events/tickets/detail/ticket_detail";
import LoadingOverlay from "../../../components/Loading";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import { generateRoute, ROUTES } from "../../../routes/def";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";

const ManageEventTicketsPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [selectedTicketRequestID, setSelectedTicketRequestID] = useState<
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
        return ticket?.ticket_request?.id === selectedTicketRequestID;
      });
      setSelectedTicket(ticket || null);
    }
  }, [tickets, selectedTicketRequestID, ticketsLoading]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticketRequestID = params.get("ticket_request_id");

    if (ticketRequestID) {
      const parsedID = parseInt(ticketRequestID);
      if (!isNaN(parsedID)) {
        setSelectedTicketRequestID(parsedID);
      } else {
        setSelectedTicketRequestID(null);
      }
    }
  }, [setSelectedTicketRequestID]);

  useEffect(() => {
    handleSetSelectedTicket();
  }, [handleSetSelectedTicket]);

  useEffect(() => {
    // Update the URL with the ticket_request_id when selectedTicket changes
    if (selectedTicket) {
      navigate(
        `/events/${eventID}/manage/tickets?ticket_request_id=${selectedTicket.ticket_request?.id}`
      );
    }
  }, [selectedTicket, navigate, eventID]);

  const handleBackNavigation = useCallback(() => {
    // Custom logic when back button is pressed
    // For example, navigate to a specific path or perform checks
    setSelectedTicketRequestID(null);
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
              to={`/events/${eventID}/manage/tickets?ticket_request_id=${selectedTicket.ticket_request?.id}`}
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
              selectTicketRequest={setSelectedTicketRequestID}
            />
          )}
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManageEventTicketsPage;
