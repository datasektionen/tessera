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
import { Stack } from "@mui/joy";

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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <StyledText
              level="body-md"
              fontSize={16}
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
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
