import { Admin, Resource } from "react-admin";
import dataProvider from "./data_provider";
import {
  PackageTierEdit,
  PackageTierCreate,
} from "./components/packageTiers/package_tier_edit_create";
import { PackageTierList } from "./components/packageTiers/packate_tier_list";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PricingPackageList } from "./components/pricingPackage/pricing_package_list";
import { PricingPackageCreate, PricingPackageEdit } from "./components/pricingPackage/pricing_package_update_create";

const Dashboard = () => (
  <div>
    <h1>Welcome to the Admin Dashboard</h1>
    <p>Select an option from the menu.</p>
  </div>
);

const AdminPage = () => (
  //@ts-ignore
  <Admin dashboard={Dashboard} dataProvider={dataProvider} basename="/admin/">
    <Resource
      name="package-tiers"
      list={PackageTierList}
      edit={PackageTierEdit}
      create={PackageTierCreate}
    />

    <Resource
      name="pricing-packages"
      list={PricingPackageList}
      edit={PricingPackageEdit}
      create={PricingPackageCreate}
    />

    {/* Add other resources similarly */}
  </Admin>
);

export default AdminPage;
