import {
  Accordion,
  AccordionGroup,
  AccordionSummary,
  Box,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mui/joy";
import { IEventFormFieldResponse, ITicket } from "../../../../types";
import { AccordionDetails, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MUItheme } from "../list/datagrid_utils/mui_theme";
import CustomToolbar from "../list/datagrid_utils/toolbar";
import React from "react";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";
import PALLETTE from "../../../../theme/pallette";

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
            <StyledText level="body-lg" color={PALLETTE.charcoal} fontSize={24}>
              Grid View
            </StyledText>
          </Tab>
          <Tab>
            <StyledText level="body-lg" color={PALLETTE.charcoal} fontSize={24}>
              Accordion View
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
        <TabPanel value={1}>
          {tickets.map((ticket) => (
            <AccordionGroup key={ticket.id}>
              <Accordion>
                <AccordionSummary>
                  <StyledText
                    level="body-lg"
                    color={PALLETTE.charcoal}
                    fontSize={24}
                  >
                    {ticket.id}
                  </StyledText>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledText level="body-lg" color={PALLETTE.charcoal}>
                    {ticket.user?.username}
                  </StyledText>
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          ))}
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default TicketEventFormResponseTable;
