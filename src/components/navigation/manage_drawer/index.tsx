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
import { ROUTES, generateRoute } from "../../../routes/def";
import { parse } from "path";

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
              navigateTo: generateRoute(ROUTES.MANAGE_EVENT_TICKET_RELEASES, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.tickets"),
              navigateTo: generateRoute(ROUTES.MANAGE_EVENT_TICKETS, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.form_responses"),
              navigateTo: generateRoute(ROUTES.MANAGE_EVENT_RESPONSES, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.manage.check_in"),
              navigateTo: generateRoute(ROUTES.TICKET_SCANNER, {
                eventId: eventID,
              }),
              clickable: true,
            },
          ]}
        />
        <CollapsibleDrawerSection
          icon={<EditIcon />}
          title={t("form.button_edit")}
          mainNavigateTo={generateRoute(ROUTES.EDIT_EVENT, {
            eventId: eventID,
          })}
          subItems={[
            {
              title: t("manage_event.drawer.edit.event"),
              navigateTo: generateRoute(ROUTES.EDIT_EVENT, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.edit.ticket_releases"),
              navigateTo: generateRoute(ROUTES.EDIT_EVENT_TICKET_RELEASES, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.edit.form"),
              navigateTo: generateRoute(ROUTES.EDIT_EVENT_FORM, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.edit.landing_page"),
              navigateTo: generateRoute(ROUTES.EDIT_EVENT_LANDING_PAGE, {
                eventId: eventID,
              }),
              clickable: true,
            },
          ]}
        />

        <CollapsibleDrawerSection
          icon={<MailIcon />}
          title={t("manage_event.drawer.send_outs.title")}
          mainNavigateTo={generateRoute(ROUTES.MANAGE_SEND_OUT_LIST, {
            eventId: eventID,
          })}
          subItems={[
            {
              title: t("manage_event.drawer.send_outs.new"),
              navigateTo: generateRoute(ROUTES.MANAGE_SEND_OUT_NEW, {
                eventId: eventID,
              }),
              clickable: true,
            },
          ]}
        />
        <CollapsibleDrawerSection
          icon={<AttachMoneyIcon />}
          title={t("manage_event.drawer.economy.title")}
          mainNavigateTo={generateRoute(ROUTES.MANAGE_EVENT_ECONOMY, {
            eventId: eventID,
          })}
          subItems={[
            {
              title: t("manage_event.drawer.economy.pay_outs"),
              navigateTo: generateRoute(``, {
                eventId: eventID,
              }),
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
              navigateTo: generateRoute(ROUTES.SETTIGNS_FINANCIAL, {
                eventId: eventID,
              }),
              clickable: true,
            },
            {
              title: t("manage_event.drawer.settings.emails"),
              navigateTo: generateRoute(``, {
                eventId: eventID,
              }),
              clickable: false,
            },
            {
              title: t("manage_event.drawer.settings.domains"),
              navigateTo: generateRoute(``, {
                eventId: eventID,
              }),
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
