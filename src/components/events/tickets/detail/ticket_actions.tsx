import { Box } from "@mui/joy";
import { ITicket } from "../../../../types";
import { TicketDetailWrapper } from "./ticket_utils";
import StyledButton from "../../../buttons/styled_button";
import allocateSelectedTicket from "../../../../redux/sagas/axios_calls/allocate_selected_ticket";
import PALLETTE from "../../../../theme/pallette";
import { useTranslation } from "react-i18next";
import StyledText from "../../../text/styled_text";

interface TicketActionsProps {
  ticket: ITicket;
}

const TicketActions: React.FC<TicketActionsProps> = ({ ticket }) => {
  const { t } = useTranslation();
  return (
    <TicketDetailWrapper>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <StyledText
          level="body-sm"
          color={PALLETTE.cerise}
          fontWeight={600}
          fontSize={20}
        >
          {t("manage_event.tickets.ticket_actions.title")}
        </StyledText>
        {!ticket.ticket_request?.is_handled &&
          !ticket.ticket_request?.deleted_at && (
            <StyledButton
              onClick={() => {
                allocateSelectedTicket(
                  ticket.ticket_request?.ticket_release?.eventId!,
                  ticket.ticket_request?.id!
                );
              }}
              bgColor={PALLETTE.green}
              size="sm"
            >
              {t("manage_event.tickets.ticket_actions.allocate")}
            </StyledButton>
          )}
      </Box>
    </TicketDetailWrapper>
  );
};

export default TicketActions;
