import * as React from "react";
import { useEffect, useState } from "react";
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
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import LoadingOverlay from "../../../components/Loading";
import { TextField, Typography } from "@mui/material";

type TierChoice = {
  id: string;
  name: string;
  monthly_price: number;
  yearly_price: number;
};

const PlanEnrollmentsEdit: React.FC<any> = (props) => {
  const {
    data: tierData,
    isLoading: isLoadingTiers,
    error,
  } = useGetList<TierChoice>("package-tiers", {
    pagination: { page: 1, perPage: 10000 },
    sort: { field: "id", order: "ASC" },
  });

  const { data: networkData, isLoading: isLoadingNetworks } =
    useGetList<NetworkChoice>("networks", {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    });

  // Handle error states
  if (error) {
    console.error("Error fetching tier data:", error);
    return <p>Error loading data!</p>;
  }

  // Handle loading state
  if (isLoadingTiers || !tierData) return <Loading />;

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="reference_name" label="Reference Name" />
        <ReferenceInput
          source="creator_id" // The name of the foreign key in the record
          reference="users" // The name of the resource you're referencing
          label="Creator" // The label to display for this field
          disabled // Makes the input field non-interactive
          optionText={(record: any) => {
            // Function to determine the text to display for each option
            // TODO: Dont understand why this doesnt work
            if (!record) {
              return "";
            }
            return `${record.first_name} ${record.last_name}`; // Returns the first and last name of the user
          }}
        />
        <TextInput source="name" />

        <SelectInput
          source="package_tier_id"
          choices={tierData}
          optionText="name"
        />
        <NumberInput source="monthly_price" />
        <NumberInput source="yearly_price" />
        <SelectInput
          source="plan"
          choices={[
            { id: "monthly", name: "Monthly" },
            { id: "yearly", name: "Yearly" },
            { id: "no_payment", name: "No Payment" },
            { id: "one_time", name: "One Time" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

// Define types for clearer, type-safe component interactions

type NetworkChoice = {
  id: string;
  name: string;
};

const PlanEnrollmentsCreate: React.FC = (props) => {
  const { data: tierData, isLoading: isLoadingTiers } = useGetList<TierChoice>(
    "package-tiers",
    {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    }
  );

  const { data: networkData, isLoading: isLoadingNetworks } =
    useGetList<NetworkChoice>("networks", {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    });

  const [selectedTier, setSelectedTier] = useState<TierChoice | undefined>(
    undefined
  );

  // Automatically select the first tier when data is loaded
  useEffect(() => {
    if (tierData?.length && !selectedTier) {
      setSelectedTier(tierData[0]);
    }
  }, [tierData, selectedTier]);

  // Handler for changing selected tier
  const handleSelectTier = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = event.target.value as string;
    const selected = tierData?.find((tier) => tier.id === selectedId);
    setSelectedTier(selected);
  };

  // Conditional rendering based on loading states
  if (isLoadingTiers || isLoadingNetworks) return <Loading />;

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="reference_name" label="Reference Name" />
        <ReferenceInput source="creator_id" reference="users" label="Creator">
          <AutocompleteInput
            optionText={(record: any) =>
              `${record.first_name} ${record.last_name} (${record.id})`
            }
          />
        </ReferenceInput>
        <TextInput source="name" />

        <SelectInput
          source="package_tier_id"
          choices={tierData}
          optionText="name"
          // @ts-ignore
          onChange={handleSelectTier}
        />
        {selectedTier && (
          <>
            <Typography variant="h6">
              Standard monthly: {selectedTier.monthly_price}
            </Typography>
            <NumberInput
              source="monthly_price"
              label="Monthly Price"
              value={selectedTier.monthly_price}
            />
            <Typography variant="h6">
              Standard yearly: {selectedTier.yearly_price}
            </Typography>
            <NumberInput
              source="yearly_price"
              label="Yearly Price"
              value={selectedTier.yearly_price}
            />
          </>
        )}
        <SelectInput
          source="plan"
          choices={[
            { id: "monthly", name: "Monthly" },
            { id: "yearly", name: "Yearly" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};

export default PlanEnrollmentsCreate;

export { PlanEnrollmentsEdit, PlanEnrollmentsCreate };
