import { Button, Typography } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color: string;
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
  return (
    <Button
      variant={"outlined"}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size={size}
      startDecorator={startDecorator}
      style={{
        backgroundColor: disabled ? PALLETTE.charcoal : bgColor,
        borderColor: PALLETTE.cerise,
        ...style,
      }}
    >
      <StyledText level="body-md" color={disabled ? PALLETTE.offWhite : color}>
        {children}
      </StyledText>
    </Button>
  );
};

export default StyledButton;
