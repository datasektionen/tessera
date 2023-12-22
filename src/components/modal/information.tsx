import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InformationModal: React.FC<InformationModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <ModalDialog color="primary" size="sm" variant="outlined">
        <ModalClose onClick={() => onClose()} />
        <DialogTitle>
          <StyledText
            level="h3"
            color={PALLETTE.cerise}
            fontSize={28}
            fontWeight={700}
          >
            {title}
          </StyledText>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default InformationModal;
