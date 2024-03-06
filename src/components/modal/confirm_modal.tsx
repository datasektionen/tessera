import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";
import StyledButton from "../buttons/styled_button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  actions: React.ReactNode[];
  children: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <ModalDialog color="primary" size="sm" variant="outlined">
        <ModalClose onClick={() => onClose()} />
        <DialogTitle>
          <StyledText level="h4" color={PALLETTE.cerise_dark} fontSize={22}>
            {title}
          </StyledText>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ConfirmModal;
