import { useParams } from "react-router-dom";

import { Box, Breadcrumbs } from "@mui/joy";

import DrawerComponent from "../../../../components/navigation/manage_drawer/event_detail";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import StyledText from "../../../../components/text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useTranslation } from "react-i18next";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import EditEventForm from "../../../../components/events/edit/edit_event_form";
import Title from "../../../../components/text/title";
import BreadCrumbLink from "../../../../components/navigation/breadcrumbs/link";
import { generateRoute, ROUTES } from "../../../../routes/def";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";

const EditEventPage: React.FC = () => {
  const { eventID } = useParams();

  const {
    eventDetail: { event },
  } = useEventDetails(parseInt(eventID!));

  const { t } = useTranslation();

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
            to={generateRoute(ROUTES.EDIT_EVENT, {
              eventId: eventID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.event")
            }
          />
        </Breadcrumbs>
        <Box sx={{ padding: "16px 32px" }}>
          <StyledText color={PALLETTE.charcoal} level="body-lg" fontSize={32}>
            {t("manage_event.edit.event_details.title")}
          </StyledText>
          <EditEventForm event={event!} />
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default EditEventPage;
