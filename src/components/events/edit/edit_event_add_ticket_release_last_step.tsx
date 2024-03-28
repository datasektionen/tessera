import { Box, Grid, Stack } from "@mui/joy";

import { useDispatch, useSelector } from "react-redux";
import StandardGrid from "../../wrappers/standard_grid";
import LoadingOverlay from "../../Loading";
import { AppDispatch, RootState } from "../../../store";
import Title from "../../text/title";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import RestartEventCreationButton from "../../buttons/restart_event_creation_button";
import { previousStep } from "../../../redux/features/eventCreationSlice";

interface EditEventAddTicketReleaseLastStepProps {
  submit: () => void;
  handleBack: () => void;
}

const EditEventAddTicketReleaseLastStep: React.FC<
  EditEventAddTicketReleaseLastStepProps
> = ({ submit, handleBack }) => {
  const { loading } = useSelector((state: RootState) => state.eventCreation);
  const dispatch: AppDispatch = useDispatch();

  return (
    <StandardGrid>
      {loading && <LoadingOverlay />}
      <Grid xs={8}>
        <Title>That's it!</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            You've now filled in all the details for your new ticket release.
            Please go back and review your ticket release details before
            submitting.
          </StyledText>
        </Box>
        <Box mt={2}>
          <Stack direction="row" spacing={2}>
            <StyledButton
              size="lg"
              color={PALLETTE.charcoal}
              bgColor={PALLETTE.cerise}
              onClick={submit}
            >
              Create Ticket Release
            </StyledButton>
            <StyledButton size="lg" color="primary" onClick={handleBack}>
              Back
            </StyledButton>
          </Stack>
        </Box>
      </Grid>
    </StandardGrid>
  );
};

export default EditEventAddTicketReleaseLastStep;
