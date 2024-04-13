import { Box, Grid, Stack, useTheme } from "@mui/joy";
import {
  FoodPreferences,
  IFoodPreference,
  IUser,
  IUserFoodPreference,
} from "../../../../types";
import StyledText from "../../../text/styled_text";
import PALLETTE from "../../../../theme/pallette";
import { useTranslation } from "react-i18next";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import UserInfoText from "../../../text/user_info_text";
import { useMediaQuery } from "@mui/material";
import { LabelValue } from "./ticket_utils";

interface TicketUserDetailProps {
  user: IUser;
}

const TicketUserDetail: React.FC<TicketUserDetailProps> = ({ user }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ width: "800px" }}>
      <Stack
        direction={isScreenSmall ? "column" : "row"}
        spacing={5}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ width: "400px" }}>
          <StyledText
            level="body-sm"
            color={PALLETTE.cerise}
            fontWeight={600}
            fontSize={20}
          >
            {t("manage_event.tickets.user.info")}
          </StyledText>
          <LabelValue
            label={t("manage_event.tickets.user.id")}
            value={user.ug_kth_id}
          />
          <LabelValue
            label={t("manage_event.tickets.user.full_name")}
            value={`${user.first_name} ${user.last_name}`}
          />
          <LabelValue
            label={t("manage_event.tickets.user.username")}
            value={user.username}
          />
          <LabelValue
            label={t("manage_event.tickets.user.email")}
            value={
              <a
                href={`mailto:${user.email}`}
                style={{ color: PALLETTE.dark_green }}
              >
                {user.email}
              </a>
            }
          />
          <LabelValue
            label={t("manage_event.tickets.user.is_external")}
            value={
              user.is_external ? (
                <CheckIcon color="success" />
              ) : (
                <CloseIcon color="error" />
              )
            }
          />
        </Box>
        <Box>
          <StyledText
            level="body-sm"
            color={PALLETTE.cerise}
            fontWeight={600}
            fontSize={20}
          >
            {t("manage_event.tickets.user.food_preferences")}
          </StyledText>
          {FoodPreferences.map((pref: IFoodPreference) => {
            const userFoodPref: IUserFoodPreference = user.food_preferences!;
            const checked = userFoodPref[pref.id as keyof IUserFoodPreference];
            if (!checked) return null;
            return (
              <LabelValue
                label={pref.label}
                value={checked && <CheckIcon color="success" />}
              />
            );
          })}
          <UserInfoText
            label="Additional info"
            value={
              user.food_preferences?.additional
                ? user.food_preferences?.additional
                : "No additional info"
            }
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default TicketUserDetail;
