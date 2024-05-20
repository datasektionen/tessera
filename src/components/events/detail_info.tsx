import { Divider, Grid, IconButton, Link, Stack, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { IEvent, IEventSiteVisit, ITicket } from "../../types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StyledText from "../text/styled_text";
import ReactMarkdown from "react-markdown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import EventSiteVisit from "./overview/event_site_visits";
interface EventDetailInfoProps {
  event: IEvent;
  secret_token?: string;
  tickets?: ITicket[];
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({
  event,
  secret_token,
  tickets,
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        process.env.REACT_APP_BASE_URL +
        `/events/${event.reference_id}?secret_token=${secret_token}`
      );
      // Show a toast or some other notification to let the user know the link has been copied
    } catch (err) {
      // Handle the error appropriately
      console.error('Failed to copy text: ', err);
    }
  };
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} columns={12}>
      <Grid xs={12}>
        <StyledText
          level="body-lg"
          color={PALLETTE.cerise_dark}
          fontSize={28}
          fontWeight={600}
          sx={{
            my: 2,
          }}
        >
          {t("manage_event.overview.title")}
        </StyledText>
        {/* Overview boxes */}
        <Grid
          container
          spacing={2}
          flexDirection={"row"}
          justifyContent={"flex-start"}
        >
          <EventSiteVisit eventID={event.id!} />
        </Grid>
        {event.is_private && (
          <>
            <StyledText
              color={PALLETTE.charcoal}
              level="body-lg"
              fontSize={22}
              fontWeight={600}
              sx={{
                mt: 3
              }}
            >
              {t("manage_event.private_event.title")}
            </StyledText>
            <StyledText color={PALLETTE.charcoal} level="body-md" fontSize={18}>
              {t("manage_event.private_event.subtitle")}
            </StyledText>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={`/events/${event.id}?secret_token=${secret_token}`}>
                {`${process.env.REACT_APP_BASE_URL}/events/${event.reference_id}?secret_token=${secret_token}`}
              </Link>
              <IconButton>
                <ContentCopyIcon
                  onClick={copyToClipboard}
                  style={{ cursor: "pointer" }}
                />
              </IconButton>
            </Stack>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default EventDetailInfo;
