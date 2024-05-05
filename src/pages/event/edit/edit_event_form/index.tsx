import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { useParams } from "react-router-dom";

import { Box, Breadcrumbs, Divider } from "@mui/joy";

import { getEventRequest } from "../../../../redux/features/eventSlice";
import DrawerComponent from "../../../../components/navigation/manage_drawer/event_detail";
import { useEventDetails } from "../../../../hooks/use_event_details_hook";
import StyledText from "../../../../components/text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useTranslation } from "react-i18next";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import EditEventFormFields from "../../../../components/events/edit/event_form_fields/edit_event_form_fields";
import LoadingOverlay from "../../../../components/Loading";
import Title from "../../../../components/text/title";
import BreadCrumbLink from "../../../../components/navigation/breadcrumbs/link";
import { generateRoute, ROUTES } from "../../../../routes/def";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";

const EditEventFormPage: React.FC = () => {
  const { eventID } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const {
    eventDetail: { event, loading },
  } = useEventDetails(parseInt(eventID!));

  const { t } = useTranslation();

  const reFetchEvent = () => {
    dispatch(
      getEventRequest({
        id: parseInt(eventID!),
        secretToken: "",
      })
    );
  };

  if (!event || loading) {
    return <LoadingOverlay />;
  }

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Title fontSize={36}>{t("form.event_fields.title")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.EDIT_EVENT_FORM, {
              eventId: eventID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.form")
            }
          />
        </Breadcrumbs>
        <StyledText color={PALLETTE.charcoal} level="body-sm" fontSize={18}>
          {t("form.event_fields.subtitle")}
        </StyledText>
        <Box sx={{ padding: "16px 32px" }}>
          <Divider sx={{ my: 1 }} />
          <EditEventFormFields event={event!} refetchEvent={reFetchEvent} />
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default EditEventFormPage;
