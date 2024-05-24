export interface IPricingFeaturePlanDetails {
  has: boolean;
  description: string;
}

export interface IPricingFeature {
  name: string;
  group: string;
  description: string;
  free: IPricingFeaturePlanDetails;
  single_event: IPricingFeaturePlanDetails;
  professional: IPricingFeaturePlanDetails;
  network: IPricingFeaturePlanDetails;
}
