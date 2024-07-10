import { ITicket, ITicketRelease } from "../types";

export const ticketReleaseHasClosed = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  const { open, close } = ticketRelease;

  const stDate = new Date(serverTimestamp);
  const closeDate = new Date(close);

  return stDate > closeDate;
};

export const ticketReleaseHasOpened = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  const { open, close } = ticketRelease;

  const stDate = new Date(serverTimestamp);
  const openDate = new Date(open);
  const closeDate = new Date(close);

  return stDate > openDate && stDate < closeDate;
};

export const ticketReleaseHasNotOpened = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  return (
    !ticketReleaseHasOpened(ticketRelease, serverTimestamp) &&
    !ticketReleaseHasClosed(ticketRelease, serverTimestamp)
  );
};

export const beforeWindowDuration = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  const { open } = ticketRelease;
  const open_window_duration =
    ticketRelease.ticket_release_method_detail.open_window_duration;

  if (!open_window_duration) return false;

  return serverTimestamp < serverTimestamp + open_window_duration * 60 * 1000;
};

export const ticketIsEnteredIntoFCFSLottery = (
  ticket: ITicket,
  ticketRelease: ITicketRelease
) => {
  const open = new Date(ticketRelease.open);

  const windowDeadline = new Date(
    open.getTime() +
      ticketRelease.ticket_release_method_detail.open_window_duration! *
        60 *
        1000
  );
  return ticket.ticket_order!.created_at < windowDeadline.getTime();
};

export const ticketsEnteredIntoFCFSLottery = (
  tickets: ITicket[],
  ticketRelease: ITicketRelease
) => {
  return tickets.filter((ticket) =>
    ticketIsEnteredIntoFCFSLottery(ticket, ticketRelease)
  ).length;
};
