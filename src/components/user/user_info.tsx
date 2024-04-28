import { Box, Button, Grid, Link, Stack, Typography } from "@mui/joy";
import { IUser } from "../../types";
import UserInfoText from "../text/user_info_text";
import { useTranslation } from "react-i18next";
import UserEmail from "./user_email";
import StyledButton from "../buttons/styled_button";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { t } = useTranslation();
  console.log(user);
  return (
    <>
      <Grid container spacing={1} columns={16} sx={{ flexGrow: 1 }}>
        <Grid xs={8}>
          <Box>
            <Stack direction="column" spacing={2}>
              <UserInfoText
                label={t("profile.full_name")}
                value={`${user.first_name} ${user.last_name}`}
              />
              <UserEmail user={user} />

              <UserInfoText
                label={t("profile.roles")}
                value={user.roles!.map((role) => role.name).join(", ")}
              />

              <UserInfoText
                label={t("profile.teams")}
                value={user.organizations!.map((org) => org.name).join(", ")}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid xs={8}>
          <Box>
            <Stack direction="column" spacing={2}>
              <Link
                href="/profile/ticket-requests"
                style={{
                  textDecoration: "none",
                }}
              >
                <StyledButton size="md">
                  {t("profile.links_and_buttons.your_ticket_requests")}
                </StyledButton>
              </Link>
              <Link
                href="/profile/tickets"
                style={{
                  textDecoration: "none",
                }}
              >
                <StyledButton size="md">
                  {t("profile.links_and_buttons.your_tickets")}
                </StyledButton>
              </Link>
              <Link
                href="/profile/organizations"
                style={{
                  textDecoration: "none",
                }}
              >
                <StyledButton size="md">
                  {t("profile.links_and_buttons.your_teams")}
                </StyledButton>
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
