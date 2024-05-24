import { ITicketRelease, IUser } from "../types";

export function userCanSeeTicketRelease(
  ticketRelease: ITicketRelease,
  user: IUser
) {

  return true;
}
