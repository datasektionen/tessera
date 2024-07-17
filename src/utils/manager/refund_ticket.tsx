import { ITicket, TicketStatus } from "../../types";
import { getTicketStatus } from "./ticket_status";

export function canRefundTicket(ticket: ITicket): boolean {
  // Get the ticket status
  const status = getTicketStatus(ticket);

  // Conditions for refund eligibility:
  // 1. The ticket must be paid
  // 2. The ticket must not be already refunded
  // 3. The ticket must not be checked in
  // 4. The ticket must not be cancelled
  // 5. The ticket must not be expired (optional, depending on your policy)

  return status === TicketStatus.PAID && !ticket.refunded && !ticket.checked_in;
}
