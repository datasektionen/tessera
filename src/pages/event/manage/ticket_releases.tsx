import { useEffect, useState } from "react";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useParams } from "react-router-dom";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import ListEventTicketReleases from "../../../components/events/ticket_release/list";
import { useSelector } from "react-redux";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer";
import { Box, Grid } from "@mui/joy";
import { useEventDetails } from "../../../hooks/use_event_details_hook";
import { ITicket, ITicketRelease } from "../../../types";
import TicketReleaseRowView from "../../../components/events/ticket_release/list/ticket_release_row_view";
import PALLETTE from "../../../theme/pallette";

const drawerWidth = 200;

const ManageEventTicketReleasesPage: React.FC = () => {
  const { eventID } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTicketRelease, setSelectedTicketRelease] =
    useState<ITicketRelease | null>(null);
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});

  const {
    eventDetail: { event },
    eventTickets: { tickets },
  } = useEventDetails(eventID!);

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

  return (
    <MUITesseraWrapper>
      <DrawerComponent eventID={eventID!} />

      <Box
        sx={{
          marginLeft: `70px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Grid container columns={12} spacing={5}>
          <Grid
            xs={2}
            sx={{
              height: "calc(100vh - 64px)",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: PALLETTE.offWhite,
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <ListEventTicketReleases
              ticketReleases={event?.ticketReleases!}
              setSelectedTicketRelease={setSelectedTicketRelease}
            />
          </Grid>
          <Grid xs={10}>
            {selectedTicketRelease !== null && (
              <TicketReleaseRowView
                ticketRelease={selectedTicketRelease!}
                ticketReleaseTickets={
                  groupedTickets[selectedTicketRelease.id] || []
                }
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </MUITesseraWrapper>
  );
};
export default ManageEventTicketReleasesPage;
