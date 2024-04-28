// src/components/PlanEnrollmentss/PlanEnrollmentsList.tsx
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

export const PlanEnrollmentsList = (props: any) => (
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
