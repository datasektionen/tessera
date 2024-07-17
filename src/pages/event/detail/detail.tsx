import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { format } from "date-fns";
import {
  Box,
  Divider,
  Grid,
  Link,
  Sheet,
  Stack,
  Typography,
  styled,
} from "@mui/joy";
import { IEvent } from "../../../types";
import LoadingOverlay from "../../../components/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PALLETTE from "../../../theme/pallette";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import StandardGrid from "../../../components/wrappers/standard_grid";

import { Trans, useTranslation } from "react-i18next";
import StyledText from "../../../components/text/styled_text";
import GroupsIcon from "@mui/icons-material/Groups";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ticketReleaseHasClosed } from "../../../utils/event_open_close";
import usePromoCodes from "../../../hooks/event/use_event_promo_code_hook";
import { useEventEffects } from "../../../hooks/event/event_detail_hook";
import { PromoCodeForm } from "./promo_code_form";
import ShowEventsTicketReleases from "./show_events_ticket_releases";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.level1
      : PALLETTE.offWhite,
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const EventDetail: React.FC = () => {
  const { refID } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const secretToken = queryParams.get("secret_token");

  const { loading, error, event, errorStatusCode } = useSelector(
    (state: RootState) => state.customerViewEvent
  ) as {
    loading: boolean;
    error: string | null;
    event: IEvent | null;
    errorStatusCode: number | null;
  };

  const { postSuccess } = useSelector((state: RootState) => state.ticketOrder);

  const { timestamp } = useSelector((state: RootState) => state.timestamp);

  const { t } = useTranslation();
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { submitPromoCode, promoCodes } = usePromoCodes(
    refID!,
    secretToken || ""
  );

  useEventEffects(postSuccess, errorStatusCode, refID!, secretToken, error);

  if (loading || error) {
    return <LoadingOverlay />;
  }

  if (!event) {
    // TODO: 404 page
    console.error("No event found");
    return null;
  }

  const ticketReleases = event.ticket_releases!.filter(
    (ticketRelease) => !ticketReleaseHasClosed(ticketRelease, timestamp)
  );

  return (
    <TesseraWrapper
      loginOptions={{
        showLogin: true,
      }}
    >
      <StandardGrid>
        <Grid xs={16} md={7}>
          <Item>
            <Typography
              level="h1"
              fontFamily={"Josefin sans"}
              fontSize={44}
              fontWeight={700}
              style={{
                color: PALLETTE.cerise_dark,
                overflowWrap: "break-word",
                lineHeight: "1.2",
                width: "90%",
              }}
            >
              {event.name}
            </Typography>

            <Grid container spacing={2} columns={16}>
              <Grid xs={16}>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<LocationOnIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      event.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: PALLETTE.charcoal,
                    }}
                  >
                    {event.location}
                  </a>
                </Typography>
                <Typography
                  level="body-sm"
                  fontFamily={"Josefin sans"}
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<CalendarTodayIcon />}
                  sx={{ mt: 1 }}
                  style={{
                    color: PALLETTE.charcoal,
                  }}
                >
                  {/* Convert from timestamp to string */}
                  {format(
                    new Date(event.date),
                    "EEEE 'the' do 'of' MMMM 'at' HH:mm"
                  )}{" "}
                </Typography>
                <StyledText
                  color={PALLETTE.charcoal}
                  level="body-sm"
                  fontSize={16}
                  fontWeight={600}
                  startDecorator={<GroupsIcon />}
                  sx={{
                    mt: 1,
                  }}
                >
                  {t("event.event_by")} {event.organization?.name}
                </StyledText>
                <Typography
                  level="body-md"
                  style={{
                    color: PALLETTE.charcoal,
                    height: "fit-content",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    wordBreak: "break-word", // To ensure long words do not cause layout issues
                  }}
                >
                  <ReactMarkdown>{event.description}</ReactMarkdown>
                </Typography>

                <Box>
                  <StyledText
                    color={PALLETTE.charcoal_see_through}
                    level="body-sm"
                    fontSize={16}
                    fontWeight={600}
                    style={{
                      width: "75%",
                      margin: "2rem 0",
                    }}
                  >
                    <Trans
                      i18nKey="event.contact_organizers"
                      values={{ organization: event.organization?.name }}
                    >
                      Contact the organizers at <strong>hi</strong>
                      <Link
                        href={`/contact?organization_id=${event.organization?.id}`}
                      >
                        here
                      </Link>
                    </Trans>
                  </StyledText>
                </Box>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid xs={16} md={9} mt={1}>
          <Item>
            <ShowEventsTicketReleases
              ticketReleases={ticketReleases}
              event={event}
            />
          </Item>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box>
            <PromoCodeForm onSubmit={submitPromoCode} />
          </Box>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EventDetail;
