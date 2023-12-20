import { Grid, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { IEvent } from "../../types";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface EventDetailInfoProps {
  event: IEvent;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({ event }) => {
  return (
    <Grid xs={8}>
      <Grid>
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
              {/* Convert from timestamp to string */}
              {new Date(event.date).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventDetailInfo;
