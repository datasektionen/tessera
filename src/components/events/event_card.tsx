import React from "react";
import { IEvent } from "../../types";
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/joy/Card";
import PALLETTE from "../../theme/pallette";
import { formatEventDate } from "../../utils/date_conversions";

interface EventCardProps {
  event: IEvent;
  isForCustomers?: boolean;
  inThePast?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isForCustomers = true,
  inThePast = false,
}) => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const userCanManage =
    currentUser?.organizations?.some(
      // @ts-ignore
      (org) => org.ID === event.organizationId
    ) ?? currentUser?.ug_kth_id === event.createdById;

  return (
    <Card
      variant="outlined"
      className={styles.card}
      onClick={() => {
        if (isForCustomers && userCanManage) {
          navigate(`/events/${event.reference_id}`);
        } else {
          navigate(`/events/${event.id}/manage`);
        }
      }}
      sx={{
        backgroundColor: inThePast ? PALLETTE.charcoal_see_through : PALLETTE.white,
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
        </Stack>
      </Box>
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
  );
};

export default EventCard;
