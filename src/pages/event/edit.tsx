import { Box, Grid } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import NavigationBar from "../../components/navigation";
import EventList from "../../components/events/list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import StandardGrid from "../../components/wrappers/standard_grid";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import BorderBox from "../../components/wrappers/border_box";
import EditEventForm from "../../components/events/edit/edit_event_form";
import { getEventRequest } from "../../redux/features/eventSlice";
import { useParams } from "react-router-dom";

const EditEventPage: React.FC = () => {
  const { eventID } = useParams();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );

  const dispatch: AppDispatch = useDispatch();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (eventID) {
      dispatch(getEventRequest(parseInt(eventID)));
    }
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <TesseraWrapper>
        <StandardGrid>
          <Grid xs={16}>
            <Box sx={{ padding: "16px 32px" }}>
              <Title>Edit Event</Title>
              <StyledText color={PALLETTE.charcoal} level="body-sm">
                Edit your event details here.
              </StyledText>
            </Box>
          </Grid>
          <Grid xs={16}>
            <BorderBox>
              <EditEventForm event={event!} />
            </BorderBox>
          </Grid>
        </StandardGrid>
      </TesseraWrapper>
    </>
  );
};

export default EditEventPage;
