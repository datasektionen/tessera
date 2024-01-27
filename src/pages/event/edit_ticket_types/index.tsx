import { Box, Grid, Sheet, Stack, Tooltip, styled } from "@mui/joy";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { previousStep } from "../../../redux/features/eventCreationSlice";
import {
  removeTicketType,
  addTicketType,
  setSelectedTicketType,
  setTicketTypes,
} from "../../../redux/features/ticketTypeCreationSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ITicketRelease, ITicketType, ITicketTypeForm } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
  resetUpdateSuccess,
  updateTicketTypesRequest,
} from "../../../redux/features/ticketTypeSlice";
import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import StatusIcon from "../../../components/icons/status_icon";
import StyledButton from "../../../components/buttons/styled_button";
import BorderBox from "../../../components/wrappers/border_box";
import EditTicketTypeForm from "../../../components/events/edit/edit_ticket_type_form";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import LoadingOverlay from "../../../components/Loading";
import { is } from "date-fns/locale";
import { toast } from "react-toastify";

const StyledBorderBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: PALLETTE.cerise,
  padding: theme.spacing(1),
  textAlign: "center",
  transition: "all 0.2s ease-in-out",
  position: "relative",
  marginTop: theme.spacing(1),
  minHeight: "48px",

  borderStyle: "solid",
  borderColor: PALLETTE.cerise,
  borderWidth: "2px",

  "&:hover": {
    borderColor: PALLETTE.charcoal,
    transition: "all 0.2s ease-in-out",
  },
}));

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

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const someFormsAreInvalid = Object.keys(invalidForms).length > 0;

  useEffect(() => {
    if (updateSuccess) {
      console.log("success");
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
          } as ITicketTypeForm;
        }
      );

      setIsInitialized(true);
      dispatch(setTicketTypes(formValues));
    }
  }, [dispatch, fetchedTicketTypes]);

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
        console.log(err.inner.map((error: any) => error.message));
        allFormsAreValid = false;
      }
    }

    setInvalidForms(invalidForms);
  };

  const handleSubmission = async () => {
    await validateAllForms();

    if (someFormsAreInvalid) toast.error("Please fix the errors in the form.");

    dispatch(
      updateTicketTypesRequest({
        eventId: parseInt(eventID!),
        ticketReleaseId: parseInt(ticketReleaseID!),
        ticketTypes: formTicketTypes,
      })
    );
  };
  if (loading || loading2 || !isInitialized)
    return (
      <TesseraWrapper>
        <LoadingOverlay />
      </TesseraWrapper>
    );

  return (
    <TesseraWrapper>
      <StandardGrid>
        <Grid xs={8}>
          <Box mt={2}>
            <StyledText
              color={PALLETTE.charcoal}
              level="body-lg"
              fontSize={32}
              style={{ marginBottom: "16px" }}
            >
              Edit Tickets
            </StyledText>
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
                      <RemoveCircleOutlineIcon
                        onClick={() => {
                          dispatch(removeTicketType(index));
                        }}
                        style={{
                          color: PALLETTE.red,
                          fontSize: "30px",
                          // svg shadow
                          filter:
                            "drop-shadow( 0px 0px 2px rgba(200, 0, 0, .7))",
                        }}
                      />
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
              <StyledButton
                size="sm"
                color={PALLETTE.charcoal}
                onClick={() => {
                  dispatch(addTicketType());
                }}
                style={{
                  width: "200px",
                }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Tooltip title="Add Ticket Type" placement="bottom">
                    <AddIcon
                      style={{
                        color: PALLETTE.charcoal,
                        fontSize: "40px",
                        // svg shadow
                        filter: "drop-shadow( 0px 0px 2px rgba(200, 0, 0, .7))",
                      }}
                    />
                  </Tooltip>
                </Grid>
              </StyledButton>
            </Box>
            <Box mt={2}>
              <Grid container justifyContent="flex-start" spacing={2}>
                <Grid>
                  <StyledButton
                    size="lg"
                    onClick={async () => {
                      handleSubmission();
                    }}
                    color={PALLETTE.charcoal}
                    bgColor={PALLETTE.green}
                    disabled={someFormsAreInvalid}
                  >
                    Save
                  </StyledButton>
                </Grid>
                <Grid>
                  <StyledButton
                    size="lg"
                    color={PALLETTE.charcoal}
                    bgColor={PALLETTE.offWhite}
                    onClick={() => {
                      navigate(`/events/${eventID}/edit`);
                    }}
                  >
                    Cancel
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid xs={8}>
          <BorderBox>
            <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
              Ticket details
            </StyledText>
            <StyledText level="body-md" fontSize={16} color={PALLETTE.charcoal}>
              Modify the details of your ticket types and then click "Save".
            </StyledText>
            <EditTicketTypeForm
              ticketTypes={formTicketTypes}
              selectedTicketType={selectedTicketType}
              validateAllForms={validateAllForms}
            />
          </BorderBox>
        </Grid>
      </StandardGrid>
    </TesseraWrapper>
  );
};

export default EditTicketTypes;
