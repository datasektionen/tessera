import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { removeTicketType } from "../../../redux/features/ticketTypeCreationSlice";
import PALLETTE from "../../../theme/pallette";
import StyledText from "../../text/styled_text";
import StyledButton from "../../buttons/styled_button";
import ConfirmModal from "../../modal/confirm_modal";
import { useTranslation } from "react-i18next";

interface RemoveTTButtonProps {
  index: number;
}

const RemoveTTButton: React.FC<RemoveTTButtonProps> = ({ index }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onMouseEnter={() => setShowConfirm(true)}
      onMouseLeave={() => setShowConfirm(false)}
    >
      <RemoveCircleOutlineIcon
        onClick={() => dispatch(removeTicketType(index))}
        style={{
          color: PALLETTE.red,
          transition: "transform 0.3s",
          transform: showConfirm ? "translateX(-45px)" : "translateX(0)",
        }}
      />
      <StyledText
        color={PALLETTE.red}
        fontSize={15}
        fontWeight={700}
        level="body-sm"
        onClick={() => dispatch(removeTicketType(index))}
        style={{
          marginLeft: "-45px",
          opacity: showConfirm ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        Remove
      </StyledText>
    </div>
  );
};

interface RemoveButtonProps {
  index: number;
  text: string;
  color: string;
  action: (index: number) => void;
  confirmTitle: string;
  confirmText: string;
  shouldWarn?: boolean;
}

const RemoveListFormButton: React.FC<RemoveButtonProps> = ({
  index,
  text,
  color,
  action,
  confirmTitle,
  confirmText,
  shouldWarn = true,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    if (shouldWarn) {
      setIsOpen(true);
    } else {
      action(index);
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onMouseEnter={() => setShowConfirm(true)}
      onMouseLeave={() => setShowConfirm(false)}
    >
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={confirmTitle}
        actions={[
          <StyledButton
            size="md"
            onClick={() => {
              setIsOpen(false);
              action(index);
            }}
            bgColor={PALLETTE.red}
          >
            {t("form.button_delete")}
          </StyledButton>,
          <StyledButton
            size="md"
            onClick={() => setIsOpen(false)}
            bgColor={PALLETTE.charcoal_see_through}
          >
            {t("form.button_cancel")}
          </StyledButton>,
        ]}
      >
        <StyledText level="body-lg" fontSize={20} color={PALLETTE.charcoal}>
          {confirmText}
        </StyledText>
      </ConfirmModal>
      <RemoveCircleOutlineIcon
        onClick={handleClick}
        style={{
          color: color,
          transition: "transform 0.3s",
          transform: showConfirm ? "translateX(-45px)" : "translateX(0)",
        }}
      />
      <StyledText
        color={color}
        fontSize={15}
        fontWeight={700}
        level="body-sm"
        onClick={handleClick}
        style={{
          marginLeft: "-45px",
          opacity: showConfirm ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {text}
      </StyledText>
    </div>
  );
};

export { RemoveTTButton, RemoveListFormButton };
