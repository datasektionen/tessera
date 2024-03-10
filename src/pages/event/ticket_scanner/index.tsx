import { QrScanner } from "@yudiel/react-qr-scanner";
import TesseraWrapper from "../../../components/wrappers/page_wrapper";
import { Box, Grid } from "@mui/joy";
import BorderBox from "../../../components/wrappers/border_box";
import StyledText from "../../../components/text/styled_text";
import Title from "../../../components/text/title";
import PALLETTE from "../../../theme/pallette";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { ITicket } from "../../../types";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventTicketsStart } from "../../../redux/features/eventTicketsSlice";
import { MUItheme } from "../../../components/events/tickets/list/datagrid_utils/mui_theme";
import { Button, ThemeProvider } from "@mui/material";
import StyledButton from "../../../components/buttons/styled_button";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/wrappers/footer";

const EventTicketsListScannerView: React.FC<{
  tickets: ITicket[];
  handleScan: (data: string | null) => void;
}> = ({ tickets, handleScan }) => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  const columns: GridColDef[] = [
    {
      field: "ticket_id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
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
        >
          {params.value.first_name + " " + params.value.last_name}
        </div>
      ),
    },
    { field: "ticket", headerName: "Ticket", width: 100 },
    {
      field: "checked_in",
      headerName: "Checked In",
      width: 75,
      renderCell: (params) =>
        params.value ? (
          <CheckCircle color="success" />
        ) : (
          <Cancel color="error" />
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleScan(params.row.qr_code)}>
          Scan Ticket
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const rows = tickets
      .filter((ticket) => !ticket.deleted_at)
      .map((ticket: ITicket) => {
        console.log(ticket.qr_code);
        const row = {
          id: `${ticket.id}-${ticket.ticket_request!.id}-ticket`,
          ticket_id: ticket.id,
          ticket: ticket.ticket_request?.ticket_type?.name,
          user: ticket?.user,
          checked_in: ticket.checked_in,
          qr_code: ticket.qr_code,
        };

        return row;
      });

    setRows(rows);
  }, [tickets]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowHeight={32}
      pageSizeOptions={[25, 50, 100, 200, 500]}
    />
  );
};

const TicketScannerPage = () => {
  const [scanLoading, setScanLoading] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const { eventID } = useParams();

  const { tickets } = useSelector((state: RootState) => state.eventTickets);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (eventID) {
      dispatch(fetchEventTicketsStart(parseInt(eventID)));
    }
  }, [dispatch, eventID]);

  const makeCheckInRequest = async (qrCode: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventID}/tickets/qr-check-in`,
        {
          qr_code: qrCode,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setScanSuccess(response.data.message);
        setScanError(null);
        dispatch(fetchEventTicketsStart(parseInt(eventID!)));
        setTimeout(() => {
          setScanLoading(false);
        }, 3000);
      }
    } catch (error: any) {
      setScanError(error.response.data.error || "An error occurred");
      setScanSuccess(null);
      setTimeout(() => {
        setScanLoading(false);
      }, 3000);
    }
  };

  const handleScan = (data: string | null) => {
    if (scanLoading) {
      return;
    }
    if (data) {
      setScanLoading(true);
      makeCheckInRequest(data);
    }
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScanError = (error: Error) => {
    console.error(error);
  };

  return (
    <>
      <Grid
        sx={{
          width: "100%",
        }}
        container
        justifyContent={"center"}
      >
        <StyledButton
          size="lg"
          color={PALLETTE.cerise}
          onClick={() => navigate(`/events/${eventID}/manage`)}
          sx={{
            mt: 4,
          }}
        >
          {t("form.button_back")}
        </StyledButton>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          flexDirection: "column",
        }}
      >
        <Title>Scan Ticket</Title>
        <StyledText level="body-sm" color={PALLETTE.charcoal}>
          {t("event.check_in.scan_ticket_instructions")}
        </StyledText>
        <BorderBox
          style={{
            width: "95%",
            margin: "0 auto",
            maxHeight: "400px",
            maxWidth: "400px",
          }}
        >
          <QrScanner onDecode={handleScan} onError={handleScanError} />
        </BorderBox>
        {scanLoading && (
          <StyledText
            level="body-sm"
            color={PALLETTE.charcoal}
            fontWeight={700}
          >
            {t("event.check_in.loading")}
          </StyledText>
        )}
        {scanSuccess && (
          <StyledText level="body-sm" color={PALLETTE.green} fontWeight={700}>
            {scanSuccess || scanError}
          </StyledText>
        )}
        {scanError && (
          <StyledText level="body-sm" color={PALLETTE.red} fontWeight={700}>
            {scanError}
          </StyledText>
        )}
      </Box>
      <ThemeProvider theme={MUItheme}>
        <EventTicketsListScannerView
          tickets={tickets}
          handleScan={handleScan}
        />
      </ThemeProvider>
      <Box mb={24}></Box>
      <Footer />
    </>
  );
};

export default TicketScannerPage;
