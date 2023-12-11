import { Box, Grid, Stack } from "@mui/joy";
import StandardGrid from "../wrappers/standard_grid";
import Title from "../text/title";
import StyledText from "../text/styled_text";
import StyledButton from "../buttons/styled_button";
import PALLETTE from "../../theme/pallette";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventFullWorkflowRequest,
  previousStep,
} from "../../redux/features/eventCreationSlice";
import LoadingOverlay from "../Loading";
import RestartEventCreationButton from "../buttons/restart_event_creation_button";

interface CreateEventLastStepProps {
  submit: () => void;
}

const CreateEventLastStep: React.FC<CreateEventLastStepProps> = ({
  submit,
}) => {
  const { loading } = useSelector((state: RootState) => state.eventCreation);
  const dispatch: AppDispatch = useDispatch();

  return (
    <StandardGrid>
      {loading && <LoadingOverlay />}
      <Grid xs={8}>
        <Title>Thats it!</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            You have now successfully filled out all the details for your event.
            Click the button below to create your event. You can also go back
            and edit your event by clicking the back button. But you can also
            edit your event later in the edit event page.
          </StyledText>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <StyledButton
              size="lg"
              color={PALLETTE.charcoa}
              bgColor={PALLETTE.cerise}
              onClick={submit}
            >
              Create Event
            </StyledButton>
            <StyledButton
              size="lg"
              color="primary"
              onClick={() => {
                dispatch(previousStep());
              }}
            >
              Back
            </StyledButton>
            <RestartEventCreationButton />
          </Stack>
        </Box>
      </Grid>
    </StandardGrid>
  );
};

export default CreateEventLastStep;
