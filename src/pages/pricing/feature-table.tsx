import * as React from "react";
import { IPricingFeature, IPricingFeaturePlanDetails } from "./features/types";
import StyledText from "../../components/text/styled_text";
import PALLETTE from "../../theme/pallette";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import classes from "./feature-table.module.css"; // Ensure your CSS module supports MUI class overrides
import { IconButton, Stack, Tooltip } from "@mui/joy";
import InfoIcon from "@mui/icons-material/Info";

interface StyledTableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
  isFeatureName?: boolean;
  featureDescription?: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  align?: string;
}

const StyledTableCell: React.FC<StyledTableCellProps> = ({
  children,
  isHeader = false,
  isFeatureName = false,
  featureDescription,
  bgColor = PALLETTE.white,
  textColor = PALLETTE.charcoal,
  width,
  align = "left",
}) => (
  <TableCell
    style={{
      backgroundColor: isHeader ? PALLETTE.light_pink : bgColor,
      color: textColor,
      width: width,
      textAlign: align as any,
    }}
    component={isHeader ? "th" : "td"}
  >
    {isFeatureName ? (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <StyledText
          level={isHeader ? "h4" : "body"}
          color={textColor}
          fontSize={isHeader ? 20 : 18}
        >
          {children}
        </StyledText>
        <Tooltip title={featureDescription}>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    ) : (
      <StyledText
        level={isHeader ? "h4" : "body"}
        color={textColor}
        fontSize={isHeader ? 20 : 18}
      >
        {children}
      </StyledText>
    )}
  </TableCell>
);

const BooleanValue: React.FC<{ value: boolean; description: string }> = ({
  value,
  description,
}) => (
  <StyledTableCell
    bgColor={value ? PALLETTE.vibrant_green : PALLETTE.red}
    textColor={PALLETTE.charcoal}
    align="center"
  >
    {description !== "" ? (
      <div>{description}</div>
    ) : value ? (
      <CheckIcon style={{ color: PALLETTE.charcoal }} />
    ) : (
      <CloseIcon style={{ color: PALLETTE.charcoal }} />
    )}
  </StyledTableCell>
);

interface FeatureTableProps {
  group_name: string;
  features: IPricingFeature[];
}

const sortFeaturesByAvailability = (features: IPricingFeature[]) => {
  return features.sort((a, b) => {
    const countPlans = (feature: IPricingFeature) =>
      ["free", "single_event", "professional", "network"].reduce(
        (acc, plan) =>
          acc +
          ((
            feature[plan as keyof IPricingFeature] as IPricingFeaturePlanDetails
          ).has
            ? 1
            : 0),
        0
      );

    return countPlans(b) - countPlans(a); // Sort in descending order
  });
};

const FeatureTable: React.FC<FeatureTableProps> = ({
  group_name,
  features,
}) => {
  const sortedFeatures = sortFeaturesByAvailability(features); // Sort features before rendering

  return (
    <Table className={classes.feature_table}>
      <TableHead>
        <TableRow>
          <StyledTableCell isHeader width="300px">
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {group_name.replace("api", "API")}
            </span>
          </StyledTableCell>
          <StyledTableCell isHeader>Free</StyledTableCell>
          <StyledTableCell isHeader>Single Event</StyledTableCell>
          <StyledTableCell isHeader>Professional</StyledTableCell>
          <StyledTableCell isHeader>Network</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedFeatures.map((feature) => (
          <TableRow key={feature.name}>
            <StyledTableCell
              isFeatureName
              featureDescription={feature.description}
            >
              {feature.name}
            </StyledTableCell>
            <BooleanValue
              value={feature.free.has}
              description={feature.free.description}
            />
            <BooleanValue
              value={feature.single_event.has}
              description={feature.single_event.description}
            />
            <BooleanValue
              value={feature.professional.has}
              description={feature.professional.description}
            />
            <BooleanValue
              value={feature.network.has}
              description={feature.network.description}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeatureTable;
