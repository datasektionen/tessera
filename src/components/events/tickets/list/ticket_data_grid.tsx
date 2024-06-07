import React, { useEffect, useMemo, useState } from "react";
import LoadingOverlay from "../../../Loading";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  ThemeProvider,
  Typography,
} from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import { Box } from "@mui/joy";
import {
  GridColDef,
  DataGrid,
  GridRowsProp,
  GridColumnVisibilityModel,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { add, compareAsc, format, parse } from "date-fns";
import InformationModal from "../../../modal/information";
import TicketsRowUserInfo from "./tickets_row_user_info";
import CustomToolbar from "./datagrid_utils/toolbar";
import { createFoodPreferenceColumn } from "./datagrid_utils/food_preferences";
import { MUItheme } from "./datagrid_utils/mui_theme";
import { ticketIsEnteredIntoFCFSLottery } from "../../../../utils/event_open_close";
import { DefaultInputStyle } from "../../../forms/input_types";
import styles from "./list.module.css";
import AddonModalView from "./addon_modal_view";
import StyledButton from "../../../buttons/styled_button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEventFormFieldsColumns,
  getEventFormFieldsRow,
} from "../ticket_form_response/ticket_form_reponse_helpers";
import Fuse from "fuse.js";
import InfoIcon from "@mui/icons-material/Info";
import StyledText from "../../../text/styled_text";
import Cookies from "js-cookie";
import { ITicket, IUser } from "../../../../types";
import ClearIcon from "@mui/icons-material/Clear";
import {
  green,
  red,
  orange,
  blue,
  purple,
  yellow,
  teal,
  grey,
  pink,
  cyan,
} from "@mui/material/colors";
import ApiRoutes from "../../../../routes/backend_routes";
import { putApi } from "../../../../utils/api/api";
import { toast } from "react-toastify";

const isTicketRequest = (ticket: ITicket) => {
  return ticket.id === 0;
};

enum TicketStatus {
  PENDING = "Pending",
  CANCELLED_TICKET = "Cancelled Ticket",
  CANCELLED_REQUEST = "Cancelled Request",
  REFUNDED = "Refunded",
  CHECKED_IN = "Checked In",
  PAID = "Paid",
  RESERVED = "Reserved",
  PURCHASEABLE = "Ready for Purchase",
  EXPIRED = "Expired",
  LOTTERY_ENTERED = "Lottery Entered",
  HANDLED = "Handled",
}

function getTicketStatus(ticket: ITicket) {
  let payBefore: Date | null = null;
  if (ticket.payment_deadline.Valid) {
    payBefore = new Date(ticket.payment_deadline.Time);
  }

  let status = TicketStatus.PENDING;
  if (ticket.ticket_order?.is_handled) {
    if (ticket.deleted_at) {
      status = TicketStatus.CANCELLED_TICKET;
    } else if (ticket.refunded) {
      status = TicketStatus.REFUNDED;
    } else if (ticket.checked_in) {
      status = TicketStatus.CHECKED_IN;
    } else if (ticket.is_paid) {
      status = TicketStatus.PAID;
    } else if (ticket.is_reserve) {
      status = TicketStatus.RESERVED;
    } else if (
      ticket.purchasable_at &&
      new Date(ticket.purchasable_at) <= new Date()
    ) {
      status = TicketStatus.PURCHASEABLE;
    } else if (payBefore && new Date() > payBefore && !ticket.is_paid) {
      status = TicketStatus.EXPIRED;
    } else if (
      ticketIsEnteredIntoFCFSLottery(
        ticket,
        ticket.ticket_order?.ticket_release!
      )
    ) {
      status = TicketStatus.LOTTERY_ENTERED;
    }
  } else {
    if (ticket.ticket_order?.deleted_at) {
      status = TicketStatus.CANCELLED_REQUEST;
    } else if (ticket.ticket_order?.is_handled) {
      status = TicketStatus.HANDLED;
    }
  }

  return status;
}

