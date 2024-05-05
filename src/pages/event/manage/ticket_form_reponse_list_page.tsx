import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  CssVarsProvider,
  Grid,
  Stack,
  Tooltip,
} from "@mui/joy";
import React from "react";
import StyledText from "../../../components/text/styled_text";
import PALLETTE from "../../../theme/pallette";
import theme from "../../../theme";
import { useTranslation } from "react-i18next";
import DrawerComponent from "../../../components/navigation/manage_drawer/event_detail";
import { useParams } from "react-router-dom";
import Title from "../../../components/text/title";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { ITicket } from "../../../types";
import { useEventDetails } from "../../../hooks/use_event_details_hook";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";
import LoadingOverlay from "../../../components/Loading";
import DrawerBoxWrapper from "../../../components/wrappers/manager_wrapper";

const getAccordionDetails = (ticket: ITicket) => {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ flexGrow: 1 }}
      style={{
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      {ticket.ticket_request?.event_form_responses?.map((response, index) => {
        return (
          <Grid xs={12} sm={6} md={6} lg={4} key={response.id}>
            <StyledText
              level="body-lg"
              color={PALLETTE.charcoal}
              fontSize={20}
              fontWeight={700}
            >
              {index + 1}. {response.event_form_field?.name}
              {response.event_form_field?.is_required ? "*" : ""}{" "}
              <StyledText
                level="body-sm"
                color={PALLETTE.charcoal_see_through}
                fontSize={16}
                fontWeight={400}
              >
                {response.event_form_field!.type!}
              </StyledText>
            </StyledText>
            <StyledText level="body-lg" color={PALLETTE.charcoal} fontSize={18}>
              {response.value}
            </StyledText>
          </Grid>
        );
      })}
    </Grid>
  );
};

const ManageEventFormResponsesPage: React.FC = () => {
  const { eventID } = useParams();
  const { t } = useTranslation();

  const {
    eventTickets: { tickets, loading },
  } = useEventDetails(parseInt(eventID!));

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <MUITesseraWrapper>
      <DrawerBoxWrapper eventID={eventID!}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Title fontSize={22} color={PALLETTE.charcoal}>
            {t("manage_event.manage_tickets_custom_event_form")}
          </Title>
          <Tooltip
            title={t("tooltips.manage_tickets_custom_event_form_description")}
            sx={{
              maxWidth: "300px",
            }}
          >
            <HelpOutlineIcon fontSize="inherit" sx={{ marginLeft: 2 }} />
          </Tooltip>
        </Stack>
        {/* Add button to toggle view */}
        <CssVarsProvider theme={theme}>
          <AccordionGroup size="sm">
            {tickets.map((ticket) => (
              <Accordion key={ticket.id}>
                <AccordionSummary>
                  <StyledText
                    level="body-lg"
                    color={PALLETTE.charcoal}
                    fontSize={18}
                    fontWeight={700}
                  >
                    {ticket.user?.first_name +
                      " " +
                      ticket.user?.last_name +
                      " - " +
                      ticket.id}
                  </StyledText>
                </AccordionSummary>
                <AccordionDetails>
                  {getAccordionDetails(ticket)}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        </CssVarsProvider>
      </DrawerBoxWrapper>
    </MUITesseraWrapper>
  );
};

export default ManageEventFormResponsesPage;
