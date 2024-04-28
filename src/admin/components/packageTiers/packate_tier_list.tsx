// src/components/packageTiers/PackageTierList.tsx
import { Tooltip } from "@mui/material";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
} from "react-admin";

export const PackageTierList = (props: any) => (
  <List {...props} sort={{ field: "id", order: "ASC" }}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
      <TextField source="description" />
      <NumberField
        source="standard_monthly_price"
        label="Standard Monthly Price"
      />
      <NumberField
        source="standard_yearly_price"
        label="Standard Yearly Price"
      />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
