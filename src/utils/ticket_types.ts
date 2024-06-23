import { ShoppingCartItem } from "../redux/features/ticketRequestSlice";

export const numberOfTicketRequestInBasket = (
  items: ShoppingCartItem[]
): { [key: number]: number } => {
  let counts: { [key: number]: number } = {};
  items.forEach((item) => {
    counts[item.ticket.id] = item.quantity;
  });

  return counts;
};

export const numberOfTotalTicketRequestInBasket = (
  items: ShoppingCartItem[],
  ticketReleaseId: number
): number => {
  let total = 0;
  items.forEach((item) => {
    if (item.ticket.ticket_release_id === ticketReleaseId) {
      total += item.quantity;
    }
  });

  return total;
};
