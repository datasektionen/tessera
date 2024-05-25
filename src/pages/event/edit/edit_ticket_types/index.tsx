import {
  Box,
  Breadcrumbs,
  Grid,
  Sheet,
  Stack,
  Tooltip,
  styled,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { previousStep } from "../../../../redux/features/eventCreationSlice";
import {
  removeTicketType,
  addTicketType,
  setSelectedTicketType,
  setTicketTypes,
  addTicketTypeWithValues,
} from "../../../../redux/features/ticketTypeCreationSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketTypeFormSchema from "../../../../validation/event/create_ticket_type_form";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  ITicketRelease,
  ITicketType,
  ITicketTypeForm,
} from "../../../../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  resetUpdateSuccess,
  updateTicketTypesRequest,
} from "../../../../redux/features/ticketTypeSlice";
import PALLETTE from "../../../../theme/pallette";
import StandardGrid from "../../../../components/wrappers/standard_grid";
import StyledText from "../../../../components/text/styled_text";
import StatusIcon from "../../../../components/icons/status_icon";
import StyledButton from "../../../../components/buttons/styled_button";
import BorderBox from "../../../../components/wrappers/border_box";
import EditTicketTypeForm from "../../../../components/events/edit/edit_ticket_type_form";
import TesseraWrapper from "../../../../components/wrappers/page_wrapper";
import LoadingOverlay from "../../../../components/Loading";
import { is } from "date-fns/locale";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { RemoveTTButton } from "../../../../components/events/ticket_types/remove_ticket_type_button";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../../components/navigation/manage_drawer/event_detail";
import Title from "../../../../components/text/title";
import BreadCrumbLink from "../../../../components/navigation/breadcrumbs/link";
import { generateRoute, ROUTES } from "../../../../routes/def";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import DrawerBoxWrapper from "../../../../components/wrappers/manager_wrapper";
import StyledBorderBox from "../../../../components/wrappers/styled_border_box";
import {
  fetchTemplateTicketTypes,
  unsaveTemplateTicketTypes,
} from "../../../../utils/manager/templates";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

