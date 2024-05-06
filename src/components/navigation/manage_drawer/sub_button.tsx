import { Link, useNavigate } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { Chip, Stack } from "@mui/joy";
import { generateRoute, ROUTES } from "../../../routes/def";

interface SubButtonProps {
  title: string;
  icon?: JSX.Element;
  clickable: boolean;
  navigateTo: string;
  hasFeatureAccess?: boolean;
  requiredPlan?: string;
}

const SubButton: React.FC<SubButtonProps> = ({
  title,
  icon,
  clickable,
  navigateTo,
  hasFeatureAccess = true,
  requiredPlan,
}) => {
  const navigate = useNavigate();

  return (
    <ListItem
      key={"subbutton-" + title}
      sx={{
        height: 30,
      }}
    >
      <ListItemText>
        <Stack
          direction="row"
          alignContent={"center"}
          spacing={2}
          justifyContent={"space-between"}
          sx={{
            wrap: "nowrap",
          }}
        >
          <Link
            to={clickable && hasFeatureAccess ? navigateTo : "#"}
            style={{
              textDecoration: clickable && hasFeatureAccess ? "none" : "none",
            }}
          >
            <StyledText
              level="body-md"
              fontSize={17}
              color={
                clickable && hasFeatureAccess
                  ? PALLETTE.charcoal
                  : PALLETTE.charcoal_see_through
              }
              sx={{
                pl: 0.6,
                cursor: clickable && hasFeatureAccess ? "pointer" : "default",
                "&:hover": {
                  color:
                    clickable && hasFeatureAccess
                      ? PALLETTE.cerise_dark
                      : PALLETTE.charcoal_see_through,
                  textDecoration: clickable ? "underline" : "none",
                },
              }}
            >
              {title}
            </StyledText>
          </Link>
          {!hasFeatureAccess && (
            <Chip
              size="sm"
              sx={{
                backgroundColor: PALLETTE.cerise_dark,
              }}
            >
              <StyledText
                level="body-sm"
                color={PALLETTE.white}
                fontSize={14}
                fontWeight={600}
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
          )}
        </Stack>
      </ListItemText>
    </ListItem>
  );
};

export default SubButton;
