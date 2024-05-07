// DrawerComponent.tsx
import React, { useEffect } from "react";
import { Drawer, List, useTheme, Box } from "@mui/material";
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
import { Stack, Switch } from "@mui/joy";
import { DRAWER_WIDTH } from "../../../../hooks/drawer_pinned_hook";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useNetworkDetails } from "../../../../hooks/manager/network_details_hook";

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

  // State Variables
  const [isPinned, setIsPinned] = React.useState<boolean | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);

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
          <Divider sx={{ my: 1 }} light={true} />
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
                title: t("manage_event.drawer.edit.landing_page"),
                navigateTo: generateRoute(``, {
                  eventId: eventID,
                }),
                clickable: false,
              },
            ]}
          />
          <Divider sx={{ my: 1 }} light={true} />
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
          <Divider sx={{ my: 1 }} light={true} />
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
          <Divider sx={{ my: 1 }} light={true} />
          <CollapsibleDrawerSection
            planEnrollment={network?.plan_enrollment!}
            title={t("manage_event.drawer.settings.title")}
            icon={<SettingsIcon />}
            drawerExtended={isExtended}
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
                  Quick Actions
                </StyledText>
              </motion.div>
            ) : null}
          </Divider>
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

export default DrawerComponent;
