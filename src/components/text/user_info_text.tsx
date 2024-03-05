import { Box, Stack, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { ReactNode } from "react";

interface UserInfoTextProps {
  label: string;
  value: string | ReactNode;
  labelStyle?: React.CSSProperties;
}

const UserInfoText: React.FC<UserInfoTextProps> = ({
  label,
  value,
  labelStyle,
}) => {
  return (
    <Stack direction="column" spacing={-0.5}>
      <Typography
        level="h4"
        fontFamily={"Josefin Sans"}
        style={{
          color: PALLETTE.cerise_dark,
        }}
      >
        {label}
      </Typography>
      <Typography
        level="body-md"
        fontFamily={"Josefin Sans"}
        style={{
          color: PALLETTE.charcoal,
          ...labelStyle,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default UserInfoText;
