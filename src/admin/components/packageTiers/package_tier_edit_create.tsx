// src/components/packageTiers/PackageTierEditCreate.tsx
import { Edit, SimpleForm, TextInput, Create, NumberInput } from "react-admin";

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
    </SimpleForm>
  </Create>
);
