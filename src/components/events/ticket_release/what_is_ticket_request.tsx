import { Typography } from "@mui/joy";
import InformationModal from "../../modal/information";

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
      <Typography level="body-md" fontFamily={"Josefin sans"} fontWeight={300}>
        When making a request, you are not guaranteed to get the tickets you
        want. The allocation of the tickets are done according to the Ticket
        Release Method, which is described in the release description.
      </Typography>
    </InformationModal>
  );
};

export default WhaIsTicketRequestModal;
