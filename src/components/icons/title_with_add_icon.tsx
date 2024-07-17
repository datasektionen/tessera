import { IconButton, Stack } from "@mui/joy";
import Title from "../text/title";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PALLETTE from "../../theme/pallette";

interface TitleWithAddIconProps {
  title: string;
  route: string;
}

const TitleWithAddIcon: React.FC<TitleWithAddIconProps> = ({
  title,
  route,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <Title
        fontSize={38}
        style={{
          textTransform: "capitalize",
        }}
      >
        {title}
      </Title>
      <IconButton onClick={() => navigate(route)}>
        <AddCircleOutlineIcon
          style={{
            color: PALLETTE.cerise,
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default TitleWithAddIcon;