const EditTicketTypes: React.FC = () => {
  const { eventID, ticketReleaseID } = useParams();
  const navigate = useNavigate();
  const {
    ticketTypes: fetchedTicketTypes,
    loading,
    updateSuccess,
  } = useSelector((state: RootState) => state.ticketTypes);

  const {
    ticketTypes: formTicketTypes,
    selectedTicketType,
    loading: loading2,
  } = useSelector((state: RootState) => state.ticketTypeCreation);

  const {
    eventDetail: { event },
  } = useEventDetails(parseInt(eventID!));

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const someFormsAreInvalid = Object.keys(invalidForms).length > 0;
  const { t } = useTranslation();
  const [templates, setTemplates] = useState<ITicketType[]>([]);

  const handleUnsaveTemplate = async (id: number) => {
    const data = await unsaveTemplateTicketTypes(id);
    setTemplates((prev) => {
      return prev.filter((template) => template.id !== id);
    });
  };

  useEffect(() => {
    const fetchTemplateTicketTypesData = async () => {
      const data = await fetchTemplateTicketTypes();

      console.log("data", data);

      if (!data) return;

      setTemplates(data!.ticket_types);
    };
    fetchTemplateTicketTypesData();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      // navigate(-1);
      setTimeout(() => {
        toast.success("Ticket batches updated successfully.");
      }, 500);
      navigate(
        generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASES, {
          eventId: eventID,
          ticketReleaseId: ticketReleaseID,
        })
      );
      dispatch(resetUpdateSuccess());
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (eventID && ticketReleaseID) {
      const intEventID = parseInt(eventID);
      const intTicketReleaseID = parseInt(ticketReleaseID);

      dispatch(
        fetchTicketTypesRequest({
          eventId: intEventID,
          ticketReleaseId: intTicketReleaseID,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (fetchedTicketTypes) {
      const formValues: ITicketTypeForm[] = fetchedTicketTypes.map(
        (ticketType: any) => {
          return {
            id: ticketType.id,
            name: ticketType.name,
            description: ticketType.description,
            price: ticketType.price,
            save_template: ticketType.save_template,
          } as ITicketTypeForm;
        }
      );

      setIsInitialized(true);
      dispatch(setTicketTypes(formValues));
    }
  }, [dispatch, fetchedTicketTypes]);

  const setTemplate = (template: ITicketType) => {
    dispatch(
      addTicketTypeWithValues({
        name: template.name,
        description: template.description,
        price: template.price,
        save_template: false,
      })
    );
  };

  const validateAllForms = async () => {
    let allFormsAreValid = true;

    const invalidForms: {
      [key: number]: string[];
    } = {};

    for (let index = 0; index < formTicketTypes.length; index++) {
      try {
        await CreateTicketTypeFormSchema.validate(formTicketTypes[index], {
          abortEarly: false,
        });
      } catch (err: any) {
        invalidForms[index] = err.inner.map((error: any) => error.path);
        allFormsAreValid = false;
      }
    }

    setInvalidForms(invalidForms);
  };

  const handleSubmission = async () => {
    await validateAllForms();

    if (someFormsAreInvalid) toast.error("Please fix the errors in the form.");

    console.log("formTicketTypes", formTicketTypes);

    dispatch(
      updateTicketTypesRequest({
        eventId: parseInt(eventID!),
        ticketReleaseId: parseInt(ticketReleaseID!),
        ticketTypes: formTicketTypes,
      })
    );
  };

  const ticketRelease = event?.ticketReleases?.find(
    (tr: ITicketRelease) => tr.id === parseInt(ticketReleaseID!)
  );

  if (loading || loading2 || !isInitialized)
    return (
      <TesseraWrapper>
        <LoadingOverlay />
      </TesseraWrapper>
    );

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Title fontSize={36}>{t("manage_event.edit.ticket_types.title")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASES, {
              eventId: eventID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.ticket_releases")
            }
          />
          <BreadCrumbLink
            to={`/events/${eventID}/edit/ticket-releases?ticket_release_id=${ticketRelease?.id}`}
            label={ticketRelease?.name!}
          />
          <BreadCrumbLink
            to={generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASE_TICKET_TYPES, {
              eventId: eventID!,
              ticketReleaseId: ticketReleaseID!,
            })}
            label={
              t("manage_event.breadcrumbs.edit") +
              " " +
              t("manage_event.breadcrumbs.ticket_types")
            }
          />
        </Breadcrumbs>
        <StandardGrid>
          <Grid xs={8}>
            <Box mt={2}>
              <Box mt={2}>
                {formTicketTypes?.map((ticketType, index) => {
                  const isInvalid = invalidForms[index]?.length > 0;

                  return (
                    <StyledBorderBox
                      key={index}
                      onClick={() => {
                        dispatch(setSelectedTicketType(index));
                      }}
                      style={{
                        color:
                          index === selectedTicketType
                            ? PALLETTE.offWhite
                            : PALLETTE.cerise,
                        backgroundColor:
                          index === selectedTicketType
                            ? PALLETTE.cerise
                            : PALLETTE.offWhite,
                      }}
                    >
                      <StatusIcon isValid={!isInvalid} />
                      <StyledText
                        level="body-lg"
                        fontSize={32}
                        fontWeight={700}
                        color={
                          index == selectedTicketType
                            ? PALLETTE.charcoal
                            : PALLETTE.cerise
                        }
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {ticketType.name}
                      </StyledText>
                      <Box
                        style={{
                          position: "absolute",
                          left: "-40px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <RemoveTTButton index={index} />
                      </Box>
                    </StyledBorderBox>
                  );
                })}
              </Box>
              <Box
                mt={1}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Tooltip title={t("tooltips.add_ticket_type")}>
                  <AddIcon
                    onClick={() => {
                      dispatch(addTicketType());
                    }}
                    style={{
                      color: PALLETTE.cerise,
                      fontSize: "40px",
                      // svg shadow
                      filter: "drop-shadow( 0px 0px 2px rgba(200, 0, 0, .7))",
                    }}
                  />
                </Tooltip>
              </Box>
              <Box mt={2}>
                <Grid container justifyContent="flex-start" spacing={2}>
                  <Grid>
                    <StyledButton
                      size="lg"
                      color={PALLETTE.charcoal}
                      bgColor={PALLETTE.offWhite}
                      onClick={() => {
                        // Go back
                        navigate(-1);
                      }}
                    >
                      {t("form.button_back")}
                    </StyledButton>
                  </Grid>
                  <Grid>
                    <StyledButton
                      size="lg"
                      onClick={async () => {
                        handleSubmission();
                      }}
                      sx={{
                        width: 150,
                      }}
                      color={PALLETTE.charcoal}
                      bgColor={PALLETTE.green}
                      disabled={someFormsAreInvalid}
                    >
                      {t("form.button_save")}
                    </StyledButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
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
                {t("templates.ticket_types.description")}
              </StyledText>

              {templates && templates.length === 0 && (
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.charcoal_see_through}
                  sx={{
                    textWrap: "balance",
                    mb: 2,
                  }}
                >
                  {t("templates.ticket_types.no_templates")}
                </StyledText>
              )}

              {templates?.map((template) => {
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
                        top: "0",
                        right: "4px",
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
                        bottom: "4px",
                        right: "4px",
                      }}
                      onClick={() => {
                        setTemplate(template);
                      }}
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
                      <span>{template.price}</span> <br />
                    </StyledText>
                  </Sheet>
                );
              })}
            </Box>
          </Grid>
          <Grid xs={8}>
            <BorderBox>
              <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
                {t("manage_event.edit.ticket_types.ticket_details")}
              </StyledText>
              <StyledText
                level="body-md"
                fontSize={16}
                color={PALLETTE.charcoal}
              >
                {t("manage_event.edit.ticket_types.ticket_details_helperText")}
              </StyledText>
              <EditTicketTypeForm
                ticketTypes={formTicketTypes}
                selectedTicketType={selectedTicketType}
                validateAllForms={validateAllForms}
              />
            </BorderBox>
          </Grid>
        </StandardGrid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default EditTicketTypes;
