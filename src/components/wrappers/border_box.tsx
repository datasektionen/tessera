import { Box } from "@mui/joy";
import PALLETTE from "../../theme/pallette";
import { selectAccentColor } from "../../redux/features/managerThemeSlice";
import { useSelector } from "react-redux";

interface BorderBoxProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const BorderBox: React.FC<BorderBoxProps> = ({ children, style, onClick }) => {
  const accentColor = useSelector(selectAccentColor);

  return (
    <Box
      sx={{
        width: "100%",
        borderColor: accentColor !== "" ? accentColor : PALLETTE.cerise,
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
