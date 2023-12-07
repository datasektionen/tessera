import { Box, styled } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import StyledText from "../text/styled_text";

const StyledBorderBox = styled(Box)(({ theme }) => ({
  // On hover
  padding: "16px",
  backgroundColor: PALLETTE.offWhite,
  borderRadius: "0px",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: PALLETTE.cerise,
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",

  "&:hover": {
    borderColor: PALLETTE.charcoal,
    backgroundColor: PALLETTE.offWhite,
    transition: "all 0.1s ease-in-out",
  },
}));
interface MainPageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MainPageButton: React.FC<MainPageButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <StyledBorderBox
      onClick={onClick}
      style={{
        width: "fit-content",
        color: PALLETTE.offWhite,
        borderWidth: "2px",
        borderRadius: "0px",
      }}
    >
      <StyledText level="body-md" color={PALLETTE.cerise} fontSize={40}>
        {children}
      </StyledText>
    </StyledBorderBox>
  );
};

export default MainPageButton;
