import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { ITicket } from "../../../../types";
import React from "react";
import LoadingOverlay from "../../../Loading";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { ThemeProvider, createTheme } from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import { Sheet, Tab, TabList, Table, Tabs } from "@mui/joy";

interface EventTicketsListProps {
  tickets: ITicket[];
}

const columns = [
  { field: "type", headerName: "Type", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
  { field: "username", headerName: "User", width: 150 },
];

const EventTicketsList: React.FC<EventTicketsListProps> = ({ tickets }) => {
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    setRows(
      tickets.map((ticket) => ({
        name: ticket.ticket_request?.ticket_type?.name,
        description: ticket.ticket_request?.ticket_type?.description,
        type: ticket.ticket_request?.ticket_type?.id,
        username: ticket?.user?.username,
      }))
    );
  }, [tickets]);

  if (!tickets) {
    return <LoadingOverlay />;
  }

  // console.log(rows);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Sheet>
        <Table
          color="neutral"
          variant="soft"
          stickyHeader
          stripe="odd"
          borderAxis="both"
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th>{column.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr>
                {columns.map((column) => (
                  <td>{row[column.field]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
};

export default EventTicketsList;
