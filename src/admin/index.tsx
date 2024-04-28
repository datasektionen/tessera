import { Admin, Resource } from "react-admin";
import dataProvider from "./data_provider";
import {
  PackageTierEdit,
  PackageTierCreate,
} from "./components/packageTiers/package_tier_edit_create";
import { PackageTierList } from "./components/packageTiers/packate_tier_list";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { FeatureList } from "./components/features/features_list";
import {
  FeatureCreate,
  FeatureEdit,
} from "./components/features/features_update_create";
import { FeatureGroupList } from "./components/featureGroup/feature_group_list";
import {
  FeatureGroupCreate,
  FeatureGroupEdit,
} from "./components/featureGroup/feature_group_update_create";
import { PlanEnrollmentsList } from "./components/planEnrollments/plan_enrollments_list";
import {
  PlanEnrollmentsCreate,
  PlanEnrollmentsEdit,
} from "./components/planEnrollments/plan_enrollments_update_create";

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
      name="plan-enrollments"
      list={PlanEnrollmentsList}
      edit={PlanEnrollmentsEdit}
      create={PlanEnrollmentsCreate}
    />

    <Resource
      name="features"
      list={FeatureList}
      create={FeatureCreate}
      edit={FeatureEdit}
    />

    <Resource
      name="feature-groups"
      list={FeatureGroupList}
      create={FeatureGroupCreate}
      edit={FeatureGroupEdit}
    />

    {/* Add other resources similarly */}
  </Admin>
);

export default AdminPage;
