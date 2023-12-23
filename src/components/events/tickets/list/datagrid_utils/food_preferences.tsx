import { Cancel, CheckCircle } from "@mui/icons-material";

export const createFoodPreferenceColumn = (
  field: string,
  headerName: string
) => ({
  field,
  headerName,
  width: 25,
  valueFormatter: (params: any) => (params.value ? "Yes" : "No"),
  renderCell: (params: any) =>
    params.value ? <CheckCircle color="success" /> : <Cancel color="error" />,
});
