import { Button, Typography } from "@mui/joy";
import PALLETTE from "../../theme/pallette";

interface SaveButtonProps {
  onClick: () => void;
  color?: string;
  style?: React.CSSProperties;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, color, style }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      size="md"
      style={{
        ...style,
        borderColor: PALLETTE.cerise,
      }}
    >
      <Typography level="body-sm" fontFamily={"Josefin sans"} fontWeight={700}>
        Save
      </Typography>
    </Button>
  );
};

export default SaveButton;
