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
  if (!ticket.payment_deadline.Valid) {
    return isBefore(
      new Date(),
      new Date(ticket.ticket_order?.ticket_release?.event?.date!)
    );
  } else {
    return isBefore(new Date(), new Date(ticket.payment_deadline.Time));
  }
};
