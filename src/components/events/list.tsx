import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { IEvent } from "../../types";
import PALLETTE from "../../theme/pallette";
import { Button } from "@mui/joy";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import { useNavigate } from "react-router-dom";

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {events.map((event: IEvent, index) => (
        <Grid xs={12} sm={6} md={4} key={index} component={"div"}>
          <Card
            variant="outlined"
            style={{
              backgroundColor: PALLETTE.offWhite,
              borderRadius: 0,
              borderColor: PALLETTE.cerise,
              borderWidth: 2,
            }}
          >
            <div>
              <StyledText
                level="h4"
                fontWeight={600}
                color={PALLETTE.cerise}
                fontSize={24}
              >
                {event.name}
              </StyledText>
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal}
                fontSize={14}
                startDecorator={<CalendarTodayIcon />}
              >
                {new Date(event.date).toDateString()}
              </StyledText>
              <StyledText
                level="body-sm"
                fontSize={14}
                color={PALLETTE.charcoal}
                startDecorator={<LocationOnIcon />}
              >
                {event.location}
              </StyledText>
              <StyledText
                level="body-sm"
                fontSize={16}
                startDecorator={<InfoIcon />}
                color={PALLETTE.charcoal}
                style={{ marginTop: 10 }}
              >
                {event.description}
              </StyledText>
            </div>
            <CardContent>
              <StyledButton
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                onClick={() => {
                  navigate(`/events/${event.id}`);
                }}
                style={{
                  marginTop: 10,
                  width: "100px",
                }}
              >
                Details
              </StyledButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
