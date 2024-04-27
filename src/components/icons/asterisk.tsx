import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PALLETTE from "../../theme/pallette";

const AsteriskIcon: React.FC<{
  size?: number;
  ml?: number;
  color?: string;
}> = ({ size = 24, ml = 0, color = PALLETTE.charcoal }) => {
  return (
    <FontAwesomeIcon
      icon={faAsterisk}
      style={{
        fontSize: size,
        verticalAlign: "top", // Add this line
        marginLeft: 3,
        color,
      }}
    />
  );
};

export default AsteriskIcon;
