import { ITicketRelease } from "../types";

export const TicketReleaseHasClosed = (
  ticketRelease: ITicketRelease
): boolean => {
  const { open, close } = ticketRelease;
  const now = new Date();
  return now > close;
};

export const TicketReleaseHasOpened = (
  ticketRelease: ITicketRelease
): boolean => {
  const { open, close } = ticketRelease;
  const now = new Date();
  return now > open && now < close;
};

export const TicketReleaseHasNotOpened = (
  ticketRelease: ITicketRelease
): boolean => {
  return (
    !TicketReleaseHasOpened(ticketRelease) &&
    !TicketReleaseHasClosed(ticketRelease)
  );
};
