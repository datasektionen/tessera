import { Typography } from "@mui/joy";
import InformationModal from "../../modal/information";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WhaIsTicketRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <InformationModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("event.ticket_release.checkout.what_is_a_request_title")}
    >
      <StyledText
        level="body-md"
        color={PALLETTE.charcoal}
        style={{ marginBottom: "16px" }}
      >
        {t("event.ticket_release.checkout.what_is_a_request")}
      </StyledText>
    </InformationModal>
  );
};

export default WhaIsTicketRequestModal;
