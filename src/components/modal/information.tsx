import { motion } from "framer-motion";
import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import StyledText from "../text/styled_text";
import PALLETTE from "../../theme/pallette";

const MotionModalDialog = motion(ModalDialog);

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const InformationModal: React.FC<InformationModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "30%",
}) => {
  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <MotionModalDialog
        color="primary"
        size="sm"
        variant="outlined"
        sx={{
          width: width,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 1 }}
      >
        <ModalClose onClick={() => onClose()} />
        <DialogTitle>
          <StyledText
            level="h3"
            color={PALLETTE.cerise_dark}
            fontSize={28}
            fontWeight={700}
          >
            {title}
          </StyledText>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </MotionModalDialog>
    </Modal>
  );
};

export default InformationModal;
