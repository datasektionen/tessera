import { Box } from "@mui/joy";
import PALLETTE from "../../theme/pallette";

interface BorderBoxProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const BorderBox: React.FC<BorderBoxProps> = ({ children, style }) => {
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
    >
      {children}
    </Box>
  );
};

export default BorderBox;
