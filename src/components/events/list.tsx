import React from "react";
import Card from "@mui/joy/Card";
import Grid from "@mui/joy/Grid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IEvent } from "../../types";
import PALLETTE from "../../theme/pallette";
import { Box, Chip, IconButton, Link, Stack } from "@mui/joy";
import StyledText from "../text/styled_text";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTranslation } from "react-i18next";
import styles from "./list.module.css";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { compareAsc } from "date-fns";

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
    const endDate = event.end_date ? new Date(event.end_date) : null;
    const now = new Date();

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    if (endDate) {
      return endDate.getTime() + oneDay < now.getTime();
    }

    return eventDate.getTime() + oneDay < now.getTime();
  };

  const formatEventDate = (date: Date, end_date: Date | null) => {
    if (end_date) {
      if (date.toDateString() === end_date.toDateString()) {
        // Same date, only include the time part of the end date
        return `${date.toLocaleString()} - ${end_date.toLocaleTimeString()}`;
      } else {
        // Different dates, include both date and time for both
        return `${date.toLocaleString()} - ${end_date.toLocaleString()}`;
      }
    } else {
      return date.toLocaleString();
    }
  };

  return (
    <Grid container spacing={2}>
      {[...events]
        .sort((a, b) => {
          return compareAsc(new Date(a.date), new Date(b.date));
        }) // Sorts events from earliest to latest
        .map((event: IEvent, index) => {
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
                        <ModeEditIcon
                          style={{
                            color: PALLETTE.cerise_dark,
                          }}
                        />
                      </IconButton>
                    </Link>
                  )}
                </Stack>
              </Box>
              <Card
                variant="outlined"
                className={styles.card}
                onClick={() => {
                  navigate(`/events/${event.reference_id}`);
                }}
              >
                <div>
                  <StyledText
                    level="h4"
                    fontWeight={700}
                    color={PALLETTE.cerise_dark}
                    fontSize={22}
                    style={{
                      width: "60%",
                      // Breaks text into multiple lines if it's too long
                      overflow: "hidden",
                    }}
                  >
                    {event.name}
                  </StyledText>
                  <StyledText
                    level="body-sm"
                    color={PALLETTE.charcoal}
                    fontSize={15}
                    startDecorator={<CalendarTodayIcon />}
                  >
                    {formatEventDate(
                      new Date(event.date),
                      event.end_date ? new Date(event.end_date) : null
                    )}
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
