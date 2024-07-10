import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  useGridApiContext,
  GridToolbarExportContainer,
  GridCsvGetRowsToExportParams,
  gridExpandedSortedRowIdsSelector,
  gridDataRowIdsSelector,
} from "@mui/x-data-grid";
import Button, { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createSvgIcon } from "@mui/material/utils";
import * as XLSX from "xlsx";
import { useState } from "react";
import { Menu } from "@mui/material";
import BackHandIcon from "@mui/icons-material/BackHand";
import ApiRoutes from "../../../../../routes/backend_routes";

// Custom toolbar
const getAllRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridDataRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }: GridCsvGetRowsToExportParams) =>
  gridExpandedSortedRowIdsSelector(apiRef);

function ExportFilterDataButton(props: ButtonProps) {
  const apiRef = useGridApiContext();

  const handleExportFilteredRows = () => {
    apiRef.current.exportDataAsCsv({
      getRowsToExport: getFilteredRows,
      fileName: "filtered_data.csv",
      allColumns: true,
    });
  };

  return (
    <MenuItem onClick={() => handleExportFilteredRows()}>
      Export Filtered Rows as CSV
    </MenuItem>
  );
}

function ExportAllDataButton(props: ButtonProps) {
  const apiRef = useGridApiContext();

  const handleExportFilteredRows = () => {
    apiRef.current.exportDataAsCsv({
      getRowsToExport: getAllRows,
      fileName: "all_data.csv",
      allColumns: true,
    });
  };

  return (
    <MenuItem onClick={() => handleExportFilteredRows()}>
      Export All Rows as CSV
    </MenuItem>
  );
}

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  "SaveAlt"
);

function downloadCSVAsExcel(csv: any, fileName: any) {
  const data = XLSX.read(csv, { type: "string" });
  const ws = data.Sheets[data.SheetNames[0]];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

function convertDataToCSV(data: any) {
  if (!data || data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const csvContent = [headers.join(",")]
    .concat(
      data.map((row: any) =>
        headers
          .map((header) =>
            JSON.stringify(row[header], (_, value) =>
              value == null ? "" : value
            )
          )
          .join(",")
      )
    )
    .join("\n");
  return csvContent;
}

function CustomToolbar({ rows, onCustomAction }: any) {
  const apiRef = useGridApiContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDownloadExcel = () => {
    const csvData = convertDataToCSV(rows);
    downloadCSVAsExcel(csvData, "DataGrid-Export");
  };

  const buttonBaseProps: ButtonProps = {
    color: "primary",
    size: "small",
    startIcon: <ExportIcon />,
  };

  const handleClickActions = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExportContainer>
        <ExportAllDataButton {...buttonBaseProps} />
        <ExportFilterDataButton {...buttonBaseProps} />
        <Button {...buttonBaseProps} onClick={handleDownloadExcel}>
          Export as Excel
        </Button>
      </GridToolbarExportContainer>
      <Button
        variant="text"
        color="primary"
        onClick={handleClickActions}
        startIcon={<BackHandIcon />}
      >
        Actions
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onCustomAction("delete");
            handleClose();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            onCustomAction("undelete");
            handleClose();
          }}
        >
          Undelete
        </MenuItem>
        <MenuItem
          onClick={() => {
            onCustomAction("allocate");
            handleClose();
          }}
        >
          Allocate
        </MenuItem>
        <MenuItem
          onClick={() => {
            onCustomAction("refund");
            handleClose();
          }}
        >
          Refund
        </MenuItem>
      </Menu>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
