import { Box, Grid, IconButton, Stack, Tooltip, useTheme } from "@mui/joy";
import PALLETTE from "../../../../theme/pallette";
import StyledText from "../../../text/styled_text";
import InfoIcon from "@mui/icons-material/Info";
import { useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
