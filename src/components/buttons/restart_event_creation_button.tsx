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
import { useTranslation } from "react-i18next";

const RestartEventCreationButton: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

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
      key="confirm"
      onClick={handleConfirm}
      color={PALLETTE.cerise}
      bgColor={PALLETTE.offWhite}
      size="md"
      style={{ marginTop: "16px" }}
    >
      {t("form.button_confirm")}
    </StyledButton>,
    <StyledButton
      key="cancel"
      onClick={handleClose}
      color={PALLETTE.red}
      bgColor={PALLETTE.offWhite}
      size="md"
      style={{ marginTop: "16px" }}
    >
      {t("form.button_cancel")}
    </StyledButton>,
  ];

  return (
    <>
      <StyledButton
        onClick={() => setIsOpen(true)}
        size="md"
        bgColor={PALLETTE.charcoal_see_through}
        color={PALLETTE.charcoal}
      >
        {t("form.button_restart")}
      </StyledButton>

      <ConfirmModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Restart Event Creation"
        actions={actions}
      >
        <StyledText level="body-md" color={PALLETTE.charcoal}>
          {t("create_event.confirm_event_creation_restart_text")}
        </StyledText>
      </ConfirmModal>
    </>
  );
};

export default RestartEventCreationButton;
