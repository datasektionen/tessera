// DrawerComponent.tsx
import React from "react";
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
import PALLETTE from "../../../theme/pallette";
import { useNavigate } from "react-router-dom";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Divider } from "@mui/material";
import StyledText from "../../text/styled_text";
import { useTranslation } from "react-i18next";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddIcon from "@mui/icons-material/Add";
import SubButton from "./sub_button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DrawerListItem from "./drawer_list_item";
import CollapsibleDrawerSection from "./collapsible_drawer_section";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 230;

interface DrawerComponentProps {
  eventID: string;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ eventID }) => {
  // Paste the Drawer related code here
  const [isManageHovered, setIsManageHovered] = React.useState(false);

  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const { t } = useTranslation();
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        top: "64px", // replace this with the height of your navbar
        width: isHovered ? drawerWidth : theme.spacing(7),
        flexShrink: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [`& .MuiDrawer-paper`]: {
          width: isHovered ? drawerWidth : theme.spacing(7),
          marginTop: "64px",
          backgroundColor: PALLETTE.cerise,
          // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.75)",

          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <CollapsibleDrawerSection
          title={t("manage_event.drawer.manage.title")}
          icon={<PanToolIcon />}
          mainNavigateTo={`/events/${eventID}/manage`}
          subItems={[
            {
              title: t("manage_event.drawer.manage.ticket_releases"),
              navigateTo: `/events/${eventID}/manage/ticket-releases`,
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.tickets"),
              navigateTo: `/events/${eventID}/manage/tickets`,
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.form_responses"),
              navigateTo: `/events/${eventID}/manage/event-form-responses`,
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.check_in"),
              navigateTo: `/events/${eventID}/manage/scan`,
              clickable: true,
            },
          ]}
        />
        <DrawerListItem
          icon={<EditIcon />}
          text={t("form.button_edit")}
          navigateTo={`/events/${eventID}/edit`}
        />

        <CollapsibleDrawerSection
          icon={<MailIcon />}
          title={t("manage_event.drawer.send_outs.title")}
          mainNavigateTo={`/events/${eventID}/send-out`}
          subItems={[
            {
              title: t("manage_event.drawer.send_outs.list"),
              navigateTo: `/events/${eventID}/send-outs`,
              clickable: false,
            },
            {
              title: t("manage_event.drawer.send_outs.new"),
              navigateTo: `/events/${eventID}/send-outs/new`,
              clickable: false,
            },
          ]}
        />
        <CollapsibleDrawerSection
          icon={<AttachMoneyIcon />}
          title={t("manage_event.drawer.economy.title")}
          mainNavigateTo={`/events/${eventID}/economy`}
          subItems={[
            {
              title: t("manage_event.drawer.economy.pay_outs"),
              navigateTo: `/events/${eventID}/economy/pay-outs`,
              clickable: false,
            },
          ]}
        />
        <CollapsibleDrawerSection
          title={t("manage_event.drawer.settings.title")}
          icon={<SettingsIcon />}
          subItems={[
            {
              title: t("manage_event.drawer.settings.financial"),
              navigateTo: `/events/${eventID}/manage/financial`,
              clickable: false,
            },
            {
              title: t("manage_event.drawer.settings.emails"),
              navigateTo: `/events/${eventID}/manage/emails`,
              clickable: false,
            },
            {
              title: t("manage_event.drawer.settings.landing_page"),
              navigateTo: `/events/${eventID}/manage/landing-page`,
              clickable: false,
            },
            {
              title: t("manage_event.drawer.settings.domains"),
              navigateTo: `/events/${eventID}/manage/domains`,
              clickable: false,
            },
          ]}
        />
        <Divider sx={{ my: 1 }} />
        <DrawerListItem
          icon={<AddIcon />}
          text={t("manage_event.add_ticket_release")}
          navigateTo={`/events/${eventID}/edit/add-ticket-release`}
        />
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
