import { Box, Breadcrumbs, FormControl, FormHelperText, FormLabel, Stack, Switch } from "@mui/joy";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import Title from "../../../../components/text/title";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadCrumbLink from "../../../../components/navigation/breadcrumbs/link";
import { ROUTES, generateRoute } from "../../../../routes/def";
import StyledText from "../../../../components/text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ApiRoutes from "../../../../routes/backend_routes";
import { IEventLandingPage } from "../../../../types";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import { toast } from "react-toastify";
import LoadingOverlay from "../../../../components/Loading";
import StyledButton from "../../../../components/buttons/styled_button";

// PUT /events/:eventID/landing-page/set-enabled 
async function setEnabled(eventID: string, enabled: boolean) {
  console.log('eventID:', eventID);
  try {
    const response = await axios.put(ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_LANDING_PAGE_SET_ENABLED, {
      eventID,
    }), { enabled }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    toast.success('Updated!');

  } catch (error) {
    console.error('Error:', error);
  }
}

// GET /events/:eventID/landing-page

const EditLandingPageSettingsPage: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { eventID } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventDetail: { event, loading } } = useEventDetails(parseInt(eventID!));


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setEnabled(eventID!, event.target.checked);
  }

  useEffect(() => {
    if (event?.landing_page) {
      console.log()
      setChecked(event?.landing_page.enabled);
    }
  }, [event?.landing_page]);



  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        {loading && <LoadingOverlay />}
        <Title>
          {t('manage_event.edit.landing_page.title')}
        </Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID!}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.EDIT_EVENT_LANDING_PAGE_SETTINGS, {
              eventId: eventID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.landing_page")
            }
          />
        </Breadcrumbs>
        <Box sx={{ mt: 1 }}>
          <StyledText
            color={PALLETTE.charcoal}
            level="body-sm"
          >
            {t('manage_event.edit.landing_page.description')}
          </StyledText>
          <Box mt={2}>
            <FormControl
              orientation="horizontal"
              sx={{ width: 400, justifyContent: 'space-between' }}
            >
              <div>
                <FormLabel>
                  <StyledText
                    color={PALLETTE.charcoal}
                    level="body-sm"
                    fontWeight={600}
                    fontSize={18}
                  >
                    {t('manage_event.edit.landing_page.enable')}
                  </StyledText>
                </FormLabel>
                <FormHelperText sx={{ mt: 0 }}>You can edit the landing page before enabling it.</FormHelperText>
              </div>
              <Switch
                checked={checked}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                color={checked ? 'success' : 'neutral'}
                variant={checked ? 'solid' : 'outlined'}
                endDecorator={checked ? t('manage_event.edit.landing_page.enabled') : t('manage_event.edit.landing_page.disabled')}
                slotProps={{
                  endDecorator: {
                    sx: {
                      minWidth: 24,
                    },
                  },
                }}
                sx={{
                  '--Switch-thumbSize': '20px',
                  '--Switch-trackWidth': '44px',
                  '--Switch-trackHeight': '24px',
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Box mt={2}>
          <StyledText
            color={PALLETTE.charcoal}
            level="h3"
            fontSize={24}
            fontWeight={600}
          >
            {t('manage_event.edit.landing_page.editor_title')}
          </StyledText>
          <StyledText
            color={PALLETTE.charcoal}
            level="body-sm"
            sx={{
              textWrap: "balance"
            }}
          >
            {t('manage_event.edit.landing_page.editor_description')}
          </StyledText>
          <StyledButton
            size="md"
            bgColor={PALLETTE.cerise}
            sx={{ mt: 2 }}
            onClick={() => navigate(generateRoute(
              ROUTES.EDIT_EVENT_LANDING_PAGE_EDTIOR, {
              eventId: eventID!,
            }))}
          >
            {t('manage_event.edit.landing_page.editor_button')}
          </StyledButton>
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper >
  );
}

export default EditLandingPageSettingsPage;