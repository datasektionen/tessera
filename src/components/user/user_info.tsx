import { Box, Button, Grid, Link, Stack, Typography } from "@mui/joy";
import { IUser } from "../../types";
import UserInfoText from "../text/user_info_text";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  console.log(user);
  return (
    <>
      <Grid container spacing={1} columns={16} sx={{ flexGrow: 1 }}>
        <Grid xs={8}>
          <Box>
            <Stack direction="column" spacing={2}>
              <UserInfoText
                label="Full name"
                value={`${user.first_name} ${user.last_name}`}
              />
              <UserInfoText label="Email" value={user.email} />
              <UserInfoText label="KTH ID" value={user.username} />

              <UserInfoText label="Role" value={user.role.name} />

              <UserInfoText
                label="Organizations"
                value={user.organizations.map((org) => org.name).join(", ")}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid xs={8}>
          <Box>
            <Stack direction="column" spacing={2}>
              <Link href="/profile/ticket-requests">
                <UserInfoText label="Your ticket requests" value="" />
              </Link>
              <Link href="/profile/tickets">
                <UserInfoText label="Your tickets" value="" />
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
