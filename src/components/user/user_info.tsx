import { Box, Stack } from "@mui/joy";
import { IUser } from "../../types";

interface UserInfoProps {
  user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <>
      <Box>
        <Stack direction="column" spacing={2}>
          <Box>
            <b>KTH ID: </b> {user.ug_kth_id}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default UserInfo;
