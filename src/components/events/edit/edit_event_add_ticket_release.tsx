import { Box, Grid, Stack } from "@mui/joy";
import StandardGrid from "../../wrappers/standard_grid";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import BorderBox from "../../wrappers/border_box";
import { useState } from "react";
import {
  ITicketReleaseForm,
  TicketReleaseFormInitialValues,
} from "../../../types";
import Title from "../../text/title";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { previousStep } from "../../../redux/features/eventCreationSlice";
import RestartEventCreationButton from "../../buttons/restart_event_creation_button";
import CreateTicketReleaseForm from "../ticket_release/ticket_release_form";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";

interface EditEventAddTicketReleaseProps {
  eventId: number;
  submit: (
    values: ITicketReleaseForm,
    { validateForm }: FormikHelpers<ITicketReleaseForm>
  ) => void;
  initialValues: ITicketReleaseForm;
  createOnSubmit?: boolean;
}

const EditEventAddTicketRelease: React.FC<EditEventAddTicketReleaseProps> = ({
  eventId,
  submit,
  initialValues,
  createOnSubmit = false,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StandardGrid>
      <Grid xs={8}>
        <Title>Add Ticket Releases</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Lets add another ticket release. First we need to define the details
            for this ticket release.
          </StyledText>
        </Box>
        <Stack mt={2} spacing={2} direction="row">
          <StyledButton
            size="md"
            color="primary"
            onClick={() => {
              navigate(`/events/${eventId}/edit`);
            }}
          >
            Back
          </StyledButton>
        </Stack>
      </Grid>
      <Grid xs={8}>
        <BorderBox>
          <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
            Ticket Release
          </StyledText>
          <CreateTicketReleaseForm
            submit={submit}
            initialValues={initialValues}
            createOnSubmit={createOnSubmit}
          />
        </BorderBox>
      </Grid>
    </StandardGrid>
  );
};

export default EditEventAddTicketRelease;
