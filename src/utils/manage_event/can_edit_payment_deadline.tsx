/*
Only some ticket releases method can edit payment deadline
For instance, FCFS and FCFS-lottery ticket releases can edit payment deadline
But not Reserved or Selective
*/

import { ITicketReleaseMethod } from "../../types";

const METHODS_THAT_CAN_EDIT_PAYMENT_DEADLINE: string[] = [
  "First Come First Serve Lottery",
  "First Come First Serve",
];

const METHODS_THAT_HAS_RESERVE_TICKETS: string[] = [
  "First Come First Serve Lottery",
  "First Come First Serve",
];

const METHODS_THAT_CAN_MASS_ALLOCATE_TICKETS: string[] = [
  "First Come First Serve Lottery",
  "First Come First Serve",
];

const METHODS_THAT_HAS_LOTTERY: string[] = ["First Come First Serve Lottery"];

const METHODS_THAT_REQUIRE_ACCOUNT: string[] = [
  "First Come First Serve Lottery",
  "First Come First Serve",
];

export const ticketReleaseRequiresAccount = (method?: ITicketReleaseMethod) => {
  if (!method) {
    throw new Error("Method is required");
  }

  return METHODS_THAT_REQUIRE_ACCOUNT.includes(method.name);
};

export const canEditPaymentDeadline = (method?: ITicketReleaseMethod) => {
  if (!method) {
    return false;
  }

  return METHODS_THAT_CAN_EDIT_PAYMENT_DEADLINE.includes(method.name);
};

export const canEditPaymentDeadlineFromId = (id: number) => {
  return true;
};

export const canEditReservePaymentDurationFromId = (id: number) => {
  return [1, 3].includes(id);
};

export const hasReserveTickets = (method?: ITicketReleaseMethod) => {
  if (!method) {
    throw new Error("Method is required");
  }

  return METHODS_THAT_HAS_RESERVE_TICKETS.includes(method.name);
};

export const canMassAllocateTickets = (method?: ITicketReleaseMethod) => {
  if (!method) {
    throw new Error("Method is required");
  }

  return METHODS_THAT_CAN_MASS_ALLOCATE_TICKETS.includes(method.name);
};

export const hasLottery = (method?: ITicketReleaseMethod) => {
  if (!method) {
    throw new Error("Method is required");
  }

  return METHODS_THAT_HAS_LOTTERY.includes(method.name);
};
