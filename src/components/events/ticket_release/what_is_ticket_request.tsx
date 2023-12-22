import { Typography } from "@mui/joy";
import InformationModal from "../../modal/information";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WhaIsTicketRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <InformationModal
      isOpen={isOpen}
      onClose={onClose}
      title="What is a ticket request?"
    >
      <StyledText
        level="body-md"
        color={PALLETTE.charcoal}
        style={{ marginBottom: "16px" }}
      >
        When making a request, you are not guaranteed to get the tickets you
        want. The allocation of the tickets are done according to the Ticket
        Release Method, which is described in the release description.
      </StyledText>
    </InformationModal>
  );
};

export default WhaIsTicketRequestModal;
