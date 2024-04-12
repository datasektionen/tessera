import { Box } from "@mui/joy";
import PALLETTE from "../../theme/pallette";

interface BorderBoxProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const BorderBox: React.FC<BorderBoxProps> = ({ children, style, onClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderColor: PALLETTE.cerise,
        borderWidth: "1px",
        borderStyle: "solid",
        padding: "16px",
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default BorderBox;
