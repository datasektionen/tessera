import { Grid, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { IEvent } from "../../types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StyledText from "../text/styled_text";

interface EventDetailInfoProps {
  event: IEvent;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({ event }) => {
  return (
    <Grid xs={8}>
      <Grid>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-lg"
          fontSize={32}
          fontWeight={600}
        >
          {event.name}
        </StyledText>

        <Grid container spacing={2}>
          <Grid xs={7}>
            <StyledText
              color={PALLETTE.charcoal}
              level="body-md"
              style={{
                height: "150px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {event.description}
            </StyledText>
          </Grid>
          <Grid xs={5}>
            <StyledText
              level="body-sm"
              fontSize={16}
              color={PALLETTE.charcoal}
              fontWeight={600}
              startDecorator={<LocationOnIcon />}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              {event.location}
            </StyledText>
            <StyledText
              level="body-sm"
              color={PALLETTE.charcoal}
              fontSize={16}
              fontWeight={600}
              startDecorator={<CalendarTodayIcon />}
              style={{
                color: PALLETTE.charcoal,
              }}
            >
              {/* Convert from timestamp to string */}
              {new Date(event.date).toLocaleString()}
            </StyledText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventDetailInfo;
