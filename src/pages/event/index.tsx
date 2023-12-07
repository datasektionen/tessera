import { Box } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import NavigationBar from "../../components/navigation";
import EventList from "../../components/events/list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import { getEventsRequest } from "../../redux/features/listEventsSlice";

const EventsPage: React.FC = () => {
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const dispatch: AppDispatch = useDispatch();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getEventsRequest());
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      <TesseraWrapper>
        <Box sx={{ padding: "16px 32px" }}>
          <Title>Events</Title>
        </Box>

        <Box sx={{ padding: "16px 32px" }}>
          <EventList events={events} />{" "}
        </Box>
      </TesseraWrapper>
    </>
  );
};

export default EventsPage;
