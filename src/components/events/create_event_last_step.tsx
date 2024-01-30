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
import { useTranslation } from "react-i18next";

interface CreateEventLastStepProps {
  submit: () => void;
}

const CreateEventLastStep: React.FC<CreateEventLastStepProps> = ({
  submit,
}) => {
  const { t } = useTranslation();
  const { loading } = useSelector((state: RootState) => state.eventCreation);
  const dispatch: AppDispatch = useDispatch();

  return (
    <StandardGrid>
      {loading && <LoadingOverlay />}
      <Grid xs={8}>
        <Title>{t("create_event.finish_title")}</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            {t("create_event.finish_description")}
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
              {t("form.button_create_event")}
            </StyledButton>
            <StyledButton
              size="lg"
              color="primary"
              onClick={() => {
                dispatch(previousStep());
              }}
            >
              {t("form.button_back")}
            </StyledButton>
            <RestartEventCreationButton />
          </Stack>
        </Box>
      </Grid>
    </StandardGrid>
  );
};

export default CreateEventLastStep;
