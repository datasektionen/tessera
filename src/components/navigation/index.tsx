import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PALLETTE from "../../theme/pallette";
import { Grid, Link, MenuItem, Option, Select, Stack } from "@mui/joy";

import { useTranslation, Trans } from "react-i18next";
import StyledText from "../text/styled_text";
import { ROUTES } from "../../routes/def";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./nav.module.css";
import { isMobile } from "react-device-detect";
import MobileNavigationBar from "./mobile-nav";

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

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (!newValue) {
      return;
    }
    i18n.changeLanguage(newValue);
  };

  return (
    <Select
      style={{
        backgroundColor: PALLETTE.offWhite,
      }}
      value={i18n.language === "en-GB" ? "gb" : i18n.language}
      defaultValue={"gb"}
      onChange={handleChange}
      renderValue={(selected) => (
        <img
          alt={i18n.language}
          src={`https://flagcdn.com/16x12/${
            i18n.language === "en-GB" ? "gb" : i18n.language
          }.png`}
        />
      )}
      sx={{
        color: PALLETTE.offWhite,
        borderColor: PALLETTE.offWhite,
        "&:hover": {
          borderColor: PALLETTE.offWhite,
        },
      }}
    >
      {lngs.map((lng, index) => {
        return (
          <Option value={lng.code} key={index}>
            <img
              alt={lng.nativeName}
              src={`https://flagcdn.com/16x12/${
                lng.code === "en-GB" ? "gb" : lng.code
              }.png`}
              style={{
                marginRight: 8,
              }}
            />
            {lng.nativeName}
          </Option>
        );
      })}
    </Select>
  );
};

const StyledLink = (props: any) => (
  <Link
    {...props}
    className={styles.link}
    style={{
      color: PALLETTE.charcoal,
    }}
  />
);
function NavigationBar() {
  const { t } = useTranslation();

  const { user: currentUser } = useSelector((state: RootState) => state.user);

  if (isMobile) {
    return <MobileNavigationBar />;
  }

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor: PALLETTE.cerise,
        color: "white",
        width: "100vw",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 1000, // Ensure it stays on top of other elements
      }}
    >
      {/* Left-aligned "tessera" text */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
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
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
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
          {!currentUser?.is_external && (
            <StyledText
              color={""}
              level="body-sm"
              fontSize={18}
              style={{
                margin: "0 16px",
              }}
            >
              <StyledLink href={ROUTES.CREATE_EVENT}>
                {t("navigation.create_event")}
              </StyledLink>
            </StyledText>
          )}
          {!currentUser?.is_external && (
            <StyledText
              color={""}
              level="body-sm"
              fontSize={18}
              style={{
                margin: "0 16px",
              }}
            >
              <StyledLink href={ROUTES.PROFILE_ORGANIZATIONS}>
                {t("navigation.teams")}
              </StyledLink>
            </StyledText>
          )}
        </Stack>
        {/* Right-aligned profile icon */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          style={{
            padding: 0,
          }}
        >
          <LanguageSelector />

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
        </Stack>
      </Grid>
    </Box>
  );
}

export default NavigationBar;
