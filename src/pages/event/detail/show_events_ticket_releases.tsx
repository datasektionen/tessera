import { Box, Link, Stack } from "@mui/joy";
import { IEvent, ITicketRelease } from "../../../types";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import TicketRelease from "../../../components/events/ticket_release";
import { Trans, useTranslation } from "react-i18next";
import StyledButton from "../../../components/buttons/styled_button";

interface ShowEventsTicketReleaseProps {
  ticketReleases: ITicketRelease[];
  event: IEvent;
}

const ShowEventsTicketReleases: React.FC<ShowEventsTicketReleaseProps> = ({
  ticketReleases,
  event,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledText
        level="h2"
        color={PALLETTE.cerise_dark}
        fontSize={32}
        fontWeight={600}
      >
        {t("event.ticket_releases")}
      </StyledText>
      <Box>
        <StyledText
          color={PALLETTE.charcoal}
          level="body-sm"
          fontSize={18}
          fontWeight={500}
        >
          {t("event.ticket_releases_description")}
        </StyledText>

        {ticketReleases.length === 0 && (
          <StyledText
            color={PALLETTE.charcoal}
            level="body-sm"
            fontSize={22}
            fontWeight={500}
            style={{
              marginTop: "1rem",
            }}
          >
            {t("event.no_ticket_releases")}
          </StyledText>
        )}
        <Stack
          spacing={2}
          sx={{
            p: 0,
          }}
        >
          {ticketReleases.map((ticketRelease, i) => {
            const key = `${event.name}-${i}`;

            return <TicketRelease ticketRelease={ticketRelease} key={key} />;
          })}
        </Stack>
      </Box>
    </>
  );
};

export default ShowEventsTicketReleases;
