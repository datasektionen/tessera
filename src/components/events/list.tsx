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
import { Box, Button, Chip, IconButton, Link, Stack } from "@mui/joy";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTranslation } from "react-i18next";
import styles from "./list.module.css";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

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
            // @ts-ignore
            (org) => org.ID === event.organizationId
          ) ?? currentUser?.ug_kth_id === event.createdById;

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
              <Stack direction={isScreenSmall ? "column" : "row"} spacing={1}>
                {event.is_private && (
                  <Chip
                    style={{
                      backgroundColor: PALLETTE.offWhite,
                      color: PALLETTE.charcoal,
                    }}
                  >
                    <StyledText
                      level="body-sm"
                      color={PALLETTE.charcoal}
                      fontSize={14}
                      fontWeight={700}
                    >
                      {t("common.private_event")}
                    </StyledText>
                  </Chip>
                )}
                {userCanManage && (
                  <Link href={`/events/${event.id}/manage`}>
                    <IconButton>
                      <ModeEditIcon />
                    </IconButton>
                  </Link>
                )}
              </Stack>
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
                  color={PALLETTE.cerise_dark}
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
                  fontSize={10}
                  color={PALLETTE.charcoal}
                  style={{
                    height: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <ReactMarkdown>{event.description}</ReactMarkdown>
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
