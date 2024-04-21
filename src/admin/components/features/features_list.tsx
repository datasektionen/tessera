// src/features/FeatureList.tsx
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const FeatureList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="group" />
      <TextField source="isAvailable" label="Is Available" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
