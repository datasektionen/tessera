import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  CssVarsProvider,
  Grid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mui/joy";
import { IEventFormFieldResponse, ITicket } from "../../../../types";
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MUItheme } from "../list/datagrid_utils/mui_theme";
import CustomToolbar from "../list/datagrid_utils/toolbar";
import React from "react";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";
import PALLETTE from "../../../../theme/pallette";
import theme from "../../../../theme";
import { useTranslation } from "react-i18next";

interface TicketEventFormResponseTableProps {
  tickets: ITicket[];
}

const getEventFormFieldsColumns = (tickets: ITicket[]) => {
  let columns: GridColDef[] = [];

  if (tickets.length === 0) {
    return columns;
  }

  tickets.forEach((ticket) => {
    ticket.ticket_request?.event_form_responses?.forEach(
      (response: IEventFormFieldResponse) => {
        columns.push({
          field: response.event_form_field?.name!,
          headerName: response.event_form_field?.name!,
          width: 150,
          editable: false,
        });
      }
    );
  });

  return columns.filter(
    (column, index, self) =>
      index ===
      self.findIndex(
        (t) => t.field === column.field && t.headerName === column.headerName
      )
  );
};

const getEventFormFieldsRow = (ticket: ITicket) => {
  if (!ticket.id) {
    return {};
  }

  let rows: Record<string, any> = {};

  ticket.ticket_request?.event_form_responses?.forEach(
    (response: IEventFormFieldResponse) => {
      rows[response.event_form_field?.name!] = response.value;
    }
  );

  return rows;
};

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

const TicketEventFormResponseTable: React.FC<
  TicketEventFormResponseTableProps
> = ({ tickets }) => {
  const [rows, setRows] = React.useState<any[]>([]);
  const [view, setView] = React.useState<"grid" | "accordion">("grid"); // Add state variable for view

  const customColumns = getEventFormFieldsColumns(tickets);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Ticket ID",
      width: 100,
      valueFormatter: (params) => {
        return params.value.split("-")[0];
      },
    },
    {
      field: "user",
      headerName: "User",
      width: 100,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        return cellParams1.value.username.localeCompare(
          cellParams2.value.username
        );
      },
      valueFormatter: (params) => {
        return params.value.username;
      },
      valueGetter: (params) => params.value,
      renderCell: (params) => <div>{params.value.username}</div>,
    },
    ...customColumns,
  ];

  const { t } = useTranslation();

  React.useEffect(() => {
    const rows = tickets.map((ticket) => {
      const customRows = getEventFormFieldsRow(ticket || {});
      const row = {
        ...customRows,
        id: ticket.id + "-" + ticket.user?.ug_kth_id,
        user: ticket.user,
      };

      return row;
    });

    setRows(rows);
  }, [tickets]);

  if (tickets.length === 0) {
    return null;
  }

  return (
    <Box sx={{}}>
      <Tabs
        defaultValue={0}
        sx={{
          backgroundColor: "transparent",
        }}
      >
        <TabList>
          <Tab>
            <StyledText
              level="body-lg"
              color={PALLETTE.cerise_dark}
              fontSize={22}
            >
              {t("manage_event.form_field_responses.table_view")}
            </StyledText>
          </Tab>
          <Tab>
            <StyledText
              level="body-lg"
              color={PALLETTE.cerise_dark}
              fontSize={22}
            >
              {t("manage_event.form_field_responses.list_view")}
            </StyledText>
          </Tab>
        </TabList>
        {/* Add button to toggle view */}
        <TabPanel value={0}>
          <ThemeProvider theme={MUItheme}>
            <DataGrid
              rows={rows}
              rowHeight={32}
              columns={columns}
              slots={{
                toolbar: CustomToolbar,
              }}
            />
          </ThemeProvider>
        </TabPanel>
        <CssVarsProvider theme={theme}>
          <TabPanel value={1}>
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
          </TabPanel>
        </CssVarsProvider>
      </Tabs>
    </Box>
  );
};

export default TicketEventFormResponseTable;
