import React, { useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PALLETTE from "../../theme/pallette";
import { Drawer, Grid, Link, MenuItem, Option, Select, Stack } from "@mui/joy";

import { useTranslation, Trans } from "react-i18next";
import StyledText from "../text/styled_text";
import { ROUTES } from "../../routes/def";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./nav.module.css";
import StyledButton from "../buttons/styled_button";
import Menu from "@mui/icons-material/Menu";
import InformationModal from "../modal/information";
import { LanguageSelector, StyledLink } from ".";
import { useNavigate } from "react-router-dom";

const lngs = [
  {
    code: "gb",
    name: "English",
    nativeName: "English",
  },
  {
    code: "se",
    name: "Swedish",
    nativeName: "Svenska",
  },
];

function MobileNavigationBar() {
  const { t } = useTranslation();

  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [showMobileWarning, setShowMobileWarning] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const showMobileWarning = localStorage.getItem("showMobileWarning");

    if (showMobileWarning === null) {
      setShowMobileWarning(true);
    }
  }, [showDrawer]);

  return (
    <>
      <InformationModal
        title="Mobile Warning"
        isOpen={showMobileWarning}
        onClose={() => {
          setShowMobileWarning(false);
          localStorage.setItem("showMobileWarning", "true");
        }}
        width={"75%"}
      >
        <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
          {t("common.mobile_warning")}
        </StyledText>
      </InformationModal>
      <IconButton
        variant="outlined"
        color="neutral"
        style={{
          position: "fixed",
          top: "32px",
          right: "32px",
          zIndex: 1000,
          backgroundColor: PALLETTE.charcoal_see_through,
        }}
        onClick={() => setShowDrawer(true)}
      >
        <Menu />
      </IconButton>

      <Drawer
        anchor="left"
        open={showDrawer} // You can control this with a state
        onClose={() => {
          setShowDrawer(false);
        }} // Add your close handler here
      >
        <Box
          sx={{
            padding: "16px",
            marginLeft: "16px",
            marginRight: "16px",
          }}
        >
          <Typography
            level="h4"
            component="a"
            href="/" // Link to the main page
            fontFamily={"Josefin sans"}
            fontSize={24}
            sx={{ textDecoration: "none", color: PALLETTE.offWhite }}
          >
            tessera
          </Typography>
          {isLoggedIn && (
            <Stack
              direction="column"
              spacing={2}
              alignItems="flex-start"
              style={{
                padding: 0,
              }}
            >
              <StyledText
                level="body-sm"
                color={""}
                fontSize={18}
                style={{
                  margin: "0 16px",
                }}
              >
                <StyledLink href={ROUTES.EVENTS}>
                  {t("navigation.events")}
                </StyledLink>
              </StyledText>
              <StyledText
                color={""}
                level="body-sm"
                fontSize={18}
                style={{
                  margin: "0 16px",
                }}
              >
                <StyledLink href={ROUTES.CONTACT_PAGE}>
                  {t("navigation.contact")}
                </StyledLink>
              </StyledText>
            </Stack>
          )}
          {/* Right-aligned profile icon */}
          {isLoggedIn ? (
            <Stack
              direction="column"
              spacing={2}
              alignItems="flex-start"
              style={{
                padding: 0,
              }}
            >
              <IconButton
                component="a"
                href="/profile" // Link to the profile page
              >
                <PersonIcon
                  style={{
                    color: PALLETTE.offWhite,
                  }}
                />
              </IconButton>
              <IconButton
                component="a"
                href="/logout" // Link to the logout page
              >
                <LogoutIcon
                  style={{
                    color: PALLETTE.offWhite,
                  }}
                />
              </IconButton>
              <LanguageSelector />
            </Stack>
          ) : (
            <StyledButton
              size="sm"
              bgColor={PALLETTE.cerise}
              onClick={() => {
                setShowDrawer(false);
                navigate(ROUTES.LOGIN);
              }}
              style={{
                margin: "16px",
              }}
            >
              {t("navigation.login")}
            </StyledButton>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default MobileNavigationBar;
