import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import classes from "./feature-table.module.css";

export interface Feature {
  id: number;
  name: string;
  featureGroup: string;
  materialUi: boolean;
  joyUi: boolean;
  baseUi: boolean;
  muiSystem: boolean;
}

const sampleFeatures: Feature[] = [
  {
    id: 1,
    name: "Event Creation",
    featureGroup: "Event Management",
    materialUi: true,
    joyUi: false,
    baseUi: true,
    muiSystem: true,
  },
  {
    id: 2,
    name: "Event Deletion",
    featureGroup: "Event Management",
    materialUi: true,
    joyUi: true,
    baseUi: false,
    muiSystem: true,
  },
  {
    id: 3,
    name: "Event Update",
    featureGroup: "Event Management",
    materialUi: true,
    joyUi: true,
    baseUi: true,
    muiSystem: false,
  },
  {
    id: 4,
    name: "User Registration",
    featureGroup: "User Management",
    materialUi: true,
    joyUi: true,
    baseUi: true,
    muiSystem: true,
  },
  {
    id: 5,
    name: "User Deletion",
    featureGroup: "User Management",
    materialUi: true,
    joyUi: false,
    baseUi: true,
    muiSystem: false,
  },
];

interface FeatureTableProps {
  group_name: string;
}

const FeatureTable: React.FC<FeatureTableProps> = ({ group_name }) => {
  return (
    <table className={classes.feature_table}>
      <thead>
        <tr>
          <th>{group_name}</th>
          <th>Free</th>
          <th>Single</th>
          <th>Proffessional</th>
          <th>Enterprise</th>
        </tr>
      </thead>
      <tbody>
        {sampleFeatures.map((feature) => (
          <tr key={feature.id}>
            <td>{feature.name}</td>
            <td>{feature.materialUi ? "Yes" : "No"}</td>
            <td>{feature.joyUi ? "Yes" : "No"}</td>
            <td>{feature.baseUi ? "Yes" : "No"}</td>
            <td>{feature.muiSystem ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeatureTable;
