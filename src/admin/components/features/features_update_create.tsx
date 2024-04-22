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
  NumberInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

export const FeatureCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <ReferenceInput source="feature_group_id" reference="feature-groups">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput
        source="is_available"
        label="Is Available"
        defaultValue={true}
      />
      <NumberInput source="feature_limit.hard_limit" label="Hard Limit" />
      <NumberInput source="feature_limit.monthly_limit" label="Monthly Limit" />
      <NumberInput source="feature_limit.yearly_limit" label="Yearly Limit" />
      <TextInput source="feature_limit.description" label="Limit Description" />
      <ReferenceArrayInput
        source="package_tiers"
        reference="package-tiers"
        label="Package Tiers"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
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
      <BooleanInput
        source="is_available"
        label="Is Available"
        defaultValue={true}
      />
      <NumberInput source="feature_limit.hard_limit" label="Hard Limit" />
      <NumberInput source="feature_limit.monthly_limit" label="Monthly Limit" />
      <NumberInput source="feature_limit.yearly_limit" label="Yearly Limit" />
      <TextInput source="feature_limit.description" label="Limit Description" />
      <ReferenceArrayInput
        source="package_tiers"
        reference="package-tiers"
        label="Package Tiers"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);
