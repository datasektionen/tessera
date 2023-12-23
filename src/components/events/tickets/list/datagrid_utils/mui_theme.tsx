import { createTheme } from "@mui/material";
import PALLETTE from "../../../../../theme/pallette";

export const MUItheme = createTheme({
  typography: {
    fontFamily: '"Josefin Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        toolbarContainer: {
          "& .MuiButton-root": {
            // Targeting all buttons inside the toolbar
            color: PALLETTE.cerise,
            "&:hover": {
              backgroundColor: PALLETTE.charcoal_see_through,
            },
          },
        },
        root: {
          backgroundColor: "#f5f5f5", // Background color for the entire DataGrid
        },
        row: {
          "&:nth-of-type(odd)": {
            // Style for odd rows
            backgroundColor: "#efefef",
          },
          "&:nth-of-type(even)": {
            // Style for even rows
            backgroundColor: "#dfdfdf",
          },
        },
      },
    },
  },
});
