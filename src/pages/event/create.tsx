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
import { resetCurrentStep } from "../../redux/features/eventCreationSlice";
import CreateTicketReleaseForm from "../../components/events/ticket_release_form";
import StyledButton from "../../components/buttons/styled_button";
import CreateTicketReleases from "../../components/events/ticket_release/create_ticket_releases";

const CreateEventPage = () => {
  const { currentStep } = useSelector(
    (state: RootState) => state.eventCreation
  );

  // Only run when the component mounts
  useEffect(() => {
    return () => {
      // Clear the form when the component unmounts
      dispatch(resetCurrentStep());
    };
  }, []);

  const dispatch: AppDispatch = useDispatch();

  return (
    <TesseraWrapper>
      <Box sx={{ padding: "16px 32px" }}>
        {currentStep == 1 && (
          <StandardGrid>
            <Grid xs={8}>
              <Title>Create Event</Title>
              <Box>
                <StyledText
                  level="body-md"
                  fontSize={18}
                  color={PALLETTE.charcoal}
                >
                  Create an event to manage ticket releases, attendees, and
                  more. An event consists of many parts, but tessera aims to
                  make it as easy as possible. We will walk you through the
                  process step by step.
                </StyledText>
              </Box>
            </Grid>

            <Grid xs={8}>
              <BorderBox>
                <StyledText
                  level="body-lg"
                  fontSize={24}
                  color={PALLETTE.cerise}
                >
                  Event Details
                </StyledText>
                <StyledText
                  level="body-md"
                  fontSize={16}
                  color={PALLETTE.charcoal}
                >
                  Let's start with the basics. What are the details of your
                  event?
                </StyledText>
                <CreateEventForm />
              </BorderBox>
            </Grid>
          </StandardGrid>
        )}
        {currentStep === 2 && <CreateTicketReleases />}
      </Box>
    </TesseraWrapper>
  );
};

export default CreateEventPage;
