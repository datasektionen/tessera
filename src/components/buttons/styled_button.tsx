import { Button, ButtonProps, Typography, styled } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledButtonExtension extends Omit<ButtonProps, "color"> {
  children: React.ReactNode;
  bgColor?: string; // Renamed to avoid conflict with Button's 'color' prop
  color_?: string; // Renamed for consistency
  size: "sm" | "md" | "lg";
}

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: (() => void) | ((e: any) => void);
  bgColor?: string;
  color?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  startDecorator?: React.ReactNode;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  sx?: any;
  fs?: number;
}

const ButtonStyled = styled(Button)<StyledButtonExtension>(
  ({ theme, disabled, bgColor, color_ }) => ({
    transition: "all 0.2s ease-in-out",
    backgroundColor: disabled ? PALLETTE.charcoal : bgColor,
    borderColor: PALLETTE.cerise,
    "&:hover": {
      borderColor: PALLETTE.charcoal,
      backgroundColor: !disabled && PALLETTE.cerise,
      color: PALLETTE.charcoal + " !important",
    },
    color: color_ ? color_ : PALLETTE.cerise,
  })
);

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  bgColor = PALLETTE.offWhite,
  size,
  style,
  type = "button",
  color,
  disabled = false,
  startDecorator,
  textColor,
  sx = {},
  fs,
}) => {
  return (
    <ButtonStyled
      variant={"outlined"}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size={size}
      startDecorator={startDecorator}
      style={style}
      bgColor={bgColor}
      color_={color}
      sx={sx}
    >
      <StyledText
        level="body-md"
        color={disabled ? PALLETTE.offWhite : color!}
        fontSize={fs}
      >
        {children}
      </StyledText>
    </ButtonStyled>
  );
};
export default StyledButton;
