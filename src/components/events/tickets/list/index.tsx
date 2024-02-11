import { ITicket, IUser } from "../../../../types";
import React from "react";
import LoadingOverlay from "../../../Loading";
import { ThemeProvider, createTheme } from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import { Box } from "@mui/joy";
import {
  GridColDef,
  DataGrid,
  GridRowsProp,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { format } from "date-fns";
import InformationModal from "../../../modal/information";
import TicketsRowUserInfo from "./tickets_row_user_info";
import CustomToolbar from "./datagrid_utils/toolbar";
import { createFoodPreferenceColumn } from "./datagrid_utils/food_preferences";
import { MUItheme } from "./datagrid_utils/mui_theme";
import { ticketIsEnteredIntoFCFCLottery } from "../../../../utils/event_open_close";

const EventTicketsList: React.FC<{
  tickets: ITicket[];
}> = ({ tickets }) => {
  const [rows, setRows] = React.useState<GridRowsProp>([]);

  const columns: GridColDef[] = [
    {
      field: "ticket_release_id",
      headerName: "Ticket Release ID",
      width: 150,
    },
    {
      field: "ticket_release_name",
      headerName: "Ticket Release",
      width: 150,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        return cellParams1.value.localeCompare(cellParams2.value);
      },
    },
    {
      field: "is_allocated",
      headerName: "Allocated",
      description:
        "A false value would indicate that the ticket is still a ticket request.",
      width: 100,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        if (cellParams1.value === null) return 1;
        if (cellParams2.value === null) return -1;
        return cellParams2.value - cellParams1.value;
      },
      renderCell: (params) =>
        params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        ),
    },
    {
      field: "is_reserve",
      headerName: "Reserve",
      width: 75,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        if (cellParams1.value === null) return 1;
        if (cellParams2.value === null) return -1;
        return cellParams2.value - cellParams1.value;
      },
      renderCell: (params) => {
        if (params.value === null) {
          return "N/A";
        }
        return params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        );
      },
    },
    {
      field: "is_paid",
      headerName: "Paid",
      width: 75,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        if (cellParams1.value === null) return 1;
        if (cellParams2.value === null) return -1;
        return cellParams2.value - cellParams1.value;
      },
      renderCell: (params) => {
        if (params.value === null) {
          return "N/A";
        }
        return params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        );
      },
    },
    { field: "ticket", headerName: "Ticket", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 60,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        return cellParams1.value - cellParams2.value;
      },
      renderCell: (params) => `${params.value} :-`,
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
      renderCell: (params) => (
        <div
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => handleOpenModal(params)}
        >
          {params.value.username}
        </div>
      ),
    },
    {
      field: "payed_at",
      headerName: "Payed At",
      width: 150,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const date1 = new Date(cellParams1.value);
        const date2 = new Date(cellParams2.value);
        return date1.getTime() - date2.getTime();
      },
    },
    createFoodPreferenceColumn("gluten_intolerant", "Gluten Intolerant"),
    createFoodPreferenceColumn("halal", "Halal"),
    createFoodPreferenceColumn("kosher", "Kosher"),
    createFoodPreferenceColumn("lactose_intolerant", "Lactose Intolerant"),
    createFoodPreferenceColumn("nut_allergy", "Nut Allergy"),
    createFoodPreferenceColumn("shellfish_allergy", "Shellfish Allergy"),
    createFoodPreferenceColumn("vegan", "Vegan"),
    createFoodPreferenceColumn("vegetarian", "Vegetarian"),
    {
      field: "additional_info",
      headerName: "Additional Info",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "checked_in",
      headerName: "Checked In",
      width: 100,
      renderCell: (params) =>
        params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        ),
    },
    {
      field: "requseted_at",
      headerName: "Requested At",
      width: 150,
      valueFormatter: (params) => {
        return format(params.value as number, "dd/MM/yyyy HH:mm");
      },
    },
    {
      field: "entered_into_lottery",
      headerName: "Entered Into Lottery",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        ),
    },
  ];

  const isTicketRequest = (ticket: ITicket) => {
    return ticket.id === 0;
  };

  React.useEffect(() => {
    const rows = tickets.map((ticket) => {
      const ufp = ticket.user!.food_preferences!;

      const row = {
        id: `${ticket.ticket_request!.id}-${ticket.id}-ticket`,
        ticket_release_id: ticket.ticket_request?.ticket_release?.id,
        ticket_release_name: ticket.ticket_request?.ticket_release?.name,
        is_allocated:
          ticket.ticket_request?.ticket_release?.has_allocated_tickets!,
        is_reserve: !isTicketRequest(ticket) ? ticket.is_reserve : null,
        is_paid: !isTicketRequest(ticket) ? ticket.is_paid : null,
        ticket: ticket.ticket_request?.ticket_type?.name,
        user: ticket?.user,
        email: ticket?.user?.email,
        payed_at: ticket?.is_paid
          ? ticket.ticket_request?.ticket_type?.price === 0
            ? format(ticket?.created_at as number, "dd/MM/yyyy HH:mm")
            : format(
                ticket?.transaction?.payed_at as number,
                "dd/MM/yyyy HH:mm"
              )
          : "N/A",
        price: ticket?.ticket_request?.ticket_type?.price,
        gluten_intolerant: ufp.gluten_intolerant,
        halal: ufp.halal,
        kosher: ufp.kosher,
        lactose_intolerant: ufp.lactose_intolerant,
        nut_allergy: ufp.nut_allergy,
        shellfish_allergy: ufp.shellfish_allergy,
        vegan: ufp.vegan,
        vegetarian: ufp.vegetarian,
        additional_info: ufp.additional,
        checked_in: ticket.checked_in,
        requseted_at: ticket?.ticket_request?.created_at,
        entered_into_lottery: ticketIsEnteredIntoFCFCLottery(
          ticket,
          ticket.ticket_request?.ticket_release!
        ),
      };

      return row;
    });

    setRows(rows);
  }, [tickets]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);

  const handleOpenModal = (params: any) => {
    setSelectedUser(params.row.user); // Assuming the row contains user info
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      ticket_release_id: false,
      ticket_release_name: true,
      is_allocated: true,
      is_reserve: true,
      is_paid: true,
      ticket: true,
      user: true,
      email: false,
      payed_at: true,
      price: true,
      // Hide all the food preferences
      gluten_intolerant: false,
      halal: false,
      kosher: false,
      lactose_intolerant: false,
      nut_allergy: false,
      shellfish_allergy: false,
      vegan: false,
      vegetarian: false,
      additional_info: false,
      checked_in: true,
      requseted_at: true,
    });

  if (!tickets || rows.length === 0) {
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
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
      </ThemeProvider>
      {selectedUser && (
        <InformationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="User Information"
          width="50%"
        >
          <TicketsRowUserInfo user={selectedUser} />
        </InformationModal>
      )}
    </Box>
  );
};

export default EventTicketsList;
