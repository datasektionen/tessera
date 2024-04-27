import * as React from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import classes from "./feature-table.module.css";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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

const HeaderValue: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <th
    style={{
      backgroundColor: PALLETTE.light_pink,
    }}
  >
    <StyledText level="h4" color={PALLETTE.charcoal} fontSize={18}>
      {children}
    </StyledText>
  </th>
);

const RowValue: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td>
    <StyledText level="body" color={PALLETTE.charcoal} fontSize={16}>
      {children}
    </StyledText>
  </td>
);

const BooleanValue: React.FC<{ value: boolean }> = ({ value }) => (
  <td
    style={{
      backgroundColor: value ? PALLETTE.green : PALLETTE.red,
    }}
  >
    <StyledText
      level="body"
      color={PALLETTE.charcoal}
      fontSize={16}
      sx={{
        textAlign: "center",
      }}
    >
      {value ? (
        <CheckIcon style={{ color: PALLETTE.charcoal }} />
      ) : (
        <CloseIcon style={{ color: PALLETTE.charcoal }} />
      )}
    </StyledText>
  </td>
);

interface FeatureTableProps {
  group_name: string;
}

const FeatureTable: React.FC<FeatureTableProps> = ({ group_name }) => {
  return (
    <table className={classes.feature_table}>
      <thead>
        <tr>
          <HeaderValue>{group_name}</HeaderValue>
          <HeaderValue>Free</HeaderValue>
          <HeaderValue>Single</HeaderValue>
          <HeaderValue>Proffessional</HeaderValue>
          <HeaderValue>Enterprise</HeaderValue>
        </tr>
      </thead>
      <tbody>
        {sampleFeatures.map((feature) => (
          <tr key={feature.id}>
            <RowValue>{feature.name}</RowValue>
            <BooleanValue value={feature.materialUi} />
            <BooleanValue value={feature.joyUi} />
            <BooleanValue value={feature.baseUi} />
            <BooleanValue value={feature.muiSystem} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeatureTable;
