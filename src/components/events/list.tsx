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

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  console.log(events[0]);

  return (
    <Grid container spacing={2}>
      {events.map((event, index) => (
        <Grid xs={12} sm={6} md={4} key={index} component={"div"}>
          <Card variant="plain">
            <div>
              <Typography level="title-lg">{event.name}</Typography>
              <Typography level="body-sm">
                {new Date(event.date).toDateString()}
              </Typography>
              <Typography level="body-sm" startDecorator={<LocationOnIcon />}>
                {event.location}
              </Typography>
              <Typography
                level="body-sm"
                startDecorator={<InfoIcon />}
                sx={{ mt: 1 }}
              >
                {event.description}
              </Typography>
            </div>
            <CardContent>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                Tickets
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
