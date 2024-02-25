import { Box } from "@mui/joy";
import { IEventFormFieldResponse, ITicket } from "../../../../types";
import { ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MUItheme } from "../list/datagrid_utils/mui_theme";
import CustomToolbar from "../list/datagrid_utils/toolbar";
import React from "react";
import StyledText from "../../../text/styled_text";
import { format } from "date-fns";

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

  const customColumns = getEventFormFieldsColumns(tickets);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Ticket ID",
      width: 100,
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
        id: ticket.id,
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
    </Box>
  );
};

export default TicketEventFormResponseTable;
