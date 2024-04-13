// CollapsibleDrawerSection.tsx
import React, { useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SubButton from "./sub_button";
import { useNavigate } from "react-router-dom";

interface CollapsibleDrawerSectionProps {
  title: string;
  icon: React.ReactNode;
  mainNavigateTo?: string;
  subItems: { title: string; navigateTo: string; clickable: boolean }[];
}

const CollapsibleDrawerSection: React.FC<CollapsibleDrawerSectionProps> = ({
  title,
  icon,
  mainNavigateTo = "",
  subItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <ListItem
      disablePadding
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Box sx={{ width: "100%" }}>
        <ListItemButton
          onClick={() => {
            if (mainNavigateTo) navigate(mainNavigateTo);
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <StyledText
              level="body-md"
              fontSize={18}
              color={PALLETTE.charcoal}
              sx={{
                m: 0,
                p: 0,
              }}
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </StyledText>
          </ListItemText>
          <ListItemIcon>
            <ExpandMoreIcon />
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={isOpen} sx={{ pb: 0 }}>
          <List component="div" disablePadding>
            {subItems.map((item) => (
              <SubButton
                key={item.title}
                title={item.title}
                onClick={() => {
                  if (item.clickable) {
                    navigate(item.navigateTo);
                  }
                }}
                clickable={item.clickable}
              />
            ))}
          </List>
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default CollapsibleDrawerSection;
