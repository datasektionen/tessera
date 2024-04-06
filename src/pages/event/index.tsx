import { Box, IconButton, Stack } from "@mui/joy";
import TesseraWrapper from "../../components/wrappers/page_wrapper";
import Title from "../../components/text/title";
import NavigationBar from "../../components/navigation";
import EventList from "../../components/events/list";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoadingOverlay from "../../components/Loading";
import { getEventsRequest } from "../../redux/features/listEventsSlice";
import { useTranslation } from "react-i18next";
import { throttle } from "lodash";
import { useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PALLETTE from "../../theme/pallette";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/def";

const EventsPage: React.FC = () => {
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getEventsRequest());
    // No dependencies should be needed here as we only want to dispatch once on mount
  }, [dispatch]);

  return (
    <TesseraWrapper>
      {loading && <LoadingOverlay />}
      <Box pl={4} pt={2}>
        <Stack direction="row" spacing={2}>
          <Title>{t("event.list_title")}</Title>
          <IconButton onClick={() => navigate(ROUTES.CREATE_EVENT)}>
            <AddCircleOutlineIcon
              style={{
                color: PALLETTE.cerise,
                fontSize: "2.5rem",
              }}
            />
          </IconButton>
        </Stack>
      </Box>

      <Box mx={4} pt={2}>
        <EventList events={events} />{" "}
      </Box>
    </TesseraWrapper>
  );
};

export default EventsPage;
