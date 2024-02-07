import {
  Box,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  Sheet,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import { ITicketRelease } from "../../../types";
import PALLETTE from "../../../theme/pallette";
import TicketType from "../ticket_types";

import TicketReleaseCountdown from "./tr_countdown";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ShoppingCartItem } from "../../../redux/features/ticketRequestSlice";
import React, { useEffect } from "react";
import { ListItemText } from "@mui/material";
import {
  ticketReleaseHasClosed,
  ticketReleaseHasNotOpened,
  ticketReleaseHasOpened,
} from "../../../utils/event_open_close";
import TicketReleasHasOpened from "./ticket_release_has_opened";
import TicketReleaseHasClosed from "./ticket_release_has_closed";
import TicketReleasHasNotOpened from "./ticket_release_has_not_opened";
import StyledText from "../../text/styled_text";
import InformationModal from "../../modal/information";
import { Trans, useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import axios from "axios";
import { NotificationsActive } from "@mui/icons-material";
import { toast } from "react-toastify";

interface TicketReleaseProps {
  ticketRelease: ITicketRelease;
}

const renderTicketReleaseStatus = (ticketRelease: ITicketRelease) => {
  if (ticketReleaseHasNotOpened(ticketRelease)) {
    return <TicketReleasHasNotOpened ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasClosed(ticketRelease)) {
    return <TicketReleaseHasClosed ticketRelease={ticketRelease} />;
  } else if (ticketReleaseHasOpened(ticketRelease)) {
    return <TicketReleasHasOpened ticketRelease={ticketRelease} />;
  }
};

const TicketRelease: React.FC<TicketReleaseProps> = ({ ticketRelease }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const [reminderStatus, setReminderStatus] = React.useState<{
    has_reminder: boolean;
    reminder_time: number;
  } | null>(null);

  const getUserTicketReleaseReminderStatus = async (
    ticketRelease: ITicketRelease
  ) => {
    axios
      // /events/:eventID/ticket-release/:ticketReleaseID/reminder
      .get(
        process.env.REACT_APP_BACKEND_URL +
          `/events/${ticketRelease.eventId}/ticket-release/${ticketRelease.id}/reminder`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const { reminder_time } = response.data;
        if (reminder_time) {
          const reminder_time_unix = new Date(reminder_time).getTime();
          setReminderStatus({
            has_reminder: true,
            reminder_time: reminder_time_unix,
          });
        }
      })
      .catch((error) => {});
  };

  const createReminder = async () => {
    const reminder_time: number = Math.floor(
      ticketRelease.open / 1000 - 60 * 10
    );

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          `/events/${ticketRelease.eventId}/ticket-release/${ticketRelease.id}/reminder`,
        {
          reminder_time,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setReminderStatus({
          has_reminder: true,
          reminder_time,
        });
        toast.info(
          "Reminder has been set, you will be notified 10 minutes before the ticket release opens"
        );
      })
      .catch((error) => {
        const errorMessage = error.response.data.error || "An error occurred";
        toast.error(errorMessage);
      });
  };

  const removeReminder = async () => {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL +
          `/events/${ticketRelease.eventId}/ticket-release/${ticketRelease.id}/reminder`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setReminderStatus(null);
        toast.info("Reminder has been removed");
      })
      .catch((error) => {
        const errorMessage = error.response.data.error || "An error occurred";
        toast.error(errorMessage);
      });
  };

  useEffect(() => {
    getUserTicketReleaseReminderStatus(ticketRelease);
  }, []);

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
      }}
      style={{
        borderColor: PALLETTE.cerise,
        backgroundColor: "transparent",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
        spacing={2}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        {ticketRelease.is_reserved! && (
          <Box>
            <Chip variant="soft" color="primary">
              <StyledText
                color={PALLETTE.charcoal}
                fontSize={12}
                level="body-sm"
                fontWeight={600}
              >
                {t("event.reserved")}
              </StyledText>
            </Chip>
          </Box>
        )}
        {ticketReleaseHasNotOpened(ticketRelease) &&
          (reminderStatus === null ? (
            <Box style={{}}>
              <Tooltip title={t("event.ticket_release.set_reminder")}>
                <IconButton onClick={createReminder}>
                  <NotificationsNoneIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box>
              <Tooltip title={t("event.ticket_release.remove_reminder")}>
                <IconButton onClick={removeReminder}>
                  <NotificationsActive
                    style={{
                      color: PALLETTE.cerise,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          ))}
      </Stack>

      <StyledText
        level="h4"
        fontSize={24}
        color={PALLETTE.charcoal}
        style={{
          color: PALLETTE.charcoal,
        }}
      >
        {ticketRelease.name}
      </StyledText>
      <StyledText level="body-sm" color={PALLETTE.charcoal} fontSize={16}>
        <div style={{ margin: 0 }}>
          <ReactMarkdown>{ticketRelease.description}</ReactMarkdown>
        </div>
      </StyledText>
      {!ticketReleaseHasClosed(ticketRelease) && [
        <StyledText
          level="body-sm"
          key="ticket_release_method"
          color={PALLETTE.charcoal_see_through}
          fontSize={16}
        >
          <Trans
            i18nKey="event.ticket_release.method"
            values={{
              method:
                ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
                  ?.name,
            }}
          >
            This release uses
            <Link target="_blank" onClick={() => setModalIsOpen(true)}>
              {
                ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
                  ?.name
              }
            </Link>
          </Trans>
        </StyledText>,
        <InformationModal
          key={"ticket_release_method_modal"}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title={
            ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod?.name!
          }
        >
          <StyledText
            level="body-sm"
            color={PALLETTE.charcoal}
            fontSize={18}
            fontWeight={500}
          >
            {
              ticketRelease.ticketReleaseMethodDetail?.ticketReleaseMethod
                ?.description
            }
          </StyledText>
        </InformationModal>,
      ]}

      {renderTicketReleaseStatus(ticketRelease)}
    </Sheet>
  );
};

export default TicketRelease;
