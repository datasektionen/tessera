import { Divider, Grid, IconButton, Link, Stack, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { IEvent } from "../../types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StyledText from "../text/styled_text";
import ReactMarkdown from "react-markdown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
interface EventDetailInfoProps {
  event: IEvent;
  secret_token?: string;
}

const EventDetailInfo: React.FC<EventDetailInfoProps> = ({
  event,
  secret_token,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      process.env.REACT_APP_BASE_URL +
        `/events/${event.id}?secret_token=${secret_token}`
    );
    // Show a toast or some other notification to let the user know the link has been copied
  };
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} columns={12}>
      <Grid xs={12}>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-lg"
          fontSize={32}
          fontWeight={600}
        >
          {event.name}
        </StyledText>

        <Divider sx={{ my: 2 }} />
        {event.is_private && (
          <>
            <StyledText
              color={PALLETTE.charcoal}
              level="body-lg"
              fontSize={22}
              fontWeight={600}
            >
              {t("manage_event.private_event.title")}
            </StyledText>
            <StyledText color={PALLETTE.charcoal} level="body-md" fontSize={18}>
              {t("manage_event.private_event.subtitle")}
            </StyledText>
            <Stack direction="row" spacing={2} alignItems="center">
              <Link href={`/events/${event.id}?secret_token=${secret_token}`}>
                {`${process.env.REACT_APP_BASE_URL}/events/${event.id}?secret_token=${secret_token}`}
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
