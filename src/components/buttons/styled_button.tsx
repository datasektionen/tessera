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
  type?: "button" | "submit" | "reset";
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  color,
  bgColor,
  size,
  style,
  type = "button",
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
        backgroundColor: PALLETTE.offWhite,
        color: color,
        borderColor: PALLETTE.cerise,
        ...style,
      }}
    >
      <StyledText level="body-md" color={PALLETTE.cerise}>
        {children}
      </StyledText>
    </Button>
  );
};

export default StyledButton;
