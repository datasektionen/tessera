import {
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Box,
} from "@mui/material";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { styled } from "@mui/joy";

interface SubButtonProps {
  title: string;
  icon?: JSX.Element;
  onClick: () => void;
  clickable: boolean;
}

const SubButton: React.FC<SubButtonProps> = ({
  title,
  icon,
  onClick,
  clickable,
}) => {
  return (
    <ListItem key={"subbutton-" + title}>
      <ListItemText>
        <StyledText
          level="body-md"
          fontSize={16}
          color={clickable ? PALLETTE.charcoal : PALLETTE.charcoal_see_through}
          onClick={clickable ? onClick : () => {}}
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
      </ListItemText>
    </ListItem>
  );
};

export default SubButton;
