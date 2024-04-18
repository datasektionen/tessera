import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../components/navigation/manage_drawer";
import { Box, Breadcrumbs, Grid, IconButton, Stack } from "@mui/joy";
import { ISendOut } from "../../../types";
import Title from "../../../components/text/title";
import { useTranslation } from "react-i18next";
import BreadCrumbLink from "../../../components/navigation/breadcrumbs/link";
import { ScrollConfig } from "../../../components/constant/scroll_config";
import ListSendOuts from "../../../components/events/send_out/list";
import { useEventSendOuts } from "../../../hooks/use_event_send_outs_hook";
import LoadingOverlay from "../../../components/Loading";
import DetailSendOut from "../../../components/events/send_out/detail";
import { ROUTES, generateRoute } from "../../../routes/def";
import { AddCircleOutline } from "@mui/icons-material";
import PALLETTE from "../../../theme/pallette";

const drawerWidth = 200;

const ListSendOutsPage: React.FC = () => {
  const { eventID } = useParams();
  const [selectedSendOut, setSelectedSendOut] = useState<ISendOut | null>(null);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { sendOuts, loading } = useEventSendOuts(eventID!);

  const handleChangedSelectedSendOut = (sendOut: ISendOut) => {
    setSelectedSendOut(sendOut);
    navigate(
      generateRoute(
        ROUTES.MANAGE_SEND_OUT_LIST + "?send_out_id=" + sendOut.id,
        {
          eventId: eventID!,
        }
      ),
      {
        replace: true,
      }
    );
  };

  //   const {
  //     eventDetail: { event },
  //     eventTickets: { tickets },
  //   } = useEventDetails(parseInt(eventID!));

  return (
    <MUITesseraWrapper>
      <DrawerComponent eventID={eventID!} />

      <Box
        sx={{
          marginLeft: `70px`,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Title fontSize={36}>{t("manage_event.send_out.title")}</Title>

          <IconButton
            onClick={() =>
              navigate(
                generateRoute(ROUTES.MANAGE_SEND_OUT_NEW, {
                  eventId: eventID!,
                })
              )
            }
          >
            <AddCircleOutline
              style={{
                color: PALLETTE.cerise,
                fontSize: "2.5rem",
              }}
            />
          </IconButton>
        </Stack>
        <Breadcrumbs sx={{ p: 0 }}>
          <BreadCrumbLink
            to={`/events/${eventID}/manage`}
            label={t("manage_event.breadcrumbs.manage")}
          />
          <BreadCrumbLink
            to={`/events/${eventID}/send-outs/list`}
            label={t("manage_event.breadcrumbs.send_outs")}
          />
        </Breadcrumbs>
        <Grid container columns={12} spacing={5}>
          <Grid
            xs={3}
            sx={{
              height: "calc(100vh - 64px)",
              ...ScrollConfig,
            }}
          >
            {loading ? (
              <LoadingOverlay />
            ) : (
              <ListSendOuts
                sendOuts={sendOuts}
                selectedSendOut={selectedSendOut}
                setSelectedSendOut={handleChangedSelectedSendOut}
              />
            )}
          </Grid>
          <Grid xs={9}>
            {selectedSendOut && <DetailSendOut sendOut={selectedSendOut} />}
          </Grid>
        </Grid>
      </Box>
    </MUITesseraWrapper>
  );
};
export default ListSendOutsPage;
