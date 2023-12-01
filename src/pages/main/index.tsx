import React, { useEffect } from "react";
import PALLETTE from "../../theme/pallette";
import { Box, Typography } from "@mui/joy";
import Navigation from "../../components/navigation";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { getEventsRequest } from "../../redux/features/eventsSlice";
import EventList from "../../components/events/list";

const MainPage: React.FC = () => {
  const { loading, error, events } = useSelector(
    (state: RootState) => state.events
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("get events");
    dispatch(getEventsRequest());
  }, []);

  if (loading || error) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Box
        sx={{ width: "100vw", height: "100vh" }}
        style={{
          backgroundColor: PALLETTE.offWhite,
        }}
      >
        <Box sx={{ padding: "16px 32px" }}>
          <EventList events={events} />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
