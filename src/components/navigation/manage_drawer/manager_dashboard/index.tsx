// DrawerComponent.tsx
import React, { useEffect } from "react";
import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Box,
} from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import { useNavigate } from "react-router-dom";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Divider } from "@mui/material";
import StyledText from "../../../text/styled_text";
import { useTranslation } from "react-i18next";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddIcon from "@mui/icons-material/Add";
import SubButton from "../sub_button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DrawerListItem from "../drawer_list_item";
import CollapsibleDrawerSection from "../collapsible_drawer_section";
import { ROUTES, generateRoute } from "../../../../routes/def";
import PinIcon from "@mui/icons-material/Pin";
import { parse } from "path";
import { ListDivider, Stack, Switch } from "@mui/joy";
import { DRAWER_WIDTH } from "../../../../hooks/drawer_pinned_hook";
import { is } from "date-fns/locale";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
interface ManagerDashboardDrawerComponentProps {
  handlePinned: (isPinned: boolean) => void;
}

const ManagerDashboardDrawerComponent: React.FC<
  ManagerDashboardDrawerComponentProps
> = ({ handlePinned }) => {
  // Paste the Drawer related code here
  const { isPinned: initialIsPinned } = useSelector(
    (state: RootState) => state.drawerPinned
  );

  const [isPinned, setIsPinned] = React.useState<boolean | null>(null);
  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isPinned === null && initialIsPinned !== null) {
      setIsPinned(initialIsPinned);
    }
  }, [initialIsPinned, isPinned]);

  if (isPinned === null) {
    return null;
  }

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
          <Divider sx={{ my: 1 }} light={true} />
          <DrawerListItem
            text={t("manager.drawer.teams")}
            icon={<GroupsIcon />}
            navigateTo={ROUTES.MANAGER_TEAMS}
          />
          <Divider sx={{ my: 1 }} light={true} />
          <CollapsibleDrawerSection
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
            ]}
          />
          <Divider sx={{ mb: 1, mt: 3 }} textAlign="center">
            {isExtended ? (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <StyledText
                  level="body-sm"
                  color={PALLETTE.charcoal}
                  fontSize={16}
                  fontWeight={700}
                >
                  Actions
                </StyledText>
              </motion.div>
            ) : null}
          </Divider>
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
              bottom: "10%",
            }}
          >
            {/* ...existing list items... */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ ml: 2 }}
              spacing={2}
            >
              <Switch
                checked={isPinned}
                onChange={() => {
                  setIsPinned(!isPinned);
                  handlePinned(!isPinned);
                }}
              />
              <StyledText level="body-sm" color={PALLETTE.charcoal}>
                {isPinned
                  ? t("manage_event.drawer.is_pinned")
                  : t("manage_event.drawer.is_not_pinned")}
              </StyledText>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ManagerDashboardDrawerComponent;
