import { useEffect, useState } from "react";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import ListEventTicketReleases from "../../../components/events/ticket_release/list";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer/event_detail";
import { Box, Breadcrumbs, Grid } from "@mui/joy";
import { useEventDetails } from "../../../hooks/event/use_event_details_hook";
import { ITicket, ITicketRelease } from "../../../types";
import TicketReleaseRowView from "../../../components/events/ticket_release/list/ticket_release_row_view";
import PALLETTE from "../../../theme/pallette";
import Title from "../../../components/text/title";
import { useTranslation } from "react-i18next";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import { ScrollConfig } from "../../../components/constant/scroll_config";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";

const drawerWidth = 200;

const ManageEventTicketReleasesPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [selectedTicketRelease, setSelectedTicketRelease] =
    useState<ITicketRelease | null>(null);
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});
  const { t } = useTranslation();

  const {
    eventDetail: { event },
    eventTickets: { tickets },
  } = useEventDetails(parseInt(eventID!));

  const handleSetSelectedTicketRelease = (ticketRelease: ITicketRelease) => {
    setSelectedTicketRelease(ticketRelease);
    navigate(
      `/events/${eventID}/manage/ticket-releases?ticket_release_id=${ticketRelease.id}`,
      { replace: true }
    );
  };

  useEffect(() => {
    const grouped = tickets.reduce((groups, ticket) => {
      const key = ticket?.ticket_request?.ticket_release?.id!;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {} as Record<string, ITicket[]>);
    setGroupedTickets(grouped);
  }, [tickets]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ticketReleaseID = params.get("ticket_release_id");
    if (ticketReleaseID) {
      const parsedID = parseInt(ticketReleaseID);
      if (!isNaN(parsedID)) {
        const ticketRelease = event?.ticket_releases?.find(
          (tr) => tr.id === parsedID
        );
        if (ticketRelease) {
          setSelectedTicketRelease(ticketRelease);
        }
      }
    }
  }, [event, setSelectedTicketRelease]);

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Title fontSize={36}>{t("manage_event.ticket_releases.title")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={`/events/${eventID}/manage/ticket-releases`}
            label={t("manage_event.breadcrumbs.ticket_releases")}
          />
        </Breadcrumbs>
        <Grid container spacing={5} sx={{ mt: 1 }}>
          <Grid
            xs={12}
            md={3}
            sx={{ height: "calc(100vh - 64px)", ...ScrollConfig }}
          >
            <ListEventTicketReleases
              selectedTicketRelease={selectedTicketRelease}
              ticketReleases={event?.ticket_releases!}
              setSelectedTicketRelease={handleSetSelectedTicketRelease}
            />
          </Grid>
          <Grid xs={12} md={9}>
            {selectedTicketRelease && (
              <TicketReleaseRowView
                ticketRelease={selectedTicketRelease}
                ticketReleaseTickets={
                  groupedTickets[selectedTicketRelease.id] || []
                }
              />
            )}
          </Grid>
        </Grid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManageEventTicketReleasesPage;
