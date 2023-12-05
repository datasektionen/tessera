import { ShoppingCartItem } from "../redux/features/ticketRequestSlice";

export const numberOfTicketRequestInBasket = (
  items: ShoppingCartItem[]
): { [key: number]: number } => {
  let counts: { [key: number]: number } = {};
  items.forEach((item) => {
    if (counts[item.ticketTypeId]) {
      counts[item.ticketTypeId] += item.quantity;
    } else {
      counts[item.ticketTypeId] = item.quantity;
    }
  });

  return counts;
};

export const numberOfTotalTicketRequestInBasket = (
  items: ShoppingCartItem[]
): number => {
  let total = 0;
  items.forEach((item) => {
    total += item.quantity;
  });

  return total;
};
