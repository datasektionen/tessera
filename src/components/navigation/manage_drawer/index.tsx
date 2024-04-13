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

const drawerWidth = 230;

interface DrawerComponentProps {
  eventID: string;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ eventID }) => {
  // Paste the Drawer related code here
  const [isManageHovered, setIsManageHovered] = React.useState(false);

  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          key="Manage"
          disablePadding
          onMouseEnter={() => setIsManageHovered(true)}
          onMouseLeave={() => setIsManageHovered(false)}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate(`/events/${eventID}/manage`);
              }}
            >
              <ListItemIcon>
                <PanToolIcon />
              </ListItemIcon>
              <ListItemText>
                <StyledText
                  level="body-md"
                  fontSize={16}
                  color={PALLETTE.charcoal}
                  sx={{
                    m: 0,
                    p: 0,
                  }}
                >
                  {t("form.button_manage")}
                </StyledText>
              </ListItemText>
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            </ListItemButton>
            <Collapse
              in={isManageHovered}
              sx={{
                pb: 1,
              }}
            >
              <List component="div" disablePadding>
                <SubButton
                  title="Ticket Releases"
                  onClick={() => {
                    navigate(`/events/${eventID}/manage/ticket-releases`);
                  }}
                  clickable={true}
                />
                <SubButton
                  title="Tickets"
                  onClick={() => {
                    window.location.href = `/events/${eventID}/manage/tickets`;
                  }}
                  clickable={true}
                />

                {/* Add more sub-buttons here */}
              </List>
            </Collapse>
          </Box>
        </ListItem>
        <ListItem key="Edit" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/events/${eventID}/edit`);
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              <StyledText
                level="body-md"
                fontSize={16}
                color={PALLETTE.charcoal}
                sx={{
                  m: 0,
                  p: 0,
                }}
              >
                {t("form.button_edit")}
              </StyledText>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key="CheckIn" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/events/${eventID}/manage/scan`);
            }}
          >
            <ListItemIcon>
              <QrCodeScannerIcon />
            </ListItemIcon>
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
                {t("form.button_check_in")}
              </StyledText>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key="SendOut" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/events/${eventID}/send-out`);
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
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
                {t("form.button_send_out")}
              </StyledText>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key="Economy" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/events/${eventID}/economy`);
            }}
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
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
                {t("form.button_economy")}
              </StyledText>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem key="AddTicketRelease" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/events/${eventID}/edit/add-ticket-release`);
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
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
                {t("manage_event.add_ticket_release")}
              </StyledText>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

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
      {drawer}
    </Drawer>
  );
};

export default DrawerComponent;
