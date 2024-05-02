import PALLETTE from "../../theme/pallette";

export type PaymentPlanOption = "monthly" | "yearly";

export enum PackageTiers {
  Free = "free",
  SingleEvent = "single_event",
  Professional = "professional",
  Network = "network",
}

export interface IPricingOption {
  title: string;
  plan: PackageTiers;
  one_time?: {
    SEK: number;
  };
  price?: {
    monthly?: {
      SEK: number;
    };
    yearly?: {
      SEK: number;
    };
  };
  features: string[];
  highlighted: boolean;
  background?: string;
}

export const pricingOptions: IPricingOption[] = [
  {
    title: "Free",
    plan: PackageTiers.Free,
    price: {
      monthly: { SEK: 0 },
      yearly: { SEK: 0 },
    },
    features: [
      "Max 1 Event",
      "Basic Ticket Management",
      "Public Events",
      "Limited Ticket Releases",
      "Default Landing Page",
      "Basic Support",
    ],
    highlighted: false,
    background: `linear-gradient(180deg, ${PALLETTE.white} 0%, ${PALLETTE.light_pink} 100%)`,
  },
  {
    title: "Single Event",
    plan: PackageTiers.SingleEvent,
    one_time: { SEK: 4995 },
    features: [
      "Advanced Ticket Management",
      "Private Events",
      "All Ticket Release Methods",
      "Custom Event Landing Page",
      "Limited Support",
    ],
    highlighted: false,
    // Gradient
    background: `linear-gradient(180deg, ${PALLETTE.white} 0%, ${PALLETTE.light_pink} 100%)`,
  },
  {
    title: "Professional",
    plan: PackageTiers.Professional,
    price: {
      monthly: { SEK: 1395 }, // Billed monthly
      yearly: { SEK: 995 }, // Monthly equivalent paid yearly
    },
    features: [
      "Unlimited Events",
      "Advanced Ticket Management",
      "Private Events",
      "All Ticket Release Methods",
      "Max 5 Teams",
      "Custom Event Landing Page",
      "Premium Support",
      "...and more",
    ],
    highlighted: true,
    background: `linear-gradient(180deg, ${PALLETTE.offBlack} 0%, ${PALLETTE.black} 100%)`,
  },
  {
    title: "Network",
    plan: PackageTiers.Network,
    price: {
      monthly: { SEK: 0 },
      yearly: { SEK: 0 },
    },
    features: [
      "Unlimited Events",
      "Unlock all features",
      "Custom Business Event Site",
      "API Integration",
      "Unlimited Teams",
      "Contact Database",
      "Dedicated Support",
    ],
    highlighted: false,
    background: `linear-gradient(180deg, ${PALLETTE.white} 0%, ${PALLETTE.light_pink} 100%)`,
  },
];
