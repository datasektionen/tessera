import { PackageTiers } from "../../pages/pricing/features";
import { IPlanEnrollment } from "../../types";

export function isFeatureAvailable(
  featureName: string,
  planEnrollment: IPlanEnrollment | undefined
) {
  if (!planEnrollment) {
    return false;
  }

  if (planEnrollment.id !== 0 && !planEnrollment.features) {
    console.warn(
      "Plan enrollment features are not available. Please check the API response."
    );
    return false;
  }

  return planEnrollment.features.some(
    (feature) => feature.name === featureName && feature.is_available
  );
}

/**
 * Given a feature, get either 'professional' or 'network' based on the feature availability.
 */

export function getFeaturesPackageTier(
  featureName: string,
  planEnrollment: IPlanEnrollment | undefined
) {
  if (!planEnrollment) {
    return null;
  }

  if (planEnrollment.id !== 0 && !planEnrollment.features) {
    console.warn(
      "Plan enrollment features are not available. Please check the API response."
    );
    return null;
  }

  const requiredPlanFeatures = planEnrollment.required_plan_features;

  const feature = requiredPlanFeatures.find(
    (feature) => feature.feature_name === featureName
  );

  if (!feature) {
    // This means that the feature doesnt even exists in the required_plan_features
    throw new Error(
      `Feature ${featureName} not found in required_plan_features.`
    );
  }

  const tiers = [
    PackageTiers.Free,
    PackageTiers.Professional,
    PackageTiers.Network,
  ];

  const tier = tiers.find((t) => feature.plans.includes(t));
  return tier === PackageTiers.Professional ? "Pro" : tier;
}
