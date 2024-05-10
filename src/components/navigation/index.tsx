import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PALLETTE from "../../theme/pallette";
import {
  Button,
  Chip,
  Grid,
  Link,
  MenuItem,
  Option,
  Select,
  Stack,
} from "@mui/joy";

import { useTranslation, Trans } from "react-i18next";
import StyledText from "../text/styled_text";
import { generateRoute, ROUTES } from "../../routes/def";
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
import { INavigationLoginOptions, RoleType } from "../../types";
import { isEventManager } from "../../utils/roles/manager";

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
  const { language: storedLanguage } = useSelector(
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
    setSelectedLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
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

const MaintenanceMessage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem("maintenanceMessageDismissed");
    if (!savedState) {
      setIsVisible(true);
    } else {
      setIsVisible(JSON.parse(savedState) ? false : true);
    }

    setIsLoading(false);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("maintenanceMessageDismissed", JSON.stringify(true));
  };

  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: PALLETTE.orange,
        padding: "16px",
        textAlign: "center",
      }}
    >
      <StyledText
        level="body-md"
        fontSize={20}
        color={PALLETTE.charcoal}
        fontWeight={600}
        sx={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        Scheduled maintenance: Between May 21 and June 1, we will be performing
        maintenance on Tessera. During this time, the website might be
        unavailable. We apologize for any inconvenience this may cause.
      </StyledText>

      <StyledButton
        size="sm"
        onClick={handleDismiss}
        style={{
          margin: "16px auto",
        }}
      >
        Dismiss
      </StyledButton>
    </Box>
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

interface NavigationBarProps {
  loginOptions?: INavigationLoginOptions;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ loginOptions }) => {
  const { t } = useTranslation();
  const { showLogin } = loginOptions || {
    showLogin: true,
  };

  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  if (isScreenSmall) {
    return <MobileNavigationBar />;
  } else
    return (
      <>
        <MaintenanceMessage />
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
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
              <Chip
                sx={{
                  backgroundColor: PALLETTE.cerise_dark,
                }}
              >
                <StyledText
                  level="body-sm"
                  fontSize={14}
                  fontWeight={800}
                  color={PALLETTE.offWhite}
                >
                  BETA
                </StyledText>
              </Chip>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              style={{
                padding: 0,
              }}
            >
              {isLoggedIn && [
                <StyledText
                  key="events"
                  level="body-sm"
                  color={""}
                  fontSize={18}
                  fontWeight={700}
                  style={{
                    margin: "0 16px",
                    textTransform: "uppercase",
                  }}
                >
                  <StyledLink href={ROUTES.EVENTS}>
                    {t("navigation.events")}
                  </StyledLink>
                </StyledText>,

                <StyledText
                  key="contact"
                  level="body-sm"
                  color={""}
                  fontSize={18}
                  fontWeight={700}
                  style={{
                    margin: "0 16px",
                    textTransform: "uppercase",
                  }}
                >
                  <StyledLink href={ROUTES.CONTACT_PAGE}>
                    {t("navigation.contact")}
                  </StyledLink>
                </StyledText>,
              ]}
              <StyledText
                level="body-sm"
                color={""}
                fontSize={18}
                fontWeight={700}
                style={{
                  margin: "0 16px",
                  textTransform: "uppercase",
                }}
              >
                <StyledLink href={generateRoute(ROUTES.PRICING, {})}>
                  {t("navigation.pricing")}
                </StyledLink>
              </StyledText>

              <StyledText
                level="body-sm"
                color={""}
                fontSize={18}
                fontWeight={700}
                style={{
                  margin: "0 16px",
                  textTransform: "uppercase",
                }}
              >
                <StyledLink
                  href={
                    currentUser
                      ? generateRoute(
                          isEventManager(currentUser!)
                            ? ROUTES.MANAGER_DASHBOARD
                            : ROUTES.BECOME_A_MANAGER,
                          {}
                        )
                      : ROUTES.LOGIN
                  }
                >
                  {t("navigation.manager")}
                </StyledLink>
              </StyledText>
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

              {isLoggedIn
                ? [
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
                : showLogin && (
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
      </>
    );
};

export default NavigationBar;
