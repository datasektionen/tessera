import { Box } from "@mui/joy";
import { IEvent, ITicket, ITicketRequest } from "../../../types";
import StyledText from "../../text/styled_text";
import PALLETTE from "../../../theme/pallette";
import { useTranslation } from "react-i18next";

interface EditFormFieldResponseProps {
  ticket?: ITicket;
  ticketRequest?: ITicketRequest;
}

const EditFormFieldResponse: React.FC<EditFormFieldResponseProps> = ({
  ticket,
  ticketRequest,
}) => {
  const { t } = useTranslation();
  return (
    <Box>
      <StyledText
        level="body-sm"
        fontSize={22}
        color={PALLETTE.charcoal}
        fontWeight={700}
        sx={{ mt: 2 }}
      >
        {t("ticket_request.ticket_request_response")}
      </StyledText>
    </Box>
  );
};

export default EditFormFieldResponse;
