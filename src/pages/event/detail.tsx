import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { getEventsRequest } from "../../redux/features/listEventsSlice";
import { getEventRequest } from "../../redux/features/eventSlice";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Sheet,
  Stack,
  Typography,
  styled,
} from "@mui/joy";
import { IEvent } from "../../types";
import LoadingOverlay from "../../components/Loading";
import { useParams } from "react-router-dom";
import { validateAndConvertEventID } from "../../utils/id_validation";
import PALLETTE from "../../theme/pallette";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TicketRelease from "../../components/events/ticket_release";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.level1
      : PALLETTE.offWhite,
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const EventDetail: React.FC = () => {
  const { eventID } = useParams();

  const { loading, error, event } = useSelector(
    (state: RootState) => state.eventDetail
  ) as { loading: boolean; error: string | null; event: IEvent | null };
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!eventID) {
      console.error("No event id found");
      return;
    }

    const intid: number = validateAndConvertEventID(eventID);
    // Get id param :eventID
    dispatch(getEventRequest(intid));
  }, []);

  if (loading || error) {
    return <LoadingOverlay />;
  }

  if (!event) {
    // TODO: 404 page
    console.error("No event found");
    return null;
  }

  console.log("event", event);

  return (
    <TesseraWrapper>
      <Grid
        container
        spacing={2}
        columns={16}
        sx={{ flexGrow: 1 }}
        style={{
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Grid xs={8}>
          <Item>
            <Typography
              level="h1"
              fontFamily={"Josefin sans"}
              fontSize={48}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.name}
            </Typography>

            <Grid container spacing={2}>
              <Grid xs={7}>
                <Typography
                  level="body-md"
                  style={{
                    color: PALLETTE.charcoal,
                    height: "150px",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </Typography>
              </Grid>
              <Grid xs={5}>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<LocationOnIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {event.location}
                </Typography>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<CalendarTodayIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {new Date(event.date).toDateString()}
                </Typography>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item>
            <Typography
              level="h2"
              fontFamily={"Josefin sans"}
              fontSize={34}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Tickets
            </Typography>
            <div>
              <Stack spacing={2} sx={{ p: 0 }}>
                {event.ticketReleases?.map((ticketRelease) => {
                  return <TicketRelease ticketRelease={ticketRelease} />;
                })}
              </Stack>
            </div>
          </Item>
        </Grid>
      </Grid>
    </TesseraWrapper>
  );
};

export default EventDetail;
