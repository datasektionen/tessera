import * as React from "react";
import {
  Loading,
  Error,
  useGetList,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  SelectInput,
} from "react-admin";

const PricingPackageEdit = (props: any) => {
  const { data, error } = useGetList(
    "package-tiers",
    {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    } // Fetch all tiers and sort by 'id' in ascending order
  );

  if (!data) return null;

  const tierChoices = Object.values(data).map((tier: any) => ({
    id: tier.type,
    type: tier.type,
    name: tier.type,
  }));

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <SelectInput source="tier" choices={tierChoices} />
        <NumberInput source="standard_price" label="Standard Price" />
      </SimpleForm>
    </Edit>
  );
};

const PricingPackageCreate = (props: any) => {
  const { data, error } = useGetList(
    "package-tiers",
    {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    } // Fetch all tiers and sort by 'id' in ascending order
  );

  if (!data) return null;

  const tierChoices = Object.values(data).map((tier: any) => ({
    id: tier.type,
    type: tier.type,
    name: tier.type,
  }));

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <SelectInput source="tier" choices={tierChoices} />
        <NumberInput source="standard_price" label="Standard Price" />
      </SimpleForm>
    </Create>
  );
};

export { PricingPackageEdit, PricingPackageCreate };
