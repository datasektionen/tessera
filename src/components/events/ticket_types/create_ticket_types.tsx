import { Box, Grid, Sheet, Stack, Tooltip, styled } from "@mui/joy";
import StandardGrid from "../../wrappers/standard_grid";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import BorderBox from "../../wrappers/border_box";
import { useState } from "react";
import Title from "../../text/title";
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
import CreateTicketTypeForm from "./create_ticket_type_form";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketTypeFormSchema from "../../../validation/create_ticket_type_form";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StatusIcon from "../../icons/status_icon";
import RestartEventCreationButton from "../../buttons/restart_event_creation_button";
import { ITicketTypeForm } from "../../../types";

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

interface CreateTicketTypesProps {
  submit: (tts: ITicketTypeForm[]) => void;
  handleBack: () => void;
}

const CreateTicketTypes: React.FC<CreateTicketTypesProps> = ({
  submit,
  handleBack,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { selectedTicketType, ticketTypes, loading, error } = useSelector(
    (state: RootState) => state.ticketTypeCreation
  );

  const [invalidForms, setInvalidForms] = useState<{
    [key: number]: string[];
  }>({});

  const someFormsAreInvalid = Object.keys(invalidForms).length > 0;

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

  const handleAddTicket = async () => {
    await validateAllForms();
    dispatch(addTicketType());
  };

  const handleSubmission = () => {
    submit(ticketTypes);
  };

  return (
    <StandardGrid>
      <Grid xs={8}>
        <Title>Create Tickets</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Next step... Tickets. Here you will define the different types of
            tickets that will be available for your event under the previous
            ticket release. Each ticket release can have multiple ticket types.
            You can also create more ticket types later, in the edit event page.
          </StyledText>
        </Box>
        <Stack mt={2} spacing={2} direction="row">
          <StyledButton
            size="md"
            color="primary"
            onClick={() => {
              handleBack();
            }}
          >
            Back
          </StyledButton>
          <RestartEventCreationButton />
        </Stack>
        <Box mt={2}>
          <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
            Ticket Types
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
                      index == selectedTicketType
                        ? PALLETTE.offWhite
                        : PALLETTE.cerise,
                    backgroundColor:
                      index == selectedTicketType
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
                        filter: "drop-shadow( 0px 0px 2px rgba(200, 0, 0, .7))",
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
                onClick={handleAddTicket}
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
          <CreateTicketTypeForm
            ticketTypes={ticketTypes}
            selectedTicketType={selectedTicketType}
            validateAllForms={validateAllForms}
          />
        </BorderBox>
      </Grid>
    </StandardGrid>
  );
};

export default CreateTicketTypes;
