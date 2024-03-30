import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../../modal/confirm_modal";
import StyledButton from "../../buttons/styled_button";
import PALLETTE from "../../../theme/pallette";
import StyledText from "../../text/styled_text";

interface DeleteTicketReleaseModalProps {
  handleDeleteTicketRelease: () => void;
}

const DeleteTicketReleaseModal: React.FC<DeleteTicketReleaseModalProps> = ({
  handleDeleteTicketRelease,
}) => {
  const { t } = useTranslation();
  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  return (
    <>
      <ConfirmModal
        title="Confirm Delete Ticket Release"
        isOpen={openDeleteModel}
        onClose={() => {
          setOpenDeleteModel(false);
        }}
        actions={[
          <StyledButton
            size="md"
            key="confirm-delete"
            bgColor={PALLETTE.charcoal_see_through}
            onClick={() => {
              handleDeleteTicketRelease();
              setOpenDeleteModel(false);
            }}
          >
            {t("form.button_confirm")}
          </StyledButton>,
          <StyledButton
            size="md"
            key="cancel-delete"
            bgColor={PALLETTE.red}
            onClick={() => {
              setOpenDeleteModel(false);
            }}
          >
            {t("form.button_cancel")}
          </StyledButton>,
        ]}
      >
        <StyledText level="body-md" fontSize={18} color={PALLETTE.charcoal}>
          {t("manage_event.delete_ticket_release_confirmation")}
        </StyledText>
      </ConfirmModal>
      <StyledButton
        color={PALLETTE.charcoal}
        bgColor={PALLETTE.charcoal_see_through}
        textColor={PALLETTE.charcoal}
        size="md"
        onClick={() => {
          setOpenDeleteModel(true);
        }}
        style={{
          width: "200px",
        }}
      >
        {t("form.button_delete")}
      </StyledButton>
    </>
  );
};

export default DeleteTicketReleaseModal;
