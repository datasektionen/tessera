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
  NumberField,
} from "react-admin";

export const PlanEnrollmentsList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="reference_name" />
      <FunctionField
        label="Creator"
        render={(record: any) =>
          `${record.creator.first_name} ${record.creator.last_name}`
        }
      />

      <ReferenceField
        source="package_tier_id"
        reference="package-tiers"
        label="Package"
      >
        <TextField source="name" />
      </ReferenceField>

      <NumberField
        source="one_time_price"
        options={{
          style: "currency",
          currency: "SEK",
        }}
      />
      <NumberField
        source="monthly_price"
        options={{
          style: "currency",
          currency: "SEK",
        }}
      />
      <NumberField
        source="yearly_price"
        options={{
          style: "currency",
          currency: "SEK",
        }}
      />
      <TextField source="plan" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
