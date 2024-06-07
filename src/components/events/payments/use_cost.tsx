import { useMemo } from "react";
import { ITicket, ITicketOrder } from "../../../types";

export const useCosts = (ticketOrder: ITicketOrder) => {
  const totalTicketCost = useMemo(() => {
    if (!ticketOrder.tickets || ticketOrder.tickets.length === 0) {
      return 0;
    }

    return ticketOrder.tickets.reduce((total, ticket) => {
      return total + (ticket?.ticket_type?.price ?? 0);
    }, 0);
  }, [ticketOrder]);

  const totalAddonsCost = useMemo(() => {
    return ticketOrder.tickets.reduce((total, ticket) => {
      return (
        total +
        (ticket?.ticket_add_ons?.reduce((total, addon) => {
          const addonDetails = ticketOrder?.ticket_release?.addons?.find(
            (a) => a.id === addon.add_on_id
          );
          return total + (addonDetails?.price ?? 0) * (addon.quantity ?? 0);
        }, 0) ?? 0)
      );
    }, 0);
  }, [ticketOrder]);

  const totalCost = useMemo(
    () => totalTicketCost + totalAddonsCost,
    [totalTicketCost, totalAddonsCost]
  );

  return { totalTicketCost, totalAddonsCost, totalCost };
};
