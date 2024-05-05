// CollapsibleDrawerSection.tsx
import React, { useEffect, useState } from "react";
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
import { motion } from "framer-motion";
import { sub } from "date-fns";

interface CollapsibleDrawerSectionProps {
  title: string;
  icon: React.ReactNode;
  mainNavigateTo?: string;
  subItems: { title: string; navigateTo: string; clickable: boolean }[];
  drawerExtended: boolean;
}

const CollapsibleDrawerSection: React.FC<CollapsibleDrawerSectionProps> = ({
  title,
  icon,
  mainNavigateTo = "",
  subItems,
  drawerExtended,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  useEffect(() => {
    if (!isOpen && isCollapsing) {
      const timeoutId = setTimeout(() => {
        setIsCollapsing(false);
      }, 1000); // Adjust this value to match the duration of the drawer closing animation

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, isCollapsing]);

  const handleClick = () => {
    if (isOpen) {
      setIsCollapsing(true);
    }
    setIsOpen(!isOpen);
  };

  return (
    <ListItem
      disablePadding
      onClick={handleClick}
      sx={{
        mb: 1,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <ListItemButton
          onClick={() => {
            // if (mainNavigateTo) navigate(mainNavigateTo);
          }}
          sx={{
            height: "38px",
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
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExpandMoreIcon />
            </motion.div>
          </ListItemIcon>
        </ListItemButton>
        <Collapse
          key={"collapse-section-" + title}
          in={isOpen && drawerExtended}
          sx={{
            pb: 0,
          }}
          easing={"ease-in-out"}
          timeout={{ enter: 300, exit: 100 }}
        >
          <List
            component="div"
            sx={{
              height: `${subItems.length * 30}px`,
            }}
          >
            {subItems.map((item) => (
              <SubButton
                key={item.title}
                title={item.title}
                clickable={item.clickable}
                navigateTo={item.navigateTo}
              />
            ))}
          </List>
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default CollapsibleDrawerSection;
