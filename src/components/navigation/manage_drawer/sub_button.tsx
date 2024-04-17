import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";

interface SubButtonProps {
  title: string;
  icon?: JSX.Element;
  clickable: boolean;
  navigateTo: string;
}

const SubButton: React.FC<SubButtonProps> = ({
  title,
  icon,
  clickable,
  navigateTo,
}) => {
  return (
    <ListItem key={"subbutton-" + title}>
      <ListItemText>
        <Link
          to={navigateTo}
          style={{
            textDecoration: clickable ? "none" : "none",
          }}
        >
          <StyledText
            level="body-md"
            fontSize={17}
            color={
              clickable ? PALLETTE.charcoal : PALLETTE.charcoal_see_through
            }
            sx={{
              mb: -2.5,
              pl: 2,
              cursor: clickable ? "pointer" : "default",
              "&:hover": {
                color: clickable
                  ? PALLETTE.cerise_dark
                  : PALLETTE.charcoal_see_through,
                textDecoration: clickable ? "underline" : "none",
              },
            }}
          >
            {title}
          </StyledText>
        </Link>
      </ListItemText>
    </ListItem>
  );
};

export default SubButton;
