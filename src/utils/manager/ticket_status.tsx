import { ITicket, TicketStatus } from "../../types";
import { ticketIsEnteredIntoFCFSLottery } from "../event_open_close";

export function getTicketStatus(ticket: ITicket): TicketStatus {
  if (!ticket) {
    return TicketStatus.PENDING;
  }

  let payBefore: Date | null = null;
  if (ticket.payment_deadline.Valid) {
    payBefore = new Date(ticket.payment_deadline.Time);
  }

  let status = TicketStatus.PENDING;
  if (ticket.ticket_order?.is_handled) {
    if (ticket.deleted_at) {
      status = TicketStatus.CANCELLED_TICKET;
    } else if (ticket.refunded) {
      status = TicketStatus.REFUNDED;
    } else if (ticket.checked_in) {
      status = TicketStatus.CHECKED_IN;
    } else if (ticket.is_paid) {
      status = TicketStatus.PAID;
    } else if (ticket.is_reserve) {
      status = TicketStatus.RESERVED;
    } else if (
      ticket.purchasable_at.Valid &&
      new Date(ticket.purchasable_at.Time) <= new Date()
    ) {
      status = TicketStatus.PURCHASEABLE;
    } else if (payBefore && new Date() > payBefore && !ticket.is_paid) {
      status = TicketStatus.EXPIRED;
    } else if (
      ticketIsEnteredIntoFCFSLottery(
        ticket,
        ticket.ticket_order?.ticket_release!
      )
    ) {
      status = TicketStatus.LOTTERY_ENTERED;
    } else {
    }
  } else {
    if (ticket.ticket_order?.deleted_at) {
      status = TicketStatus.CANCELLED_REQUEST;
    } else if (ticket.ticket_order?.is_handled) {
      status = TicketStatus.HANDLED;
    }
  }

  return status;
}
