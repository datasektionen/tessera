// DrawerComponent.tsx
import React, { useEffect } from "react";
import { Drawer, List, useTheme, Box } from "@mui/material";
import PALLETTE from "../../../../theme/pallette";

import { Divider } from "@mui/material";
import StyledText from "../../../text/styled_text";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import DrawerListItem from "../drawer_list_item";
import { ROUTES, generateRoute } from "../../../../routes/def";
import { IconButton, Stack, Switch, Tooltip } from "@mui/joy";
import { DRAWER_WIDTH } from "../../../../hooks/drawer_pinned_hook";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import CollapsibleDrawerSection from "../collapsible_drawer_section";
import PushPinIcon from "@mui/icons-material/PushPin";
import { networkHasCreatedMerchant } from "../../../../utils/manager/merchant";
import { useNavigate } from "react-router-dom";

interface ManagerDashboardDrawerComponentProps {
  handlePinned: (isPinned: boolean) => void;
}

const ManagerDashboardDrawerComponent: React.FC<
  ManagerDashboardDrawerComponentProps
> = ({ handlePinned }) => {
  const navigate = useNavigate();
  // Paste the Drawer related code here
  // Redux State
  const { isPinned: initialIsPinned } = useSelector(
    (state: RootState) => state.drawerPinned
  );
  const { network } = useSelector((state: RootState) => state.network);

  // State Variables
  const [isPinned, setIsPinned] = React.useState<boolean | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    if (network && !networkHasCreatedMerchant(network)) {
      // navigate(ROUTES.MANAGER_SETUP) TODO WHEN DONE
    }
  }, [network, navigate]);

  // Other Variables
  const theme = useTheme();
  const { t } = useTranslation();

  // Effects
  useEffect(() => {
    if (isPinned === null && initialIsPinned !== null) {
      setIsPinned(initialIsPinned);
    }
  }, [initialIsPinned, isPinned]);

  // Conditional rendering
  if (isPinned === null) {
    return null;
  }

  // Derived state
  const isExtended = isHovered || isPinned;

  return (
    <Drawer
      open={isExtended}
      variant="permanent"
      onMouseEnter={() => !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isPinned && setIsHovered(false)}
      sx={{
        position: "relative",
        top: "64px", // replace this with the height of your navbar
        flexShrink: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [`& .MuiDrawer-paper`]: {
          width: isExtended ? DRAWER_WIDTH : theme.spacing(7),
          marginTop: "64px",
          backgroundColor: PALLETTE.cerise,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          boxSizing: "border-box",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "darkgrey",
            borderRadius: "4px",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(2),
            color: theme.palette.primary.contrastText,
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.2rem",
            width: !isExtended ? "0px" : "100%",
            height: "64px",
          }}
        >
          <div style={{
            display: isExtended ? "block" : "none",
            // display word wrap
            whiteSpace: "nowrap",
          }}>
            <StyledText
              level="h3"
              color={PALLETTE.cerise_dark}
              fontSize={24}
              fontWeight={600}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "75%",
              }}
            >
              {network?.name || "Network Name"}
            </StyledText>
            <StyledText
              level="h3"
              color={PALLETTE.charcoal}
              fontSize={16}
              fontWeight={500}
            >
              Manager Dashboard
            </StyledText>
          </div>
        </Box>
        <List
          sx={{
            pb: "128px",
          }}
        >
          <DrawerListItem
            text={t("manager.drawer.events")}
            icon={<EventIcon />}
            navigateTo={ROUTES.MANAGER_DASHBOARD}
          />
          <Divider sx={{ my: 0.25 }} />
          <DrawerListItem
            text={t("manager.drawer.teams")}
            icon={<GroupsIcon />}
            navigateTo={ROUTES.MANAGER_TEAMS}
          />
          <Divider sx={{ my: 0.25 }} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment}
            title={t("manager.drawer.settings.title")}
            icon={<SettingsIcon />}
            drawerExtended={isExtended}
            subItems={[
              {
                title: t("manager.drawer.settings.general"),
                clickable: false,
                navigateTo: ROUTES.MANAGER_SETTINGS_GENERAL,
              },
              {
                title: t("manager.drawer.settings.subscription"),
                clickable: false,
                navigateTo: ROUTES.MANAGER_SETTINGS_SUBSCRIPTION,
              },
              {
                title: t("manager.drawer.settings.financial"),
                clickable: false,
                navigateTo: ROUTES.MANAGER_SETTINGS_FINANCIAL,
              },
              {
                title: t("manager.drawer.settings.users"),
                clickable: false,
                navigateTo: ROUTES.MANAGER_SETTINGS_USERS,
              },
              {
                title: t("manager.drawer.settings.customize"),
                clickable: false,
                navigateTo: ROUTES.MANAGER_SETTINGS_USERS,
              },
            ]}
          />
          <Divider sx={{ my: 0.25 }} />
          <DrawerListItem
            icon={<AddIcon />}
            text={t("manager.drawer.create_event")}
            navigateTo={generateRoute(ROUTES.CREATE_EVENT, {})}
          />
        </List>
        {isExtended && (
          <Box
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
          >
            <IconButton
              onClick={() => {
                setIsPinned(!isPinned);
                handlePinned(!isPinned);
              }}
            >
              <Tooltip title={isPinned ? "Unpin" : "Pin"}>
                <PushPinIcon
                  color={isPinned ? "inherit" : "action"}
                  style={{ transform: "rotate(45deg)" }}
                />
              </Tooltip>
            </IconButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ManagerDashboardDrawerComponent;
