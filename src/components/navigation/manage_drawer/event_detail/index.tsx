import React, { useEffect } from "react";
import { Drawer, List, useTheme, Box, IconButton } from "@mui/material";
import PALLETTE from "../../../../theme/pallette";
import MailIcon from "@mui/icons-material/Mail";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Divider } from "@mui/material";
import StyledText from "../../../text/styled_text";
import { useTranslation } from "react-i18next";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddIcon from "@mui/icons-material/Add";
import DrawerListItem from "../drawer_list_item";
import CollapsibleDrawerSection from "../collapsible_drawer_section";
import SettingsIcon from "@mui/icons-material/Settings";
import { ROUTES, generateRoute } from "../../../../routes/def";
import { DRAWER_WIDTH } from "../../../../hooks/drawer_pinned_hook";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useNetworkDetails } from "../../../../hooks/manager/network_details_hook";
import EventIcon from "@mui/icons-material/Event";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Stack, Tooltip } from "@mui/joy";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import { text } from "stream/consumers";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

interface DrawerComponentProps {
  eventID: string;
  handlePinned: (isPinned: boolean) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  eventID,
  handlePinned,
}) => {
  // Variables
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  // State Variables
  const [isPinned, setIsPinned] = React.useState<boolean | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const { event } = useSelector((state: RootState) => state.eventDetail);

  // Redux State
  const { isPinned: initialIsPinned } = useSelector(
    (state: RootState) => state.drawerPinned
  );

  // Custom Hooks
  const { network, loading } = useNetworkDetails();

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
            width: "0px", // Hide scrollbar for Webkit browsers
          },
          scrollbarWidth: "none", // Hide scrollbar for Firefox
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
            <Box>
              <IconButton onClick={() => {
                navigate(ROUTES.MANAGER_DASHBOARD)
              }}>
                <ArrowBackIcon
                  style={{
                    margin: 0,
                    color: PALLETTE.charcoal_see_through,
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Box>
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
              {event?.name || "Event Name"}
            </StyledText>
            <StyledText
              level="h3"
              color={PALLETTE.charcoal}
              fontSize={16}
              fontWeight={500}
            >
              Event Dashboard
            </StyledText>
          </div>
        </Box>
        <List
          sx={{
            pb: "128px",
          }}
        >
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            title={t("manage_event.drawer.manage.title")}
            icon={<PanToolIcon />}
            drawerExtended={isExtended}
            subItems={[
              {
                title: t("manage_event.drawer.manage.title"),
                navigateTo: generateRoute(ROUTES.MANAGE_EVENT, {
                  eventId: eventID,
                }),
                clickable: true,
              },
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
                requiredFeature: "check_in",
              },
            ]}
          />
          <Divider sx={{ my: 0.25 }} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            icon={<EditIcon />}
            title={t("form.button_edit")}
            drawerExtended={isExtended}
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
                title: t("manage_event.drawer.edit.event_page"),
                navigateTo: generateRoute(ROUTES.EDIT_EVENT_LANDING_PAGE_SETTINGS, {
                  eventId: eventID,
                }),
                clickable: true,
              },
            ]}
          />
          <Divider sx={{ my: 0.25 }} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            icon={<MailIcon />}
            title={t("manage_event.drawer.send_outs.title")}
            drawerExtended={isExtended}
            requiredFeature="send_outs"
            subItems={[
              {
                title: t("manage_event.drawer.send_outs.list"),
                navigateTo: generateRoute(ROUTES.MANAGE_SEND_OUT_LIST, {
                  eventId: eventID,
                }),
                clickable: true,
              },
              {
                title: t("manage_event.drawer.send_outs.new"),
                navigateTo: generateRoute(ROUTES.MANAGE_SEND_OUT_NEW, {
                  eventId: eventID,
                }),
                clickable: true,
              },
            ]}
          />{" "}
          <Divider sx={{ my: 0.25 }} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            icon={<AttachMoneyIcon />}
            title={t("manage_event.drawer.economy.title")}
            drawerExtended={isExtended}
            subItems={[
              {
                title: t("manage_event.drawer.economy.sales_report"),
                navigateTo: generateRoute(ROUTES.MANAGE_EVENT_ECONOMY, {
                  eventId: eventID,
                }),
                clickable: true,
                requiredFeature: "sales_reports",
              },
            ]}
          />{" "}
          <Divider sx={{ my: 0.25 }} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            title={t("manage_event.drawer.settings.title")}
            icon={<SettingsIcon />}
            drawerExtended={isExtended}
            subItems={[
              {
                title: t("manage_event.drawer.settings.emails"),
                navigateTo: generateRoute(``, {
                  eventId: eventID,
                }),
                clickable: false,
                requiredFeature: "custom_emails",
              },
              {
                title: t("manage_event.drawer.settings.domains"),
                navigateTo: generateRoute(``, {
                  eventId: eventID,
                }),
                clickable: false,
                requiredFeature: "custom_domains",
              },
            ]}
          />
          <Divider sx={{ my: 0.25 }} />
          <DrawerListItem
            icon={<AddIcon />}
            text={t("manage_event.add_ticket_release")}
            navigateTo={`/events/${eventID}/edit/add-ticket-release`}
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

export default DrawerComponent;
