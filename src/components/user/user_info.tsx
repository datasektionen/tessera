import { Box, Button, Grid, Link, Stack, Typography } from "@mui/joy";
import { IUser } from "../../types";
import UserInfoText from "../text/user_info_text";
import { useTranslation } from "react-i18next";
import UserEmail from "./user_email";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const { t } = useTranslation();
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
                label={t("profile.username")}
                value={user.username}
              />

              <UserInfoText label={t("profile.role")} value={user.role!.name} />

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
              <Link href="/profile/ticket-requests">
                <UserInfoText
                  label={t("profile.links_and_buttons.your_ticket_requests")}
                  value=""
                />
              </Link>
              <Link href="/profile/tickets">
                <UserInfoText
                  label={t("profile.links_and_buttons.your_tickets")}
                  value=""
                />
              </Link>
              <Link href="/profile/organizations">
                <UserInfoText
                  label={t("profile.links_and_buttons.your_teams")}
                  value=""
                />
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
