import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import StyledButton from "./styled_button";
import PALLETTE from "../../theme/pallette";
import { resetCompletely } from "../../redux/features/eventCreationSlice";
import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useState } from "react";
import StyledText from "../text/styled_text";
import ConfirmModal from "../modal/confirm_modal";

const RestartEventCreationButton: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleRestart = () => {
    dispatch(resetCompletely());
    window.location.reload();
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    handleRestart();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const actions: React.ReactNode[] = [
    <StyledButton
      onClick={handleConfirm}
      color={PALLETTE.cerise}
      bgColor={PALLETTE.offWhite}
      size="md"
      style={{ marginTop: "16px" }}
    >
      Confirm
    </StyledButton>,
    <StyledButton
      onClick={handleClose}
      color={PALLETTE.red}
      bgColor={PALLETTE.offWhite}
      size="md"
      style={{ marginTop: "16px" }}
    >
      Cancel
    </StyledButton>,
  ];

  return (
    <>
      <StyledButton
        onClick={() => setIsOpen(true)}
        textColor={PALLETTE.red}
        size="md"
      >
        Restart
      </StyledButton>

      <ConfirmModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Restart Event Creation"
        actions={actions}
      >
        <StyledText level="body-md" color={PALLETTE.charcoal}>
          Are you sure you want to restart event creation? All progress will be
          lost.
        </StyledText>
      </ConfirmModal>
    </>
  );
};

export default RestartEventCreationButton;
