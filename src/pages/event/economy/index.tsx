import { Box, Divider, Grid, Link, Stack, Tooltip } from "@mui/joy";
import LoadingOverlay from "../../../components/Loading";
import { getEventRequest } from "../../../redux/features/eventSlice";
import { AppDispatch, RootState } from "../../../store";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCanAccessEvent } from "../../../utils/event_access";
import { useEffect, useState } from "react";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import StandardGrid from "../../../components/wrappers/standard_grid";
import Title from "../../../components/text/title";
import StyledText from "../../../components/text/styled_text";
import BorderBox from "../../../components/wrappers/border_box";
import PALLETTE from "../../../theme/pallette";
import EditEventForm from "../../../components/events/edit/edit_event_form";
import StyledButton from "../../../components/buttons/styled_button";
import salesReportSlice, {
  generateSalesReportRequest,
  getEventSalesReportsRequest,
} from "../../../redux/features/salesReportSlice";
import downloadSalesReport from "../../../redux/sagas/axios_calls/download_sales_report";
import { format } from "date-fns";
import DrawerComponent from "../../../components/navigation/manage_drawer";
import usePinnedDrawer from "../../../hooks/drawer_pinned_hook";

const EventEconomyPage: React.FC = () => {
  const { eventID } = useParams();

  const { event, loading, error } = useSelector(
    (state: RootState) => state.eventDetail
  );
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  const canAccessEvent = useCanAccessEvent(eventID!);

  useEffect(() => {}, [canAccessEvent]);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { eventSalesReports, loading: salesLoading } = useSelector(
    (state: RootState) => state.salesReport
  );
  const { t } = useTranslation();

  const handleGenerateSalesReport = () => {
    dispatch(generateSalesReportRequest(parseInt(eventID!)));
  };

  useEffect(() => {
    if (eventID) {
      dispatch(
        getEventRequest({
          id: parseInt(eventID),
          secretToken: "",
        })
      );
      dispatch(getEventSalesReportsRequest(parseInt(eventID)));
    }
  }, [dispatch]);

  const { marginLeft, isPinned, handlePinned } = usePinnedDrawer("70px");

  if (!event || loading || salesLoading) {
    return <LoadingOverlay />;
  }

  if (canAccess !== null && canAccess === false)
    navigate("/events", { replace: true });

  return (
    <>
      <DrawerComponent eventID={eventID!} handlePinned={handlePinned} />
      <Box
        component="main"
        sx={{
          ml: marginLeft,
          mr: 1.5,
        }}
      >
        <TesseraWrapper>
          <StandardGrid>
            <Grid xs={16}>
              <Box sx={{ padding: "16px 16px" }}>
                <Title>{t("manage_event.economy.title")}</Title>
                <StyledText color={PALLETTE.charcoal} level="body-sm">
                  {t("manage_event.economy.subtitle")}
                </StyledText>
                <StyledButton
                  size="lg"
                  bgColor={PALLETTE.green}
                  onClick={handleGenerateSalesReport}
                  sx={{
                    mt: 2,
                  }}
                >
                  {t("form.generate_sales_report")}
                </StyledButton>
              </Box>
            </Grid>
            <Grid
              xs={16}
              sx={{
                my: 1,
              }}
            >
              {eventSalesReports.length > 0 ? (
                <BorderBox>
                  <Title>{t("manage_event.economy.sales_reports")}</Title>
                  {eventSalesReports.map((report) => {
                    return (
                      <Grid
                        container
                        justifyContent={"space-between"}
                        key={report.id}
                        my={1}
                      >
                        <Grid xs={10}>
                          <Stack key={report.id} spacing={2} direction={"row"}>
                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                            >
                              <b>ID:</b> {report.id}
                            </StyledText>
                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                            >
                              <b>{t("manage_event.economy.total_sales")}:</b>{" "}
                              {report.total_sales}
                            </StyledText>
                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                            >
                              <b>{t("manage_event.economy.tickets_sold")}:</b>{" "}
                              {report.tickets_sold}
                            </StyledText>
                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                            >
                              <b>{t("manage_event.economy.status")}:</b>{" "}
                              {report.status}
                            </StyledText>

                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                              sx={{
                                width: "250px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <b>{t("manage_event.economy.message")}:</b>
                              <Tooltip
                                title={report.message}
                                placement="top-start"
                              >
                                <span style={{ pointerEvents: "auto" }}>
                                  {report.message || " -"}
                                </span>
                              </Tooltip>
                            </StyledText>

                            <StyledText
                              color={PALLETTE.charcoal}
                              level="body-sm"
                            >
                              <b>{t("manage_event.economy.created_at")}:</b>{" "}
                              {format(report.updated_at, "dd/MM/yyyy HH:mm")}
                            </StyledText>
                          </Stack>
                        </Grid>

                        <Grid xs={2}>
                          <StyledButton size="sm">
                            <Link href={report.url} target="_blank">
                              {t("manage_event.economy.download")}
                            </Link>
                          </StyledButton>
                        </Grid>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                    );
                  })}
                </BorderBox>
              ) : (
                <StyledText color={PALLETTE.charcoal} level="body-sm">
                  {t("manage_event.economy.no_reports")}
                </StyledText>
              )}
            </Grid>
          </StandardGrid>
        </TesseraWrapper>
      </Box>
    </>
  );
};

export default EventEconomyPage;
