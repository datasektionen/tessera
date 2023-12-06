import { Box, Stack, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";

interface UserInfoTextProps {
  label: string;
  value: string;
}

const UserInfoText: React.FC<UserInfoTextProps> = ({ label, value }) => {
  return (
    <Stack direction="column" spacing={-0.5}>
      <Typography
        level="h4"
        fontFamily={"Josefin Sans"}
        style={{
          color: PALLETTE.cerise,
        }}
      >
        {label}
      </Typography>
      <Typography
        level="body-md"
        fontFamily={"Josefin Sans"}
        style={{
          color: PALLETTE.charcoal,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default UserInfoText;
