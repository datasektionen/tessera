// src/features/FeatureCreate.tsx
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  Edit,
  ReferenceInput,
  SelectInput,
} from "react-admin";

export const FeatureCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <ReferenceInput source="feature_group_id" reference="feature-groups">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="isAvailable" label="Is Available" />
    </SimpleForm>
  </Create>
);

export const FeatureEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="description" />
      <ReferenceInput source="feature_group_id" reference="feature-groups">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="isAvailable" label="Is Available" />
    </SimpleForm>
  </Edit>
);
