import { addHours, isBefore } from "date-fns";
import { ITicket } from "../types";
import { utcToZonedTime } from "date-fns-tz";

export function mustPayBefore(payWithin: number, ticketUpdatedAt: Date): Date {
  const location = "Europe/Paris";
  let ticketUpdatedAtInLocation = utcToZonedTime(ticketUpdatedAt, location);

  let roundedTime = addHours(ticketUpdatedAtInLocation, payWithin + 1);
  roundedTime.setMinutes(0, 0, 0); // Truncate to the hour

  if (isBefore(roundedTime, ticketUpdatedAtInLocation)) {
    roundedTime = addHours(roundedTime, 1);
  }

  return roundedTime;
}

export const canPayForTicket = (ticket: ITicket): boolean => {
  if (ticket.ticket_request?.ticket_release?.pay_within !== undefined) {
    const mustPayBeforeDate = mustPayBefore(
      ticket.ticket_request.ticket_release.pay_within!,
      new Date(ticket.updated_at)
    );
    return isBefore(new Date(), mustPayBeforeDate);
  } else {
    // Check if event.date is in the future
    return isBefore(
      new Date(),
      new Date(ticket.ticket_request?.ticket_release?.event?.date!)
    );
  }
};
