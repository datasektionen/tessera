import { ITicketRelease, IUser } from "../types";

export function userCanSeeTicketRelease(
  ticketRelease: ITicketRelease,
  user: IUser
) {
  if (ticketRelease.allow_external && user.is_external) return true;

  return false;
}
