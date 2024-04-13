import { Box, Divider } from "@mui/joy";
import { ITicket } from "../../../../types";
import TicketUserDetail from "./ticket_user_detail";
import TicketInfo from "./ticket_info";
import TicketPaymentInfo from "./ticket_payment_info";
import TicketEventForm from "./ticket_event_form";
import { useState } from "react";
import TicketActions from "./ticket_actions";

interface TicketDeatilProps {
  ticket: ITicket;
}

const TicketDetail: React.FC<TicketDeatilProps> = ({ ticket }) => {
  const [isTicketEventFormNull, setIsTicketEventFormNull] =
    useState<boolean>(false);
  const [isTicketPaymentInfoNull, setIsTicketPaymentInfoNull] =
    useState<boolean>(false);

  return (
    <Box>
      <TicketUserDetail user={ticket.user!} />
      <Divider sx={{ my: 1 }} />
      <TicketInfo ticket={ticket} />
      <Divider sx={{ my: 1 }} />
      <TicketEventForm
        ticket={ticket}
        onNull={() => setIsTicketEventFormNull(true)}
      />
      {!isTicketEventFormNull && <Divider sx={{ my: 1 }} />}
      <TicketPaymentInfo
        ticket={ticket}
        onNull={() => setIsTicketPaymentInfoNull(true)}
      />
      {!isTicketPaymentInfoNull && <Divider sx={{ my: 1 }} />}
      <TicketActions ticket={ticket} />
    </Box>
  );
};

export default TicketDetail;
