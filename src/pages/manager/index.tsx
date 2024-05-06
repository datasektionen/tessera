import { useSelector } from "react-redux";
import DrawerBoxWrapper from "../../components/wrappers/manager_wrapper";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNetworkEventsRequest } from "../../redux/features/manager/listNetworkEventsSlice";
import EventCard from "../../components/events/event_card";
import { compareAsc } from "date-fns";
import { IEvent } from "../../types";
import { eventIsInThePast } from "../../utils/date_conversions";
import { Grid } from "@mui/joy";
import Title from "../../components/text/title";
import { getNetworkRequest } from "../../redux/features/manager/networkSlice";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import { useTranslation } from "react-i18next";
import { useNetworkDetails } from "../../hooks/manager/network_details_hook";
import LoadingOverlay from "../../components/Loading";

const ManagerPage: React.FC = () => {
  const { events: networkEvents, error } = useSelector(
    (state: RootState) => state.networkEvents
  );

  const { network, loading } = useNetworkDetails();

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getNetworkEventsRequest());
  }, []);

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper showManagerDashboard={true}>
        {error && <div>{error}</div>}
        {loading && <LoadingOverlay />}
        <Title
          fontSize={38}
          style={{
            textTransform: "capitalize",
          }}
        >
          {(network?.name ?? "") +
            (network?.name?.charAt(network?.name.length - 1) === "s"
              ? "'"
              : "'s")}{" "}
          Events
        </Title>
        {networkEvents.length === 0 && (
          <StyledText fontSize={24} color={PALLETTE.charcoal} level="h4">
            No events found
          </StyledText>
        )}
        <Grid container spacing={2}>
          {[...networkEvents]
            .sort((a, b) => {
              return compareAsc(new Date(a.date), new Date(b.date));
            }) // Sorts events from earliest to latest
            .map((event: IEvent, index) => {
              if (eventIsInThePast(event)) {
                return null;
              }

              return (
                <Grid
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  component={"div"}
                  style={{
                    position: "relative",
                  }}
                >
                  <EventCard event={event} isForCustomers={false} />
                </Grid>
              );
            })}
        </Grid>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManagerPage;
