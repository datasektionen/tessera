import { Box, Grid } from "@mui/joy";
import Title from "../../components/text/title";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import StandardGrid from "../../components/wrappers/standard_grid";
import BorderBox from "../../components/wrappers/border_box";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import CreateEventForm from "../../components/events/create_event_form";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createEventFullWorkflowRequest,
  previousStep,
  resetCurrentStep,
  resetSuccess,
  setLoading,
  setTicketReleaseForm,
  setTicketTypes,
} from "../../redux/features/eventCreationSlice";
import CreateTicketReleases from "../../components/events/ticket_release/create_ticket_releases";
import CreateTicketTypes from "../../components/events/ticket_types/create_ticket_types";
import CreateEventLastStep from "../../components/events/create_event_last_step";
import { useNavigate } from "react-router-dom";
import { resetTicketTypes } from "../../redux/features/ticketTypeCreationSlice";
import RestartEventCreationButton from "../../components/buttons/restart_event_creation_button";
import { ITicketReleaseForm, ITicketTypeForm } from "../../types";
import { FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFeatureLimitAccess } from "../../hooks/manager/required_feature_access_hook";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import ManagerDashboardDrawerComponent from "../../components/navigation/manage_drawer/manager_dashboard";
import DrawerBoxWrapper from "../../components/wrappers/manager_wrapper";
import { ROUTES } from "../../routes/def";
import { useNetworkDetails } from "../../hooks/manager/network_details_hook";

const CreateEventPage = () => {
  const { currentStep, form, success } = useSelector(
    (state: RootState) => state.eventCreation
  );
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { canUseFeature } = useFeatureLimitAccess("max_events");
  const {network} = useNetworkDetails();

  // Only run when the component mounts
  useEffect(() => {
    if (success) {
      dispatch(resetTicketTypes());
      dispatch(resetCurrentStep());
      navigate(ROUTES.MANAGER_DASHBOARD);
    }
    dispatch(resetSuccess());
  }, [dispatch, navigate, success]);

  useEffect(() => {
    if (currentStep < 1 || currentStep > 4) {
      dispatch(resetCurrentStep());
    }
    window.scrollTo(0, 0);
  }, [currentStep, dispatch]);

  const submitEventFullWorkflow = () => {
    dispatch(createEventFullWorkflowRequest(form));
  };

  const handleTicketReleaseSubmit = async (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length === 0) {
      // The form is valid
      dispatch(setTicketReleaseForm(values));
    } else {
      // The form is invalid
      toast.error("Please fix the errors in the form.");
    }
  };

  useEffect(() => {
    if (currentStep === 4) {
      dispatch(setLoading(false));
    }
  }, []);

  const canCreateEvent = currentUser?.organizations?.length! > 0;

  const handleTTsSubmit = (ticketTypes: ITicketTypeForm[]) => {
    dispatch(setTicketTypes(ticketTypes));
  };

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper showManagerDashboard={true}>
        <Box sx={{ mt: 2 }}>
          {currentStep === 1 && (
            <StandardGrid
              overrideStyle={{
                marginLeft: 0,
              }}
            >
              <Grid xs={6}>
                <Title>{t("create_event.title")}</Title>
                <Box>
                  <StyledText
                    level="body-md"
                    fontSize={18}
                    color={PALLETTE.charcoal}
                  >
                    {t("create_event.create_event_description")}
                  </StyledText>
                  {!canCreateEvent && (
                    <StyledText
                      level="body-md"
                      fontSize={18}
                      color={PALLETTE.orange}
                      fontWeight={700}
                    >
                      {t("create_event.no_teams")}
                    </StyledText>
                  )}
                  {canUseFeature === false && (
                    <StyledText
                      level="body-md"
                      fontSize={18}
                      color={PALLETTE.orange}
                      fontWeight={700}
                    >
                      {t("features.limit_description", {
                        feature: "max_events",
                      })}
                    </StyledText>
                  )}
                </Box>
                <Box mt={2}>
                  {canCreateEvent && canUseFeature && (
                    <RestartEventCreationButton />
                  )}
                </Box>
              </Grid>
              {canCreateEvent && canUseFeature && (
                <Grid xs={10}>
                  <BorderBox>
                    <StyledText
                      level="body-lg"
                      fontSize={24}
                      color={PALLETTE.cerise_dark}
                    >
                      {t("create_event.event_details_title")}
                    </StyledText>
                    <StyledText
                      level="body-md"
                      fontSize={16}
                      color={PALLETTE.charcoal}
                    >
                      {t("create_event.event_details_description")}
                    </StyledText>
                    <CreateEventForm />
                  </BorderBox>
                </Grid>
              )}
            </StandardGrid>
          )}

          {currentStep === 2 && canCreateEvent && (
            <CreateTicketReleases submit={handleTicketReleaseSubmit} />
          )}
          {currentStep === 3 && canCreateEvent && (
            <CreateTicketTypes
              submit={handleTTsSubmit}
              handleBack={() => {
                dispatch(previousStep());
              }}
            />
          )}
          {currentStep === 4 && canCreateEvent && (
            <CreateEventLastStep submit={submitEventFullWorkflow} />
          )}
        </Box>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default CreateEventPage;
