import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { Box, Grid, Sheet, Stack, Tab, TabList, Table, Tabs } from "@mui/joy";
import {
  GridColDef,
  DataGrid,
  GridRowsProp,
  GridToolbar,
  GridToolbarContainer,
  GridCsvExportMenuItem,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridColumnVisibilityModel,
  useGridApiContext,
  useGridSelector,
  GridCsvExportOptions,
  gridFilteredSortedRowIdsSelector,
  GridToolbarExportContainer,
  GridCsvGetRowsToExportParams,
  gridExpandedSortedRowIdsSelector,
  GridExportMenuItemProps,
  gridDataRowIdsSelector,
} from "@mui/x-data-grid";
import Button, { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createSvgIcon } from "@mui/material/utils";
import { ITicket } from "../../../../../types";

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

function CustomToolbar() {
  const apiRef = useGridApiContext();

  const buttonBaseProps: ButtonProps = {
    color: "primary",
    size: "small",
    startIcon: <ExportIcon />,
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExportContainer>
        <ExportAllDataButton {...buttonBaseProps} />
        <ExportFilterDataButton {...buttonBaseProps} />
      </GridToolbarExportContainer>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
