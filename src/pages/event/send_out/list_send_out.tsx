import { useEffect, useState } from "react";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch } from "react-redux";
import ListEventTicketReleases from "../../../components/events/ticket_release/list";
import { useSelector } from "react-redux";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer";
import { Box, Breadcrumbs, Grid } from "@mui/joy";
import { useEventDetails } from "../../../hooks/use_event_details_hook";
import { ITicket, ITicketRelease } from "../../../types";
import TicketReleaseRowView from "../../../components/events/ticket_release/list/ticket_release_row_view";
import PALLETTE from "../../../theme/pallette";
import Title from "../../../components/text/title";
import { useTranslation } from "react-i18next";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import { ScrollConfig } from "../../../components/constant/scroll_config";

const drawerWidth = 200;

const ListSendOutsPage: React.FC = () => {
  const { eventID } = useParams();
  const navigate = useNavigate();
  const [selectedTicketRelease, setSelectedTicketRelease] =
    useState<ITicketRelease | null>(null);
  const [groupedTickets, setGroupedTickets] = useState<
    Record<string, ITicket[]>
  >({});
  const { t } = useTranslation();

  const {
    eventDetail: { event },
    eventTickets: { tickets },
  } = useEventDetails(parseInt(eventID!));

  return (
    <MUITesseraWrapper>
      <DrawerComponent eventID={eventID!} />

      <Box
        sx={{
          marginLeft: `70px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Title fontSize={36}>{t("manage_event.ticket_releases.title")}</Title>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink to={`/events/${eventID}/manage`} label="Manage" />
          <BreadCrumbLink
            to={`/events/${eventID}/send-outs/list`}
            label="Send Outs"
          />
        </Breadcrumbs>
        <Grid container columns={12} spacing={5} sx={{ mt: 1 }}>
          <Grid
            xs={2}
            sx={{
              height: "calc(100vh - 64px)",
              ...ScrollConfig,
            }}
          ></Grid>
          <Grid xs={10}></Grid>
        </Grid>
      </Box>
    </MUITesseraWrapper>
  );
};
export default ListSendOutsPage;
