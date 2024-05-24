// src/components/packageTiers/PackageTierEditCreate.tsx
import {
  Edit,
  SimpleForm,
  TextInput,
  Create,
  NumberInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

export const PackageTierEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <TextInput source="type" />
      <TextInput multiline source="description" />
      <NumberInput
        source="standard_monthly_price"
        label="Standard Monthly Price"
      />
      <NumberInput
        source="standard_yearly_price"
        label="Standard Yearly Price"
      />
      <ReferenceArrayInput
        source="default_features"
        reference="features"
        label="Default Features"
        perPage={100}
        sort={{ field: "name", order: "ASC" }}
      >
        <SelectArrayInput optionText="name" optionValue="id" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const PackageTierCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="type" />
      <TextInput multiline source="description" />
      <NumberInput
        source="standard_monthly_price"
        label="Standard Monthly Price"
      />
      <NumberInput
        source="standard_yearly_price"
        label="Standard Yearly Price"
      />
      <ReferenceArrayInput
        source="default_features"
        reference="features"
        label="Default Features"
        perPage={100}
        sort={{ field: "name", order: "ASC" }}
      >
        <SelectArrayInput optionText="name" optionValue="id" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
