import { Box, Grid, IconButton, Sheet, Stack } from "@mui/joy";
import StandardGrid from "../../wrappers/standard_grid";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import BorderBox from "../../wrappers/border_box";
import { useEffect, useState } from "react";
import {
  ITicketRelease,
  ITicketReleaseForm,
  TicketReleaseFormInitialValues,
} from "../../../types";
import Title from "../../text/title";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { previousStep } from "../../../redux/features/eventCreationSlice";
import RestartEventCreationButton from "../../buttons/restart_event_creation_button";
import CreateTicketReleaseForm from "../ticket_release/ticket_release_form";
import { useNavigate, useParams } from "react-router-dom";
import { FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { useFeatureLimitAccess } from "../../../hooks/manager/required_feature_access_hook";
import axios, { AxiosResponse } from "axios";
import ApiRoutes from "../../../routes/backend_routes";
import { fetchApi, putApi } from "../../../utils/api/fetch_api";
import { addHours, addWeeks, format } from "date-fns";
import { use } from "i18next";
import ClearIcon from "@mui/icons-material/Clear";
import { ApiRounded } from "@mui/icons-material";
import { paymentDurationToString } from "../../../utils/date_conversions";

interface EditEventAddTicketReleaseProps {
  eventId: number;
  submit: (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => void;
  initialValues: ITicketReleaseForm;
  createOnSubmit?: boolean;
}

const fetchTemplateTicketReleases = async () => {
  // /templates/ticket-releases/
  try {
    const response = await fetchApi<{
      ticket_releases: ITicketRelease[];
    }>(
      ApiRoutes.generateRoute(ApiRoutes.TEMPLATE_TICKET_RELEASES, {}),
      true,
      true
    );

    return response.data.ticket_releases;
  } catch (error) {
    console.error("Error:", error);
  }
};

const unsaveTemplateTicketRelease = async (id: number) => {
  // /templates/ticket-releases/:ticketReleaseID/unsave
  try {
    const url = ApiRoutes.generateRoute(
      ApiRoutes.TEMPLATE_TICKET_RELEASE_UNSAVE,
      {
        ticketReleaseID: id,
      }
    );
    const response = await putApi<{
      ticket_release: ITicketRelease;
    }>(url, {}, true, true);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const EditEventAddTicketRelease: React.FC<EditEventAddTicketReleaseProps> = ({
  eventId,
  submit,
  initialValues,
  createOnSubmit = false,
}) => {
  const { eventID } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [useInitialValues, setUseInitialValues] =
    useState<ITicketReleaseForm>(initialValues);
  const [useTemplate, setUseTemplate] = useState<boolean>(false);

  const [templates, setTemplates] = useState<ITicketRelease[]>([]);

  const { canUseFeature } = useFeatureLimitAccess(
    "max_ticket_releases_per_event",
    eventID!
  );

  useEffect(() => {
    const fetchTemplateTicketReleasesData = async () => {
      const ticket_releases = await fetchTemplateTicketReleases();

      if (!ticket_releases) return;

      setTemplates(ticket_releases);
    };
    fetchTemplateTicketReleasesData();
  }, []);

  const { t } = useTranslation();

  const setTemplate = (template: ITicketRelease) => {
    // Set the template values to the form

    setUseInitialValues({
      event_date: useInitialValues.event_date,
      name: template.name,
      description: template.description,
      open: format(template.open, "yyyy-MM-dd'T'HH:mm:ss"),
      close: format(template.close, "yyyy-MM-dd'T'HH:mm:ss"),
      ticket_release_method_id:
        //@ts-ignore
        template.ticket_release_method_detail.ticket_release_method_id,
      open_window_duration:
        //@ts-ignore
        template.ticket_release_method_detail.open_window_duration || 0,
      //@ts-ignore
      method_description:
        //@ts-ignore
        template.ticket_release_method_detail.method_description,
      max_tickets_per_user:
        //@ts-ignore
        template.ticket_release_method_detail.max_tickets_per_user,
      notification_method:
        //@ts-ignore
        template.ticket_release_method_detail.notification_method,
      cancellation_policy:
        //@ts-ignore
        template.ticket_release_method_detail.cancellation_policy,
      is_reserved: template.is_reserved!,
      promo_code: template.promo_code,
      tickets_available: template.tickets_available,
      is_saved: false,
      save_template: false,
      payment_deadline: format(
        new Date(template.payment_deadline.original_deadline),
        "yyyy-MM-dd"
      ),
      reserve_payment_duration: paymentDurationToString(
        template.payment_deadline.reserve_payment_duration
      ),
      allocation_cut_off: format(
        new Date(template.allocation_cut_off),
        "yyyy-MM-dd"
      ),
    });
    setUseTemplate(true);
  };

  const handleUnsaveTemplate = async (id: number) => {
    const data = await unsaveTemplateTicketRelease(id);
    setTemplates((prev) => {
      return prev.filter((template) => template.id !== id);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StandardGrid>
      <Grid xs={8}>
        <Title>{t("manage_event.edit.ticket_releases.add")}</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            {t("manage_event.edit.ticket_releases.add_subtitle")}
          </StyledText>
          <StyledText
            level="body-md"
            fontSize={18}
            color={PALLETTE.charcoal}
            fontWeight={600}
            sx={{
              textWrap: "balance",
            }}
          >
            {canUseFeature === false &&
              t("features.limit_description", {
                feature: "max_ticket_releases_per_event",
              })}
          </StyledText>
        </Box>
        {/* Teamplates */}
        {canUseFeature === true && (
          <Box mt={3}>
            <StyledText
              level="body-lg"
              fontSize={24}
              color={PALLETTE.charcoal}
              fontWeight={700}
            >
              {t("templates.title")}
            </StyledText>
            <StyledText
              level="body-md"
              fontSize={16}
              color={PALLETTE.charcoal}
              sx={{
                textWrap: "balance",
                mb: 2,
              }}
            >
              {t("templates.ticket_releases.description")}
            </StyledText>

            {templates.length === 0 && (
              <StyledText
                level="body-md"
                fontSize={18}
                color={PALLETTE.charcoal_see_through}
                sx={{
                  textWrap: "balance",
                  mb: 2,
                }}
              >
                {t("templates.ticket_releases.no_templates")}
              </StyledText>
            )}

            {templates.map((template) => {
              return (
                <Sheet
                  key={template.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                    marginBottom: "16px",
                    border: "1px solid #E0E0E0",
                    borderRadius: "4px",
                    maxWidth: "400px",
                  }}
                >
                  <IconButton
                    onClick={() => handleUnsaveTemplate(template.id)}
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                  <StyledButton
                    size="sm"
                    bgColor={PALLETTE.cerise}
                    color={PALLETTE.charcoal}
                    sx={{
                      width: "fit-content",
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                    }}
                    onClick={() => setTemplate(template)}
                  >
                    Use
                  </StyledButton>
                  <StyledText
                    level="body-lg"
                    fontSize={20}
                    color={PALLETTE.cerise_dark}
                    fontWeight={600}
                  >
                    {template.name}
                  </StyledText>
                  <StyledText
                    level="body-sm"
                    fontSize={16}
                    color={PALLETTE.charcoal}
                  >
                    <span>{template.description.slice(0, 26)}...</span> <br />
                    <span>
                      {format(template.open, "dd/MM/yyyy HH:mm")} -{" "}
                      {format(template.close, "dd/MM/yyyy HH:mm")}
                      <br />
                    </span>
                    <span>
                      {
                        // @ts-ignore
                        template.ticket_release_method_detail
                          .ticket_release_method.name
                      }
                    </span>
                    <br />
                    <span>{template.tickets_available}</span>
                  </StyledText>
                </Sheet>
              );
            })}
          </Box>
        )}
      </Grid>
      <Grid xs={8}>
        {canUseFeature === true && (
          <BorderBox>
            <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
              {t("create_event.ticket_release")}
            </StyledText>
            <CreateTicketReleaseForm
              submit={submit}
              initialValues={useInitialValues}
              createOnSubmit={createOnSubmit}
              fromTemplate={useTemplate}
            />
          </BorderBox>
        )}
      </Grid>
    </StandardGrid>
  );
};

export default EditEventAddTicketRelease;
