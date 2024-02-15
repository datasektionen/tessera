import { Box, Grid } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import NavigationBar from "../../components/navigation";
import EventList from "../../components/events/list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import StandardGrid from "../../components/wrappers/standard_grid";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import BorderBox from "../../components/wrappers/border_box";
import EditEventForm from "../../components/events/edit/edit_event_form";
import { getEventRequest } from "../../redux/features/eventSlice";
import { useNavigate, useParams } from "react-router-dom";
import EditTicketReleases from "../../components/events/edit/edit_ticket_releases";
import { Style } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useCanAccessEvent } from "../../utils/event_access";
import EditEventFormFields from "../../components/events/edit/event_form_fields/edit_event_form_fields";

const EditEventPage: React.FC = () => {
  const { eventID } = useParams();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  const canAccessEvent = useCanAccessEvent(eventID!);

  useEffect(() => {}, [canAccessEvent]);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  useEffect(() => {
    if (eventID) {
      dispatch(
        getEventRequest({
          id: parseInt(eventID),
          secretToken: "",
        })
      );
    }
  }, [dispatch]);

  if (!event || loading) {
    return <LoadingOverlay />;
  }

  if (canAccess !== null && canAccess === false)
    navigate("/events", { replace: true });

  return (
    <>
      <TesseraWrapper>
        <StandardGrid>
          <Grid xs={16}>
            <Box sx={{ padding: "16px 16px" }}>
              <Title>{t("manage_event.edit.title")}</Title>
              <StyledText color={PALLETTE.charcoal} level="body-sm">
                {t("manage_event.edit.subtitle")}
              </StyledText>
            </Box>
          </Grid>
          <Grid xs={16}>
            <BorderBox>
              <StyledText
                color={PALLETTE.charcoal}
                level="body-lg"
                fontSize={32}
              >
                {t("manage_event.edit.event_details.title")}
              </StyledText>
              <EditEventForm event={event!} />
            </BorderBox>
            <BorderBox
              style={{
                marginTop: "16px",
              }}
            >
              <StyledText
                color={PALLETTE.charcoal}
                level="body-lg"
                fontSize={32}
              >
                {t("form.event_fields.title")}
              </StyledText>
              <StyledText
                color={PALLETTE.charcoal}
                level="body-sm"
                fontSize={16}
              >
                {t("form.event_fields.subtitle")}
              </StyledText>
              <EditEventFormFields event={event!} />
            </BorderBox>
            <BorderBox
              style={{
                marginTop: "16px",
                marginBottom: "64px",
              }}
            >
              <EditTicketReleases
                event={event!}
                ticket_releases={event!.ticketReleases || []}
              />
            </BorderBox>
          </Grid>
        </StandardGrid>
      </TesseraWrapper>
    </>
  );
};

export default EditEventPage;
