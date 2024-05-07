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
import { motion } from "framer-motion";
import { IPlanEnrollment } from "../../../types";
import {
  getFeaturesPackageTier,
  hasFeatureAccess,
} from "../../../utils/manager/require_feature";
import { Chip, Stack } from "@mui/joy";
import RequiredPlanChip from "../../features/required_plan_chip";

interface SubItem {
  title: string;
  navigateTo: string;
  clickable: boolean;
  requiredFeature?: string;
}

interface CollapsibleDrawerSectionProps {
  title: string;
  icon: React.ReactNode;
  mainNavigateTo?: string;
  subItems: SubItem[];
  drawerExtended: boolean;
  planEnrollment?: IPlanEnrollment; // From network
  requiredFeature?: string;
}

const CollapsibleDrawerSection: React.FC<CollapsibleDrawerSectionProps> = ({
  title,
  icon,
  mainNavigateTo = "",
  subItems,
  drawerExtended,
  planEnrollment,
  requiredFeature,
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

  const featureAccess = requiredFeature
    ? hasFeatureAccess(requiredFeature, planEnrollment)
    : true;

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
              {title}
            </StyledText>
          </ListItemText>
          {requiredFeature && !featureAccess ? (
            <RequiredPlanChip
              requiredPlan={
                getFeaturesPackageTier(
                  requiredFeature,
                  planEnrollment
                ) as string
              }
            />
          ) : (
            <ListItemIcon>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExpandMoreIcon />
              </motion.div>
            </ListItemIcon>
          )}
        </ListItemButton>

        <Collapse
          key={"collapse-section-" + title}
          in={isOpen && drawerExtended && featureAccess}
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
            {subItems.map((item) => {
              let subFeatAcess = false;
              let requiredPlan = "";
              if (item.requiredFeature) {
                if (hasFeatureAccess(item.requiredFeature, planEnrollment)) {
                  subFeatAcess = true;
                } else {
                  requiredPlan = getFeaturesPackageTier(
                    item.requiredFeature,
                    planEnrollment
                  ) as string;
                }
              } else {
                subFeatAcess = true;
              }

              return (
                <Stack
                  key={item.title}
                  spacing={1}
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                >
                  <SubButton
                    key={item.title}
                    title={item.title}
                    clickable={item.clickable}
                    navigateTo={item.navigateTo}
                    hasFeatureAccess={subFeatAcess}
                    requiredPlan={requiredPlan}
                  />
                </Stack>
              );
            })}
          </List>
        </Collapse>
      </Box>
    </ListItem>
  );
};

export default CollapsibleDrawerSection;
