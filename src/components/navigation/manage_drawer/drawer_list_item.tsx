// DrawerListItem.tsx
import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useNavigate } from "react-router-dom";

interface DrawerListItemProps {
  icon: React.ReactNode;
  text: string;
  navigateTo: string;
}

const DrawerListItem: React.FC<DrawerListItemProps> = ({
  icon,
  text,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(navigateTo)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <StyledText
            level="body-md"
            fontSize={17}
            color={PALLETTE.charcoal}
            sx={{
              m: 0,
              p: 0,
            }}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </StyledText>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