function createRow(ticket: ITicket) {
  const ufp = ticket.user!.food_preferences!;

  let payed_at = "N/A";
  let deleted_at = "N/A";

  try {
    payed_at = ticket.is_paid
      ? ticket?.ticket_type?.price === 0
        ? format(new Date(ticket?.created_at), "dd/MM/yyyy HH:mm")
        : format(
            new Date(ticket?.ticket_order.order?.details?.payed_at!),
            "dd/MM/yyyy HH:mm"
          )
      : "N/A";
  } catch (e) {
    console.error(e);
  }

  try {
    deleted_at = ticket.deleted_at
      ? format(new Date(ticket.deleted_at), "dd/MM/yyyy HH:mm")
      : ticket.ticket_order?.deleted_at
      ? format(new Date(ticket.ticket_order?.deleted_at), "dd/MM/yyyy HH:mm")
      : "N/A";
  } catch (e) {
    console.error(e);
  }

  let payBefore: Date | null = null;
  console.log(ticket);

  if (ticket.payment_deadline.Valid) {
    payBefore = new Date(ticket.payment_deadline.Time);
  }

  const customRows = getEventFormFieldsRow(ticket || {});

  // Determine status
  const status = getTicketStatus(ticket);

  const row = {
    id: `${ticket.ticket_order!.id}-${ticket.id}-ticket`,
    ticket_order_id: ticket.ticket_order?.id,
    ticket_id: ticket.id,
    ticket_release_id: ticket.ticket_order?.ticket_release?.id,
    ticket_release_name: ticket.ticket_order?.ticket_release?.name,
    status: status,
    type: ticket.ticket_order?.type,
    is_reserve: !isTicketRequest(ticket) ? ticket.is_reserve : null,
    is_paid: !isTicketRequest(ticket) ? ticket.is_paid : null,
    ticket: ticket?.ticket_type?.name,
    user: ticket?.user,
    email: ticket?.user?.email,
    payed_at: payed_at,
    price: ticket?.ticket_type?.price,
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
    requseted_at: ticket?.ticket_order?.created_at,
    prefer_meat: ufp.prefer_meat,
    deleted_at,
    pay_before: payBefore,
    purchasable_at: ticket.deleted_at
      ? null
      : ticket.purchasable_at !== null
      ? ticket.purchasable_at
      : ticket.updated_at,
    entered_into_lottery: ticketIsEnteredIntoFCFSLottery(
      ticket,
      ticket.ticket_order?.ticket_release!
    ),
    deleted_reason:
      ticket.deleted_reason || ticket.ticket_order?.deleted_reason,
    ...customRows,
  };

  return row;
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
  selectTicketOrder: (ticketOrderID: number) => void;
  reFetch: () => void;
}> = ({ tickets, selectTicketOrder, reFetch }) => {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const { eventID } = useParams();
  const [searchText, setSearchText] = useState(Cookies.get("searchText") || "");
  const [filteredRows, setFilteredRows] = useState<GridRowsProp>([]);
  const [filterModel, setFilterModel] = useState(() => {
    const savedFilterModel = Cookies.get("filterModel");
    return savedFilterModel ? JSON.parse(savedFilterModel) : { items: [] };
  });
  const [selectedRows, setSelectedRows] = useState<GridRowsProp>([]);

  // Initialize Fuse with the appropriate options
  const fuse = useMemo(() => {
    return new Fuse(tickets, {
      keys: [
        "user.email",
        "user.first_name",
        "user.last_name",
        "ticket_request.ticket_type.name",
        "ticket_request.ticket_release.name",
      ],
      includeScore: true,
      threshold: 0.3,
    });
  }, [tickets]);

  useEffect(() => {
    const results = searchText.trim()
      ? fuse.search(searchText).map((result) => result.item)
      : tickets; // Display all tickets if no search text
    setFilteredRows(results.map(createRow)); // Transform results into row data
  }, [searchText, fuse, tickets]);

  useEffect(() => {
    const savedColumnVisibilityModel = Cookies.get("columnVisibilityModel");
    if (savedColumnVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedColumnVisibilityModel));
    }
  }, []);

  useEffect(() => {
    Cookies.set("filterModel", JSON.stringify(filterModel), {
      expires: 2 / 24,
    });
  }, [filterModel]);

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
    Cookies.set("searchText", event.target.value, { expires: 2 / 24 }); // 2 hours
  };

  const customColumns = getEventFormFieldsColumns(tickets);

  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <IconButton
            style={{
              padding: "0 5px 5px 0",
            }}
            onClick={() => {
              selectTicketOrder(params.row.ticket_order_id);
            }}
          >
            <InfoIcon />
          </IconButton>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case TicketStatus.PENDING:
            color = orange[500];
            break;
          case TicketStatus.CANCELLED_TICKET:
          case TicketStatus.CANCELLED_REQUEST:
            color = red[500];
            break;
          case TicketStatus.REFUNDED:
            color = purple[500];
            break;
          case TicketStatus.CHECKED_IN:
            color = green[500];
            break;
          case TicketStatus.PAID:
            color = blue[500];
            break;
          case TicketStatus.RESERVED:
            color = yellow[500];
            break;
          case TicketStatus.PURCHASEABLE:
            color = teal[200];
            break;
          case TicketStatus.EXPIRED:
            color = grey[500];
            break;
          case TicketStatus.LOTTERY_ENTERED:
            color = pink[500];
            break;
          case TicketStatus.HANDLED:
            color = cyan[500];
            break;
          default:
            color = "white";
        }
        return (
          // Print params.deleted_reason if it exists
          <span style={{ backgroundColor: color, color: "black" }}>
            {params.row.deleted_reason
              ? params.row.deleted_reason
              : params.value}
          </span>
        );
      },
    },
    {
      field: "ticket_release_id",
      headerName: "Ticket Release ID",
      width: 150,
    },
    {
      field: "ticket_order_id",
      headerName: "Ticket Request ID",
      width: 150,
    },
    {
      field: "ticket_id",
      headerName: "Ticket ID",
      width: 50,
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
    { field: "ticket", headerName: "Ticket", width: 125 },
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
      width: 125,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        return cellParams1.value.username.localeCompare(
          cellParams2.value.username
        );
      },
      valueFormatter: (params) => {
        return `${params.value.first_name} ${params.value.last_name}`;
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
          {params.value.first_name} {params.value.last_name}
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
      ],
    },
    {
      field: "addons",
      headerName: "Addons",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
          onClick={() => handleAddonsModal(params)}
        >
          View
        </div>
      ),
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
          formattedDate = format(new Date(params.value), "dd/MM/yyyy HH:mm");
        } catch (e) {
          console.error(e);
          formattedDate = "N/A";
        }

        return formattedDate;
      },
    },
    {
      field: "pay_before",
      headerName: "Payment deadline",
      width: 150,
      renderCell: (params) => {
        const otherFieldValue = params.row.type;
        console.log(params.value);

        if (
          otherFieldValue === "Ticket" &&
          !params.value &&
          !params.row.is_reserve
        ) {
          // This means that there is no payment deadline for this ticket
          // So we should show "Event Start" instead
          return "Event Start";
        } else if (params.value) {
          return format(new Date(params.value), "dd/MM/yyyy HH:mm");
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
    ...customColumns,
  ];

  useEffect(() => {
    const rows = tickets.map(createRow);
    setRows(rows);
  }, [tickets]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<IUser | null>(null);
  const [selectedTicket, setSelectedTicket] = React.useState<ITicket | null>(
    null
  );

  const handleAddonsModal = (params: any) => {
    const selectedTicketOrderId = params.row.ticket_order_id;

    const filteredTickets = tickets.filter(
      (ticket) => ticket.ticket_order?.id === selectedTicketOrderId
    );

    setSelectedTicket(filteredTickets[0]!);

    setIsModalOpen(true);
  };

  const handleOpenModal = (params: any) => {
    setSelectedUser(params.row.user); // Assuming the row contains user info
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTicket(null);
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCustomActionClick = async (action: string) => {
    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return;
    }

    // Implement your custom action logic here
    const isHandlingTicketRequests = selectedRows[0].type === "Request";

    // Define a list of ids
    const ids = selectedRows.map((row) =>
      isHandlingTicketRequests ? row.ticket_order_id : row.ticket_id
    );

    const url = ApiRoutes.generateRoute(
      isHandlingTicketRequests
        ? ApiRoutes.MANAGER_EVENT_TICKET_REQEUST_ACTION
        : ApiRoutes.MANAGER_EVENT_TICKET_ACTION,
      { eventID: eventID }
    );

    let body: Object = {};
    if (isHandlingTicketRequests) {
      body = {
        action: action,
        ticket_order_ids: ids,
      };
    } else {
      body = {
        action: action,
        ticket_ids: ids,
      };
    }

    switch (action) {
      case "undelete":
      case "delete":
        try {
          await putApi(url, body, true);

          toast.success(
            `Successfully ${action === "delete" ? "deleted" : "undeleted"} ${
              isHandlingTicketRequests ? "ticket requests" : "tickets"
            }`
          );
        } catch (error: any) {
          const errorMessage =
            error.response.data.error ||
            error.message ||
            error ||
            "An error occurred";

          toast.error(errorMessage);
        }
        break;
      case "allocate":
        if (!isHandlingTicketRequests) {
          toast.error("Cannot allocate tickets");
          return;
        }

        try {
          await putApi(url, body, true);

          toast.success("Successfully allocated tickets");
        } catch (error: any) {
          const errorMessage =
            error.response.data.error ||
            error.message ||
            error ||
            "An error occurred";

          toast.error(errorMessage);
        }
        break;
      default:
        toast.error("Invalid action");
        break;
    }
    // Wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Refetch the tickets
    reFetch();
  };

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      ticket_release_id: false,
      ticket_id: false,
      ticket_order_id: false,
      ticket_release_name: true,
      status: true,
      type: true,
      addons: false,
      is_reserve: false,
      is_paid: false,
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
      // All custom columns are false by default
      ...customColumns.reduce((acc: { [key: string]: boolean }, column) => {
        acc[column.field as string] = false;
        return acc;
      }, {}),
    });

  const CustomToolbarWithProps = () => {
    return (
      <CustomToolbar
        rows={filteredRows}
        onCustomAction={handleCustomActionClick}
      />
    );
  };

  useEffect(() => {
    Cookies.set(
      "columnVisibilityModel",
      JSON.stringify(columnVisibilityModel),
      {
        expires: 1 / 24, // 2 hours
      }
    );
  }, [columnVisibilityModel]);

  if (!tickets || rows.length === 0) {
    return null;
  }

  return (
    <Box>
      <ThemeProvider theme={MUItheme}>
        <div
          style={{
            position: "relative",
            marginBottom: 20,
            width: "fit-content",
          }}
        >
          <Input
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search tickets..."
          />
          {searchText && (
            <ClearIcon
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() =>
                handleSearchChange({ target: { value: "" } } as any)
              }
            />
          )}
        </div>
        <StyledText
          color={PALLETTE.charcoal_see_through}
          level="body-md"
          fontWeight={500}
          fontSize={16}
        >
          You can click the info-icon next to a ticket to view more information
        </StyledText>
        <DataGrid
          rows={filteredRows}
          rowHeight={32}
          columns={columns}
          pageSizeOptions={[25, 50, 100]}
          slots={{
            toolbar: CustomToolbarWithProps,
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          getRowClassName={(params) =>
            params.row.deleted_at !== "N/A" ? styles.rowDeleted : ""
          }
          initialState={{
            sorting: {
              sortModel: [{ field: "requseted_at", sort: "desc" }],
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection: any) => {
            const selectedRowData = newSelection.map((id: any) =>
              filteredRows.find((row) => row.id === id)
            );
            setSelectedRows(selectedRowData);
          }}
          isRowSelectable={
            (params: GridRowParams) => {
              if (selectedRows.length === 0) {
                return true;
              }

              return (
                selectedRows.length === 0 ||
                selectedRows[0].type === params.row.type
              );
            }
            // Check if the first element in the selected rows has the same type as the current row
          }
        />
      </ThemeProvider>
      {selectedUser && (
        <InformationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="User Information"
          width="50%"
          animationOptions={{
            transition: { duration: 0.2 },
          }}
        >
          <TicketsRowUserInfo user={selectedUser} />
        </InformationModal>
      )}
      {selectedTicket && (
        <InformationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Addons"
          width="50%"
          animationOptions={{
            transition: { duration: 0.2 },
          }}
        >
          <AddonModalView ticket={selectedTicket} />
        </InformationModal>
      )}
    </Box>
  );
};

export default EventTicketsList;
