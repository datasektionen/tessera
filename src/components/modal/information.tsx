import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";

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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default InformationModal;
