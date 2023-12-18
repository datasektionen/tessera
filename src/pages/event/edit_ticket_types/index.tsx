import { Box, Grid, Sheet, Stack, Tooltip, styled } from "@mui/joy";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  previousStep,
  setTicketTypes,
} from "../../../redux/features/eventCreationSlice";
import {
  removeTicketType,
  addTicketType,
  setSelectedTicketType,
} from "../../../redux/features/ticketTypeCreationSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ITicketRelease, ITicketType, ITicketTypeForm } from "../../../types";
import { useParams } from "react-router-dom";
import {
  fetchTicketTypesRequest,
  fetchTicketTypesSuccess,
} from "../../../redux/features/ticketTypeSlice";
import PALLETTE from "../../../theme/pallette";
import StandardGrid from "../../../components/wrappers/standard_grid";
import StyledText from "../../../components/text/styled_text";
import StatusIcon from "../../../components/icons/status_icon";
import StyledButton from "../../../components/buttons/styled_button";
import BorderBox from "../../../components/wrappers/border_box";
import EditTicketTypeForm from "../../../components/events/edit/edit_ticket_type_form";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";

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
  const { ticketTypes: fetchedTicketTypes, loading } = useSelector(
    (state: RootState) => state.ticketTypes
  );

  const { ticketTypes, selectedTicketType } = useSelector(
    (state: RootState) => state.ticketTypeCreation
  );

  const dispatch: AppDispatch = useDispatch();

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const someFormsAreInvalid = Object.keys(invalidForms).length > 0;

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
        (ticketType) => {
          return {
            name: ticketType.name,
            description: ticketType.description,
            price: ticketType.price,
            quantity_total: ticketType.quantityTotal,
          };
        }
      );

      dispatch(setTicketTypes(formValues));
    }
  });

  const validateAllForms = async () => {
    let allFormsAreValid = true;

    const invalidForms: {
      [key: number]: string[];
    } = {};

    for (let index = 0; index < ticketTypes.length; index++) {
      try {
        await CreateTicketTypeFormSchema.validate(ticketTypes[index], {
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

  const handleAddTicket = () => {
    console.log("add ticket");
    dispatch(addTicketType());
  };

  const handleSubmission = () => {};

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
              Edit Ticket Releases
            </StyledText>
            <Box mt={2}>
              {ticketTypes?.map((ticketType, index) => {
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
              <Tooltip title="Add Ticket Type" placement="bottom">
                <AddIcon
                  onClick={() => {
                    handleAddTicket();
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
              <StyledButton
                size="lg"
                onClick={handleSubmission}
                color={PALLETTE.charcoal}
                bgColor={PALLETTE.cerise}
                disabled={someFormsAreInvalid}
              >
                Next
              </StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid xs={8}>
          <BorderBox>
            <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
              TicketTypes
            </StyledText>
            <StyledText level="body-md" fontSize={16} color={PALLETTE.charcoal}>
              Let's define the different types of tickets that will be available
              for the previous ticket release.
            </StyledText>
            <EditTicketTypeForm
              ticketTypes={ticketTypes}
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
