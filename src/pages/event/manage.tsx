import { Box, Grid, IconButton, Stack, Tooltip } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEventRequest } from "../../redux/features/eventSlice";
import LoadingOverlay from "../../components/Loading";
import EventDetailInfo from "../../components/events/detail_info";
import StyledText from "../../components/text/styled_text";
import StyledButton from "../../components/buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { fetchEventTicketsStart } from "../../redux/features/eventTicketsSlice";
import TicketsList from "../../components/tickets/list_tickets";
import EventTicketsList from "../../components/events/tickets/list";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ListEventTicketReleases from "../../components/events/ticket_release/list";

const ManageEventPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );

  const { tickets } = useSelector((state: RootState) => state.eventTickets);

  const dispatch: AppDispatch = useDispatch();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (eventID) {
      dispatch(getEventRequest(parseInt(eventID)));
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, []);

  if (!event || loading) {
    return <LoadingOverlay />;
  }
  return (
    <MUITesseraWrapper>
      <Box mx="64px" mt={"16px"}>
        <Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "90%",
          }}
        >
          Manage Event
        </Title>
        <Stack spacing={2} direction={"row"}>
          <StyledButton
            size="md"
            bgColor={PALLETTE.offWhite}
            onClick={() => {
              navigate(`/events/${event.id}/edit`);
            }}
            style={{ width: "150px" }}
          >
            Edit
          </StyledButton>
        </Stack>
        <EventDetailInfo event={event} />

        <ListEventTicketReleases
          ticketReleases={event.ticketReleases!}
          tickets={tickets}
        />

        <Grid container alignItems="center" justifyContent="flex-start" mt={2}>
          <Title fontSize={22} color={PALLETTE.charcoal}>
            Manage Event Tickets
          </Title>
          <Tooltip title="The table shows all the ticket requests and tickets for this event.">
            <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
          </Tooltip>
        </Grid>
        <EventTicketsList tickets={tickets} />
      </Box>
    </MUITesseraWrapper>
  );
};

export default ManageEventPage;
