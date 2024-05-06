// src/components/PlanEnrollmentss/PlanEnrollmentsList.tsx
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ReferenceInput,
  ReferenceField,
  FunctionField,
} from "react-admin";

export const PlanEnrollmentsList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <FunctionField
        label="Creator"
        render={(record: any) =>
          `${record.creator.first_name} ${record.creator.last_name}`
        }
      />
      <TextField source="name" />

      <ReferenceField
        source="package_tier_id"
        reference="package-tiers"
        label="Package"
      >
        <TextField source="name" />
      </ReferenceField>

      <TextField source="monthly_price" />
      <TextField source="yearly_price" />
      <TextField source="plan" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
