import { Box, Grid } from "@mui/joy";
import StandardGrid from "../../wrappers/standard_grid";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import BorderBox from "../../wrappers/border_box";
import CreateTicketReleaseForm from "../ticket_release_form";
import { useState } from "react";
import { ITicketReleaseForm } from "../../../types";
import Title from "../../text/title";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { previousStep } from "../../../redux/features/eventCreationSlice";

const CreateTicketReleases: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <StandardGrid>
      <Grid xs={8}>
        <Title>Create Ticket Releases</Title>
        <Box>
          <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
            Moving on to the ticket releases. How will you release tickets for
            your event? Do you want to divide tickets into batches? You can also
            create more ticket releases later, in the edit event page.
          </StyledText>
        </Box>
        <Box mt={2}>
          <StyledButton
            size="md"
            color="primary"
            onClick={() => {
              dispatch(previousStep());
            }}
          >
            Back
          </StyledButton>
        </Box>
      </Grid>
      <Grid xs={8}>
        <BorderBox>
          <StyledText level="body-lg" fontSize={24} color={PALLETTE.cerise}>
            Ticket Releases
          </StyledText>
          <StyledText level="body-md" fontSize={16} color={PALLETTE.charcoal}>
            Let's define the details for this ticket release.
          </StyledText>
          <CreateTicketReleaseForm />
        </BorderBox>
      </Grid>
    </StandardGrid>
  );
};

export default CreateTicketReleases;
