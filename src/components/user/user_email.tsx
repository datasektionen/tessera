import { useTranslation } from "react-i18next";
import { IUser } from "../../types";
import UserInfoText from "../text/user_info_text";
import { Box, Stack } from "@mui/joy";

interface UserEmailProps {
  user: IUser;
}

const UserEmail: React.FC<UserEmailProps> = ({ user }) => {
  const { t } = useTranslation();

  return user.is_external ? (
    <UserInfoText label={t("profile.external_email")} value={user.email} />
  ) : (
    <Box>
      <Stack direction="column" spacing={1}>
        <UserInfoText label={t("profile.email")} value={user.email} />
      </Stack>
    </Box>
  );
};

export default UserEmail;
