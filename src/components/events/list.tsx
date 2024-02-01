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
import { Box, Button, Link } from "@mui/joy";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTranslation } from "react-i18next";
import styles from "./list.module.css";

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const eventIsInThePast = (event: IEvent) => {
    // If the event is more than 1 day in the past
    const eventDate = new Date(event.date);
    const now = new Date();

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    return eventDate.getTime() + oneDay < now.getTime();
  };

  return (
    <Grid container spacing={2}>
      {events.map((event: IEvent, index) => {
        const userCanManage =
          currentUser?.organizations?.some(
            (org) => org.id === event.organizationId
          ) || currentUser?.ug_kth_id === event.createdById;

        if (eventIsInThePast(event)) {
          return null;
        }

        return (
          <Grid
            xs={12}
            sm={6}
            md={4}
            key={index}
            component={"div"}
            style={{
              position: "relative",
            }}
          >
            <Box
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
                zIndex: 100,
              }}
            >
              {userCanManage && (
                <Link href={`/events/${event.id}/manage`}>
                  <ModeEditIcon />
                </Link>
              )}
            </Box>
            <Card
              variant="outlined"
              className={styles.card}
              onClick={() => {
                navigate(`/events/${event.id}`);
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
                  fontSize={15}
                  startDecorator={<CalendarTodayIcon />}
                >
                  {new Date(event.date).toDateString()}
                </StyledText>
                <StyledText
                  level="body-sm"
                  fontSize={15}
                  color={PALLETTE.charcoal}
                  startDecorator={<LocationOnIcon />}
                >
                  {event.location}
                </StyledText>
                <StyledText
                  level="body-sm"
                  fontSize={16}
                  color={PALLETTE.charcoal}
                  style={{
                    marginTop: 10,
                    height: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {event.description}
                </StyledText>
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EventList;
