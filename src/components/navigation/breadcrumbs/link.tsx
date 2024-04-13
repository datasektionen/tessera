import { Link } from "@mui/joy";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";

interface BreadCrumbLinkProps {
  to: string;
  label: string;
}

const BreadCrumbLink: React.FC<BreadCrumbLinkProps> = ({ to, label }) => {
  return (
    <Link href={to}>
      <StyledText
        level="body-md"
        color={PALLETTE.charcoal_see_through}
        fontSize={18}
        fontWeight={600}
      >
        {label}
      </StyledText>
    </Link>
  );
};

export default BreadCrumbLink;
