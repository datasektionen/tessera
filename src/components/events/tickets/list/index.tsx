import { ITicket, IUser } from "../../../../types";
import React from "react";
import LoadingOverlay from "../../../Loading";
import {
  FormControl,
  FormLabel,
  Input,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import { Box } from "@mui/joy";
import {
  GridColDef,
  DataGrid,
  GridRowsProp,
  GridColumnVisibilityModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

import { Cancel, CheckCircle } from "@mui/icons-material";
import { add, compareAsc, format, parse, startOfHour } from "date-fns";
import InformationModal from "../../../modal/information";
import TicketsRowUserInfo from "./tickets_row_user_info";
import CustomToolbar from "./datagrid_utils/toolbar";
import { createFoodPreferenceColumn } from "./datagrid_utils/food_preferences";
import { MUItheme } from "./datagrid_utils/mui_theme";
import { ticketIsEnteredIntoFCFCLottery } from "../../../../utils/event_open_close";
import { DefaultInputStyle } from "../../../forms/input_types";
import styles from "./list.module.css";

interface CustomGridValueFormatterParams extends GridValueFormatterParams {
  // Extend the existing type to include the row property
  row: any; // Consider using a more specific type based on your data structure
}

const MyCustomInputComponent: React.FC<{
  item: any;
  applyValue: (value: any) => void;
}> = ({ item, applyValue }) => {
  const handleInputChange = (event: any) => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <FormControl>
      <FormLabel
        style={{
          fontSize: "0.9em",
        }}
      >
        Filter value
      </FormLabel>
      <Input
        style={{
          height: "35px",
        }}
        value={item.value || ""}
        onChange={handleInputChange}
        placeholder="Filter value"
      />
    </FormControl>
  );
};

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
      field: "type",
      headerName: "Type",
      description: "Determines whether the ticket is a request or a ticket",
      width: 100,
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
      filterOperators: [
        {
          label: "contains",
          value: "contains",
          getApplyFilterFn: (filterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return ({ value }) => {
              // Assuming value is the user object here
              return (
                (value.email &&
                  value.email
                    .toLowerCase()
                    .includes(filterItem.value.toLowerCase())) ||
                (value.ug_kth_id &&
                  value.ug_kth_id
                    .toLowerCase()
                    .includes(filterItem.value.toLowerCase())) ||
                (value.name &&
                  value.name
                    .toLowerCase()
                    .includes(filterItem.value.toLowerCase()))
              );
            };
          },
          InputComponent: MyCustomInputComponent,
        },
        // ... other operators if needed
      ],
    },
    createFoodPreferenceColumn("gluten_intolerant", "Gluten Intolerant"),
    createFoodPreferenceColumn("halal", "Halal"),
    createFoodPreferenceColumn("kosher", "Kosher"),
    createFoodPreferenceColumn("lactose_intolerant", "Lactose Intolerant"),
    createFoodPreferenceColumn("nut_allergy", "Nut Allergy"),
    createFoodPreferenceColumn("shellfish_allergy", "Shellfish Allergy"),
    createFoodPreferenceColumn("vegan", "Vegan"),
    createFoodPreferenceColumn("vegetarian", "Vegetarian"),
    createFoodPreferenceColumn("prefer_meat", "Prefers Meat"),
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
      field: "requseted_at",
      headerName: "Requested At",
      width: 150,
      valueFormatter: (params) => {
        return format(params.value as number, "dd/MM/yyyy HH:mm");
      },
    },
    {
      field: "purchasable_at",
      headerName: "Purchaseable At",
      width: 150,
      renderCell: (params) => {
        if (!params.value) {
          return "N/A";
        }

        let formattedDate: string;
        try {
          formattedDate = format(params.value as Date, "dd/MM/yyyy HH:mm");
        } catch (e) {
          console.error(e);
          formattedDate = "N/A";
        }

        return formattedDate;
      },
    },
    {
      field: "pay_before",
      headerName: "Pay Before",
      width: 150,
      renderCell: (params) => {
        const otherFieldValue = params.row.type;

        if (otherFieldValue === "Ticket" && !params.value) {
          // replace 'someValue' with the value you're checking for
          // do something based on the value in the other field
          return "Event Start";
        } else if (params.value) {
          return format(params.value as Date, "dd/MM/yyyy HH:mm");
        } else {
          return "N/A";
        }
      },
    },
    {
      field: "payed_at",
      headerName: "Payed At",
      width: 150,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const format = "dd/MM/yyyy HH:mm";

        if (cellParams1.value === "N/A") return 1; // sort "N/A" last
        if (cellParams2.value === "N/A") return -1; // sort "N/A" last

        const date1 = parse(cellParams1.value, format, new Date());
        const date2 = parse(cellParams2.value, format, new Date());

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
          console.error("Invalid date format");
          return 0;
        }

        return compareAsc(date1, date2);
      },
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
    {
      field: "deleted_at",
      headerName: "Deleted At",
      width: 150,
      renderCell: (params) => {
        if (params.value === "N/A") {
          return <Cancel color="error" />;
        }

        return params.value;
      },
    },
  ];

  const isTicketRequest = (ticket: ITicket) => {
    return ticket.id === 0;
  };

  React.useEffect(() => {
    const rows = tickets.map((ticket) => {
      const ufp = ticket.user!.food_preferences!;

      let payed_at = "N/A";
      let deleted_at = "N/A";
      try {
        payed_at = ticket.is_paid
          ? ticket.ticket_request?.ticket_type?.price === 0
            ? format(ticket?.created_at as number, "dd/MM/yyyy HH:mm")
            : format(
                ticket?.transaction?.payed_at as number,
                "dd/MM/yyyy HH:mm"
              )
          : "N/A";
      } catch (e) {
        console.error(e);
      }

      try {
        deleted_at = ticket.deleted_at
          ? format(ticket.deleted_at as number, "dd/MM/yyyy HH:mm")
          : ticket.ticket_request?.deleted_at
          ? format(
              ticket.ticket_request?.deleted_at as number,
              "dd/MM/yyyy HH:mm"
            )
          : "N/A";
      } catch (e) {
        console.error(e);
      }

      let payBefore: Date | null = null;
      if (
        ticket.ticket_request?.ticket_release?.pay_within &&
        ticket.purchasable_at !== null
      ) {
        payBefore = startOfHour(
          add(ticket.purchasable_at as Date, {
            hours: ticket.ticket_request?.ticket_release?.pay_within + 1,
          })
        );
      } else if (
        ticket.ticket_request?.ticket_release?.pay_within &&
        ticket.updated_at
      ) {
        // Add pay_within hours to updatedat

        payBefore = startOfHour(
          add(new Date(ticket.updated_at), {
            hours: ticket.ticket_request?.ticket_release?.pay_within + 1,
          })
        );
      }

      const row = {
        id: `${ticket.ticket_request!.id}-${ticket.id}-ticket`,
        ticket_release_id: ticket.ticket_request?.ticket_release?.id,
        ticket_release_name: ticket.ticket_request?.ticket_release?.name,
        type: ticket.ticket_request?.is_handled ? "Ticket" : "Request", // "Request" or "Ticket
        is_reserve: !isTicketRequest(ticket) ? ticket.is_reserve : null,
        is_paid: !isTicketRequest(ticket) ? ticket.is_paid : null,
        ticket: ticket.ticket_request?.ticket_type?.name,
        user: ticket?.user,
        email: ticket?.user?.email,
        payed_at: payed_at,
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
        prefer_meat: ufp.prefer_meat,
        deleted_at,
        pay_before: payBefore,
        purchasable_at: ticket.deleted_at
          ? null
          : ticket.purchasable_at !== null
          ? ticket.purchasable_at
          : ticket.updated_at,
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
      type: true,
      is_reserve: true,
      is_paid: true,
      ticket: true,
      user: true,
      email: false,
      payed_at: true,
      checked_in: false,
      entered_into_lottery: false,
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
      requseted_at: true,
      purchasable_at: true,
      prefer_meat: false,
    });

  if (!tickets || rows.length === 0) {
    return null;
  }

  return (
    <Box>
      <ThemeProvider theme={MUItheme}>
        <DataGrid
          rows={rows}
          rowHeight={32}
          columns={columns}
          pageSizeOptions={[25, 50, 100]}
          slots={{
            toolbar: CustomToolbar,
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          getRowClassName={(params) =>
            params.row.deleted_at !== "N/A" ? styles.rowDeleted : ""
          }
          initialState={{
            sorting: {
              sortModel: [{ field: "requseted_at", sort: "desc" }],
            },
          }}
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
