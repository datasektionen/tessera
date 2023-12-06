import { ITicketRelease } from "../types";

export const ticketReleaseHasClosed = (
  ticketRelease: ITicketRelease
): boolean => {
  const { open, close } = ticketRelease;
  const now = new Date().getTime();
  return now > close;
};

export const ticketReleaseHasOpened = (
  ticketRelease: ITicketRelease
): boolean => {
  const { open, close } = ticketRelease;
  const now = new Date().getTime();
  return now > open && now < close;
};

export const ticketReleaseHasNotOpened = (
  ticketRelease: ITicketRelease
): boolean => {
  return (
    !ticketReleaseHasOpened(ticketRelease) &&
    !ticketReleaseHasClosed(ticketRelease)
  );
};
