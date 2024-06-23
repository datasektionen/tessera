import { useMemo } from "react";
import { ITicketRequest } from "../../../types";

export const useCosts = (ticketRequest?: ITicketRequest) => {
  const totalTicketCost = useMemo(
    () =>
      (ticketRequest?.ticket_type?.price ?? 0) *
      (ticketRequest?.ticket_amount ?? 0),
    [ticketRequest]
  );
  const totalAddonsCost = useMemo(
    () =>
      ticketRequest?.ticket_add_ons?.reduce((total, addon) => {
        const addonDetails = ticketRequest?.ticket_release?.addons?.find(
          (a) => a.id === addon.add_on_id
        );
        return total + (addonDetails?.price ?? 0) * (addon.quantity ?? 0);
      }, 0) ?? 0,
    [ticketRequest]
  );
  const totalCost = useMemo(
    () => totalTicketCost + totalAddonsCost,
    [totalTicketCost, totalAddonsCost]
  );

  return { totalTicketCost, totalAddonsCost, totalCost };
};
