import { GridColDef } from "@mui/x-data-grid";
import { IEventFormFieldResponse, ITicket } from "../../../../types";

export const getEventFormFieldsColumns = (tickets: ITicket[]) => {
  let columns: GridColDef[] = [];

  if (tickets.length === 0) {
    return columns;
  }

  tickets.forEach((ticket) => {
    ticket.ticket_request?.event_form_responses?.forEach(
      (response: IEventFormFieldResponse) => {
        columns.push({
          field: "event_form-" + response.event_form_field?.name!,
          headerName: "Event Form: " + response.event_form_field?.name!,
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

export const getEventFormFieldsRow = (ticket: ITicket) => {
  if (!ticket.id) {
    return {};
  }

  let rows: Record<string, any> = {};

  ticket.ticket_request?.event_form_responses?.forEach(
    (response: IEventFormFieldResponse) => {
      rows["event_form-" + response.event_form_field?.name!] = response.value;
    }
  );

  return rows;
};
