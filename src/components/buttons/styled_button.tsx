import { Button, Typography } from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface StyledButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  color: string;
  bgColor?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  size: "sm" | "md" | "lg";
  startDecorator?: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  color,
  bgColor,
  size,
  style,
  disabled = false,
  startDecorator,
}) => {
  return (
    <Button
      variant={"outlined"}
      onClick={onClick}
      disabled={disabled}
      size={size}
      startDecorator={startDecorator}
      style={{
        ...style,
        color: color,
        backgroundColor: PALLETTE.charcoal,
      }}
    >
      <StyledText level="body-md" color={PALLETTE.cerise}>
        {children}
      </StyledText>
    </Button>
  );
};

export default StyledButton;
