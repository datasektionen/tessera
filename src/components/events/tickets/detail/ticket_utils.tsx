import {
  Box,
  Grid,
  IconButton,
  Option,
  Select,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/joy";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import InfoIcon from "@mui/icons-material/Info";
import { Fade, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { ITicketType } from "../../../../types";
import { useState } from "react";

export const LabelValue: React.FC<{
  label: string;
  value: React.ReactNode;
  style?: React.CSSProperties;
  tooltip?: string;
  editButton?: () => void;
}> = ({ label, value, tooltip, editButton }) => {
  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      columns={12}
      sx={{
        my: 0.5,
      }}
    >
      <Grid xs={6}>
        <StyledText
          level="button"
          color={PALLETTE.cerise_dark}
          fontSize={15}
          fontWeight={700}
          sx={{
            textTransform: "uppercase",
          }}
        >
          {label}
        </StyledText>
      </Grid>
      <Grid xs={5} container alignItems="center">
        <StyledText
          level="body-md"
          color={PALLETTE.charcoal}
          fontSize={17}
          fontWeight={400}
        >
          {value}
        </StyledText>
        {tooltip && (
          <Tooltip
            title={tooltip}
            sx={{ maxWidth: 300, whiteSpace: "pre-wrap" }}
          >
            <InfoIcon color="action" style={{ marginLeft: "8px" }} />
          </Tooltip>
        )}
      </Grid>
      {editButton && (
        <Grid xs={1} container justifyContent="flex-end">
          <IconButton onClick={editButton} size="sm">
            <EditIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export const TicketBatchLabelValue: React.FC<{
  label: string;
  value?: ITicketType;
  options: ITicketType[];
  style?: React.CSSProperties;
  onSave: (value: ITicketType) => void;
}> = ({ label, value, options, onSave }) => {
  const [selectedValue, setSelectedValue] = useState<number>(value?.id ?? 0);

  return (
    <Grid
      container
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      columns={12}
      sx={{
        my: 0.5,
      }}
    >
      <Grid xs={6}>
        <StyledText
          level="button"
          color={PALLETTE.cerise_dark}
          fontSize={15}
          fontWeight={700}
          sx={{
            textTransform: "uppercase",
          }}
        >
          {label}
        </StyledText>
      </Grid>
      <Grid xs={5} container alignItems="center">
        <Stack direction="row" spacing={1}>
          <Select
            sx={{
              width: "200px",
            }}
            value={selectedValue}
            onChange={(_, newValue) => {
              setSelectedValue(newValue as number);
            }}
          >
            {options.map((option: ITicketType) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
          <Fade in={selectedValue !== value?.id}>
            <IconButton
              style={{
                color: PALLETTE.dark_green,
                border: `1px solid ${PALLETTE.dark_green}`,
              }}
              onClick={() => {
                const selectedOption = options.find(
                  (option) => option.id === selectedValue
                );
                if (selectedOption) {
                  onSave(selectedOption);
                }
              }}
              size="sm"
            >
              <CheckIcon />
            </IconButton>
          </Fade>
        </Stack>
      </Grid>
    </Grid>
  );
};

export const TicketDetailWrapper: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      <Stack
        direction={isScreenSmall ? "column" : "row"}
        spacing={5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {children}
      </Stack>
    </Box>
  );
};
