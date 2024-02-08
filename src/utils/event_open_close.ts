import { ITicketRelease } from "../types";

export const ticketReleaseHasClosed = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  const { open, close } = ticketRelease;

  return serverTimestamp > close;
};

export const ticketReleaseHasOpened = (
  ticketRelease: ITicketRelease,
  serverTimestamp: number
): boolean => {
  const { open, close } = ticketRelease;

  return serverTimestamp > open && serverTimestamp < close;
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
    ticketRelease.ticketReleaseMethodDetail.openWindowDuration;

  if (!open_window_duration) return false;

  return serverTimestamp < serverTimestamp + open_window_duration * 60 * 1000;
};
