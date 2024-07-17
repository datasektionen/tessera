// src/features/FeatureCreate.tsx
import { Stack } from "@mui/material";
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  Edit,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  useGetList,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  useRecordContext,
} from "react-admin";
import StyledText from "../../../components/text/styled_text";

type PackageTierType = {
  id: string;
  name: string;
};

export const FeatureCreate = () => {
  const [selectedPackageTiers, setSelectedPackageTiers] = React.useState<
    PackageTierType[]
  >([]);

  const { data: packageTiers, isLoading: isLoadingPackTiers } =
    useGetList<PackageTierType>("package-tiers", {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    });

  const handlePackageTiersChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    // Append the selected package tier to the selectedPackageTiers array
    setSelectedPackageTiers(event.target.value as PackageTierType[]);
  };

  return (
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
        <ReferenceArrayInput
          source="package_tiers"
          reference="package-tiers"
          label="Package Tiers"
        >
          <SelectArrayInput
            optionText="name"
            onChange={(event: any) => handlePackageTiersChange(event)}
          />
        </ReferenceArrayInput>
        {selectedPackageTiers.map((tier, index) => {
          return (
            <div key={index}>
              <TextInput
                label="Description"
                source={`feature_limits[${index}].limit_description`}
              />
              <Stack spacing={2} direction="row">
                <NumberInput
                  source={`feature_limits[${index}].limit`}
                  label="Limit"
                />
                <NumberInput
                  source={`feature_limits[${index}].monthly_limit`}
                  label="Monthly Limit"
                />
                <NumberInput
                  source={`feature_limits[${index}].yearly_limit`}
                  label="Yearly Limit"
                />
              </Stack>
              <ReferenceInput
                source={`feature_limits[${index}].package_tier_id`}
                reference="package-tiers"
              >
                <SelectInput
                  key={index + "-" + tier}
                  disabled={true}
                  optionText="name"
                  defaultValue={tier}
                />
              </ReferenceInput>
            </div>
          );
        })}
      </SimpleForm>
    </Create>
  );
};

export const FeatureEdit = () => {
  return (
    <Edit>
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

        <ArrayInput source="feature_limits">
          <SimpleFormIterator>
            <ReferenceInput source="package_tier_id" reference="package-tiers">
              <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="limit_description" label="Description" />
            <NumberInput source="limit" label="Limit" />
            <NumberInput source="monthly_limit" label="Monthly Limit" />
            <NumberInput source="yearly_limit" label="Yearly Limit" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
