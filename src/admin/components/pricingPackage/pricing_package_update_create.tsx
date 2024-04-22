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
} from "react-admin";
import LoadingOverlay from "../../../components/Loading";
import { Typography } from "@mui/material";

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
      </SimpleForm>
    </Edit>
  );
};

type TierChoice = {
  id: string;
  name: string;
  monthly_price: number;
  yearly_price: number;
};

const PricingPackageCreate = (props: any) => {
  const { data, error, isLoading } = useGetList(
    "package-tiers",
    {
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    } // Fetch all tiers and sort by 'id' in ascending order
  );

  const [loading, setLoading] = useState(true);
  const [tierChoices, setTierChoices] = useState<TierChoice[]>([]);
  const [selectedTier, setSelectedTier] = useState(null);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);

  useEffect(() => {
    if (data) {
      setLoading(true);
      const tiers = Object.values(data).map((tier: any) => ({
        id: tier.tier,
        name: tier.name,
        monthly_price: tier.standard_monthly_price,
        yearly_price: tier.standard_yearly_price,
      }));
      setTierChoices(tiers);
      setSelectedTier(tiers[0]?.id);
      setMonthlyPrice(tiers[0]?.monthly_price);
      setYearlyPrice(tiers[0]?.yearly_price);
    }
  }, [data]);

  useEffect(() => {
    if (!selectedTier) return;
    const selectedTierData = tierChoices.find(
      (tier) => tier.id === selectedTier
    );
    setMonthlyPrice(selectedTierData?.monthly_price!);
    setYearlyPrice(selectedTierData?.yearly_price!);
    setLoading(false);
  }, [selectedTier, tierChoices]);

  if (isLoading || loading) return <Loading />;

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <SelectInput
          source="tier"
          choices={tierChoices}
          onChange={(e) => setSelectedTier(e.target.value)}
        />
        <Typography variant="h6">Standard monthly: {monthlyPrice}</Typography>
        <NumberInput
          key={`monthly-${selectedTier}`}
          source="monthly_price"
          label="Monthly Price"
          value={monthlyPrice}
          defaultValue={monthlyPrice}
        />
        <Typography variant="h6">Standard yearly: {yearlyPrice}</Typography>
        <NumberInput
          key={`yearly-${selectedTier}`}
          source="yearly_price"
          label="Yearly Price (in SEK/month)"
          value={yearlyPrice}
          defaultValue={yearlyPrice}
        />
      </SimpleForm>
    </Create>
  );
};

export { PricingPackageEdit, PricingPackageCreate };
