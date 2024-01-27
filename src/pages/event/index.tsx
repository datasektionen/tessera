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
import { useTranslation } from "react-i18next";

const EventsPage: React.FC = () => {
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getEventsRequest());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <TesseraWrapper>
        <Box sx={{ padding: "16px 32px" }}>
          <Title>{t("event.list_title")}</Title>
        </Box>

        <Box sx={{ padding: "16px 32px" }}>
          <EventList events={events} />{" "}
        </Box>
      </TesseraWrapper>
    </>
  );
};

export default EventsPage;
