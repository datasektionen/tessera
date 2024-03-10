import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import styles from "./nav.module.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNavigationBar from "./mobile-nav";
import { is } from "date-fns/locale";
import { setLanguage } from "../../redux/features/languageSlice";
import { use } from "i18next";
import StyledButton from "../buttons/styled_button";
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

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language: storedLanaguage } = useSelector(
    (state: RootState) => state.language
  );
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (!newValue) {
      return;
    }
    i18n.changeLanguage(newValue);
  };
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setSelectedLanguage(i18n.language);
      dispatch(setLanguage(i18n.language));
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    setSelectedLanguage(storedLanaguage);
    i18n.changeLanguage(storedLanaguage);
  }, []);

  return (
    <Select
      style={{
        backgroundColor: PALLETTE.offWhite,
      }}
      value={selectedLanguage === "en-GB" ? "gb" : selectedLanguage}
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
        color: PALLETTE.charcoal,
        borderColor: PALLETTE.charcoal,
        "&:hover": {
          borderColor: PALLETTE.charcoal,
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

export const StyledLink = (props: any) => (
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
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  if (isScreenSmall) {
    return <MobileNavigationBar />;
  } else
    return (
      <Box
        sx={{
          margin: 0,
          padding: 0,
          backgroundColor: PALLETTE.cerise,
          color: "white",
          width: "100%",
          height: "64px",
          position: "sticky",
          top: 0,
          zIndex: 1000, // Ensure it stays on top of other elements
        }}
      >
        {/* Left-aligned "tessera" text */}
        <Grid
          container
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
            sx={{ textDecoration: "none", color: PALLETTE.charcoal }}
          >
            tessera
          </Typography>
          {isLoggedIn && (
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
              <StyledText
                level="body-sm"
                color={""}
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
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            style={{
              padding: 0,
            }}
          >
            <LanguageSelector />

            {isLoggedIn ? (
              [
                <IconButton
                  component="a"
                  key="profile"
                  href="/profile" // Link to the profile page
                >
                  <PersonIcon
                    style={{
                      color: PALLETTE.charcoal,
                    }}
                  />
                </IconButton>,
                <IconButton
                  component="a"
                  key="logout"
                  href="/logout" // Link to the logout page
                >
                  <LogoutIcon
                    style={{
                      color: PALLETTE.charcoal,
                    }}
                  />
                </IconButton>,
              ]
            ) : (
              <StyledButton
                color={PALLETTE.charcoal}
                size="sm"
                style={{
                  margin: "0 16px",
                }}
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                {t("navigation.login")}
              </StyledButton>
            )}
          </Stack>
        </Grid>
      </Box>
    );
}

export default NavigationBar;
