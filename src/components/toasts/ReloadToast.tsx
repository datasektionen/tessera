import React from "react";
import { ToastContent, toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import { Box, IconButton } from "@mui/joy";
import StyledButton from "../buttons/styled_button";

interface ReloadToastProps {
  message: string;
}

const ReloadToastContent: React.FC<ReloadToastProps> = ({ message }) => {
  const onClick = () => {
    window.location.reload();
  };

  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <StyledText color={PALLETTE.charcoal} fontSize={16} level="body-sm">
        {message}
      </StyledText>
      <IconButton
        style={{ marginLeft: "8px", cursor: "pointer" }}
        onClick={onClick}
      >
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};

export default ReloadToastContent;
