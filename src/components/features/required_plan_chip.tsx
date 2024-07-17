import { Chip } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../text/styled_text";
import { generateRoute, ROUTES } from "../../routes/def";
import { useNavigate } from "react-router-dom";

interface RequiredPlanChipProps {
  requiredPlan: string;
}

const RequiredPlanChip: React.FC<RequiredPlanChipProps> = ({
  requiredPlan,
}) => {
  const navigate = useNavigate();

  return (
    <Chip
      size="sm"
      sx={{
        backgroundColor: PALLETTE.cerise_dark,
        height: 23,
      }}
    >
      <StyledText
        level="body-sm"
        color={PALLETTE.white}
        fontSize={12}
        fontWeight={500}
        onClick={() => {
          navigate(generateRoute(ROUTES.PRICING, {}));
        }}
        sx={{
          textTransform: "capitalize",
          cursor: "pointer",
        }}
      >
        {requiredPlan?.replaceAll("_", " ")}
      </StyledText>
    </Chip>
  );
};

export default RequiredPlanChip;
