// src/features/FeatureList.tsx
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ReferenceField,
} from "react-admin";

export const FeatureList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ReferenceField source="feature_group_id" reference="feature-groups">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="is_available" name="Is Available" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
