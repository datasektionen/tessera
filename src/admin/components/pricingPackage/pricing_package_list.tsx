// src/components/pricingPackages/PricingPackageList.tsx
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const PricingPackageList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="tier" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
