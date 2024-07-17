import { useNavigate, useParams } from "react-router-dom";
import { ITicket, ITicketRelease } from "../../../../types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../../components/navigation/manage_drawer/event_detail";
import { Box, Breadcrumbs, Grid, Stack } from "@mui/joy";
import BreadCrumbLink from "../../../../components/navigation/breadcrumbs/link";
import ListEventTicketReleases from "../../../../components/events/ticket_release/list";
import { ScrollConfig } from "../../../../components/constant/scroll_config";
import Title from "../../../../components/text/title";
import EditTicketReleaseForm from "../../../../components/events/edit/ticket_release/edit_ticket_release_form";
import StyledButton from "../../../../components/buttons/styled_button";
import PALLETTE from "../../../../theme/pallette";
import {
  generateEditTicketReleaseAddons,
  generateEditTicketReleaseTicketTypes,
  generateRoute,
  ROUTES,
} from "../../../../routes/def";
import StyledText from "../../../../components/text/styled_text";
import EditTicketRelease from "../../../../components/events/edit/ticket_release/edit_ticket_release";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";
import Cookies from "js-cookie";

const drawerWidth = 200;

const EditTicketReleasesPage: React.FC = () => {
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

    // Save the ticket release ID in a cookie
    Cookies.set("lastVisitedTicketRelease", ticketRelease.id.toString());

    navigate(
      `/events/${eventID}/edit/ticket-releases?ticket_release_id=${ticketRelease.id}`,
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    const grouped = tickets.reduce((groups: any, ticket: ITicket) => {
      const key = ticket?.ticket_order?.ticket_release?.id!;
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
    let ticketReleaseID = params.get("ticket_release_id");

    // If there's no ticket release ID in the URL, get it from the cookie
    if (!ticketReleaseID) {
      ticketReleaseID = Cookies.get("lastVisitedTicketRelease")!;
    }

    if (ticketReleaseID) {
      const parsedID = parseInt(ticketReleaseID);
      if (!isNaN(parsedID)) {
        const ticketRelease = event?.ticket_releases?.find(
          (tr: any) => tr.id === parsedID
        );

        if (!ticketRelease) {
          return;
        }

        if (ticketRelease) {
          setSelectedTicketRelease(ticketRelease);
        }
      }
    }
  }, [event, setSelectedTicketRelease]);

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Title fontSize={36}>
          {t("manage_event.edit.ticket_releases.title")}
        </Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASES, {
              eventId: eventID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.ticket_releases")
            }
          />
          {selectedTicketRelease && (
            <BreadCrumbLink
              to={`/events/${eventID}/edit/ticket-releases?ticket_release_id=${selectedTicketRelease.id}`}
              label={selectedTicketRelease.name}
            />
          )}
        </Breadcrumbs>
        <Grid container columns={12} spacing={5} sx={{ mt: 1 }}>
          <Grid
            xs={3}
            md={2}
            sx={{
              height: "calc(100vh - 64px)",
              minWidth: "100px", // Set your desired minimum width here
              ...ScrollConfig,
            }}
          >
            <ListEventTicketReleases
              selectedTicketRelease={selectedTicketRelease}
              ticketReleases={event?.ticket_releases!}
              setSelectedTicketRelease={handleSetSelectedTicketRelease}
            />
          </Grid>
          <Grid xs={9} md={10}>
            {selectedTicketRelease !== null && (
              <EditTicketRelease
                ticketRelease={selectedTicketRelease}
                event={event!}
              />
            )}
          </Grid>
        </Grid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};
export default EditTicketReleasesPage;
