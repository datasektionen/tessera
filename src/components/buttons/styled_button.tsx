import { Button, Typography, styled } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  bgColor?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  startDecorator?: React.ReactNode;
  textColor?: string;
  type?: "button" | "submit" | "reset";
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  color,
  bgColor = PALLETTE.offWhite,
  size,
  style,
  type = "button",
  textColor,
  disabled = false,
  startDecorator,
}) => {
  const ButtonStyled = styled(Button)(({ theme, disabled }) => ({
    transition: "all 0.2s ease-in-out",
    backgroundColor: disabled ? PALLETTE.charcoal : bgColor,
    borderColor: PALLETTE.cerise,
    "&:hover": {
      borderColor: PALLETTE.charcoal,
      backgroundColor: !disabled && PALLETTE.cerise,
      color: PALLETTE.charcoal + " !important",
    },
    ...style,
    color: textColor ? textColor : PALLETTE.charcoal,
  }));

  return (
    <ButtonStyled
      variant={"outlined"}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size={size}
      startDecorator={startDecorator}
    >
      <StyledText level="body-md" color={"inherit"}>
        {children}
      </StyledText>
    </ButtonStyled>
  );
};

export default StyledButton;
